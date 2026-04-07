const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserService = require("../services/userService");
const { secret, expiresIn } = require("../config/jwt");

module.exports = class AuthController {
  static async loginPost(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserService.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Senha inválida" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, secret, {
        expiresIn,
      });

      return res.json({
        message: "Login realizado com sucesso",
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    try {
      if (password !== confirmpassword) {
        return res.status(400).json({ message: "Senhas não conferem" });
      }

      const existingUser = await UserService.findByEmail(email);

      if (existingUser) {
        return res.status(400).json({ message: "E-mail já em uso" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await UserService.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: newUser.id, email: newUser.email }, secret, {
        expiresIn,
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  static logout(req, res) {
    return res.json({ message: "Logout realizado (delete o token no front)" });
  }
};
