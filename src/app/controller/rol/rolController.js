import { Rol, UserByRol, Users } from '../../models/index.js';

exports.assignRoleToUser = async (req, res) => {
    try {
      const { user_id, rol_id } = req.body;
  
      const user = await Users.findByPk(user_id);
      const role = await Rol.findByPk(rol_id);
  
      if (!user || !role) {
        return res.status(404).json({ error: "Usuario o Rol no encontrado" });
      }
  
      await UserByRol.create({ user_id, rol_id });
      res.json({ message: "Rol asignado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al asignar rol" });
    }
  };
  
  exports.getUserRoles = async (req, res) => {
    try {
      const userRoles = await UserByRol.findAll({
        where: { user_id: req.params.user_id },
        include: [{ model: Rol, attributes: ["name_rol"] }]
      });
  
      if (!userRoles.length) return res.json({ message: "El usuario no tiene roles asignados" });
  
      res.json(userRoles);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener roles del usuario" });
    }
  };
  