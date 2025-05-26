import bcrypt from "bcryptjs";
import { Users, UserByRol, Rol } from "../../models/index.js";
import { generateToken } from "../../adapter/tokenAdapter.js";
import { LoginError } from "../../../errors/error.js";
import envs from "../../../config/envs.js";
import GroupStudent from "../../models/groupStudent.js";
import Group from "../../models/group.js";

/**
 * Handles user authentication by validating the username and password, generating a JWT token, and updating the user with the token.
 *
 * @param {Object} req - Request object containing the user's login details (body) and IP address.
 * @param {Object} reply - Response object used to send the authentication result to the client.
 * @returns {void}
 *
 * @author Juan Sebastian Gonzalez Sosssa
 * @date   20-01-2025
 */
const authUser = async (req, reply) => {
  const { body } = req;
  const clientIp =
    req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.ip;
  const { email, password } = body;

  const user = await Users.findOne({ where: { email }, logging: false });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new LoginError();
  }

  const userData = await Users.findOne({
    where: { id: user.id },
    include: [
      {
        model: UserByRol,
        include: {
          model: Rol,
          attributes: ['name_rol'],
        },
      },
      {
        model: GroupStudent,
        include: [
          {
            model: Group,
            attributes: ['name'],
            include: [
              {
                model: Users,
                attributes: ['id', 'name' ],
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

  const token = generateToken(
    envs.JWT_SECRET,
    user,
    clientIp,
    userData.UserByRols.Rol.id
  );

  await user.update({ token }, { logging: false, silent: true });

  reply.send({
    ok: true,
    token,
    message: "User login was successful.",
    user: {
      id: userData.id,
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      rol_id: userData?.UserByRols?.Rol?.id,
      name_rol: userData?.UserByRols?.Rol?.name_rol,
      group_id: userData?.GroupStudents?.Group?.id,
      group_name: userData?.GroupStudents?.Group?.name,
      teacher_id: userData?.GroupStudents?.Group?.User?.id,
      teacher_name: userData?.GroupStudents?.Group?.User?.name,
    },
  });
};

export default authUser;
