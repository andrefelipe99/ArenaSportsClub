import usersDAO from "../dao/usersDAO.js";

export default class usersController {
  static async apiPostUser(req, res, next) {
    try {
      let name = req.params.name || {};
      let email = req.params.email || {};
      let password = req.params.password || {};
      let emailFound;

      if (!/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)) {
        res.json({ message: "Email inválido!" });
        return;
      }

      if (!/^[\w-]{8,32}$/.test(password)) {
        res.json({ message: "A senha precisa ter no mínimo 8 caracteres!" });
        return;
      }

      if (!email || !password) {
        res.json({ message: "Email ou senha inválidos" });
        return;
      }

      emailFound = await usersDAO.getFoundEmail(email);

      if (!emailFound) {
        const userResponse = await usersDAO.addUser(name, email, password);

        var { error } = userResponse;
        if (error) {
          return { error };
        }
      } else {
        res.json({ message: "Email já existe, insira um novo!" });
        return;
      }

      res.json({ message: "Cadastro realizado com sucesso!" });
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetUser(req, res, next) {
    try {
      let email = req.params.email || {};
      let password = req.params.password || {};
      let user = [];

      let emailFound = await usersDAO.getFoundEmail(email);

      if (!emailFound) {
        res.json({ message: "Email não encontrado!" });
        return;
      }

      user = await usersDAO.getUser(email, password);

      if (user?.length === 0) {
        res.status(404).json({ error: "Senha incorreta!" });
        return;
      }
      res.json(user);
      return;
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
      return;
    }
  }
}
