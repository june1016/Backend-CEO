// src/app/controller/auth/authController.js

import bcrypt from 'bcryptjs';
import { Users, UserByRol, Rol } from '../../models/index.js';
import { generateToken } from '../../adapter/tokenAdapter.js';
import { LoginError } from '../../../errors/error.js';
import envs from '../../../config/envs.js';
import GroupStudent from '../../models/groupStudent.js';
import Group from '../../models/group.js';

/**
 * Handles user authentication by validating credentials,
 * generating a JWT, and returning user info + rol data.
 */
const authUser = async (req, reply) => {
  const { email, password } = req.body;
  const clientIp =
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.ip;

  // 1️⃣ Buscar usuario por email
  const user = await Users.findOne({ where: { email }, logging: false });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new LoginError();
  }

  // 2️⃣ Recuperar únicamente rolId
  const userRol = await UserByRol.findOne({
    where: { user_id: user.id },
    attributes: ['rol_id'],
    logging: false,
  });
  const rolId = userRol ? userRol.rol_id : null;

  // 3️⃣ Recuperar también el nombre del rol en camelCase
  const rolRecord = rolId
    ? await Rol.findByPk(rolId, { attributes: ['nameRol'], logging: false })
    : null;
  const nameRol = rolRecord ? rolRecord.nameRol : null;

  // 4️⃣ Recuperar info de grupo (igual que antes)
  const userData = await Users.findOne({
    where: { id: user.id },
    include: [
      {
        model: UserByRol,
        include: {
          model: Rol,
          attributes: ['nameRol'],
        },
      },
      {
        model: GroupStudent,
        include: [
          {
            model: Group,
            attributes: ['id', 'name'],
            include: [
              {
                model: Users,
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      },
    ],
    raw: true,
    nest: true,
    logging: false,
  });

  // 5️⃣ Generar y guardar token
  const token = generateToken(envs.JWT_SECRET, user, clientIp, rolId);
  await user.update({ token }, { logging: false, silent: true });

  // 6️⃣ Enviar respuesta con todo en camelCase
  return reply.send({
    ok: true,
    token,
    message: 'Inicio de sesión exitoso.',
    user: {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      rolId,
      nameRol,
      groupId: userData?.GroupStudents?.Group?.id,
      groupName: userData?.GroupStudents?.Group?.name,
      teacherId: userData?.GroupStudents?.Group?.User?.id,
      teacherName: userData?.GroupStudents?.Group?.User?.name,
    },
  });
};

export default authUser;
