import usersDAO from "../dao/usersDAO.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class usersController {
  static async apiPostUser(req, res, next) {
    try {
      let body = req.body;
      let { name, email, password } = body;
      let emailFound;

      if (!/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)) {
        res.status(404).json({ error: "Email inválido!" });
        return;
      }

      if (!/^[\w-]{8,32}$/.test(password)) {
        res
          .status(404)
          .json({ error: "A senha precisa ter no mínimo 8 caracteres!" });
        return;
      }

      if (!email || !password) {
        res.json({ message: "Email ou senha inválidos" });
        return;
      }

      emailFound = await usersDAO.getFoundEmail(email);

      if (!emailFound) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const userResponse = await usersDAO.addUser(name, email, passwordHash);

        var { error } = userResponse;
        if (error) {
          return { error };
        }
      } else {
        res.status(404).json({ error: "Email já existe, insira um novo!" });
        return;
      }

      res.status(200).json({ message: "Cadastro realizado com sucesso!" });
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetUser(req, res, next) {
    try {
      let body = req.body;
      let { email, password } = body;
      let user = [];

      let emailFound = await usersDAO.getFoundEmail(email);

      if (!emailFound) {
        res.status(404).json({ error: "Email não encontrado!" });
        return;
      }

      user = await usersDAO.getUser(email);

      let idUser = user[0]._id;
      let nameUser = user[0].name;

      const checkPassword = await bcrypt.compare(password, user[0].password);

      if (user?.length === 0 || !checkPassword) {
        res.status(404).json({ error: "Senha incorreta!" });
        return;
      }

      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user[0]._id,
        },
        secret
      );

      res.status(200).json({
        message: "Autenticação realizada com sucesso!",
        token,
        idUser,
        nameUser,
      });

      return;
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
      return;
    }
  }

  static async apiHaveFavorites(req, res, next) {
    try {
      let id = req.params.id || {};

      let userFound = await usersDAO.getUserWithId(id);

      if (userFound.length === 0) {
        res.status(401).json({ error: "Usuário não encontrado!" });
        return;
      }

      if (
        userFound[0].favorites.teams.length === 0 &&
        userFound[0].favorites.championships.length === 0
      )
        res.status(200).json({ message: "Não Tem" });
      else res.status(200).json({ message: "Tem" });

      return;
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(401).json({ error: e });
      return;
    }
  }

  static async apiGetFavorites(req, res, next) {
    try {
      let id = req.params.id || {};

      let userFound = await usersDAO.getUserWithId(id);

      if (!userFound.length === 0) {
        res.status(401).json({ error: "Usuário não encontrado!" });
        return;
      }

      res.status(200).json({
        teams: userFound[0].favorites.teams,
        championships: userFound[0].favorites.championships,
      });
      return;
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
      return;
    }
  }

  static async apiSetFavorites(req, res, next) {
    try {
      let body = req.body;
      let { id, teams, championships } = body;

      let updateResponse = await usersDAO.setFavorites(
        id,
        teams,
        championships
      );

      var { error } = updateResponse;
      if (error) {
        res.status(404).json({ error });
        return;
      }

      res.status(200).json({ message: "Alterado com sucesso." });
      return;
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
      return;
    }
  }
}
