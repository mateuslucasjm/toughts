const ToughtService = require("../services/toughtSevice");

module.exports = class ToughtController {
  static async getAll(req, res) {
    try {
      const { search = "", order = "desc" } = req.query;

      let toughts = await ToughtService.getAll();

      if (search) {
        toughts = toughts.filter((t) =>
          t.title.toLowerCase().includes(search.toLowerCase()),
        );
      }

      toughts.sort((a, b) => {
        if (order === "old") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      return res.json({
        toughts,
        total: toughts.length,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao buscar pensamentos" });
    }
  }

  static async dashboard(req, res) {
    try {
      const userId = req.user.id;

      const toughts = await ToughtService.getByUser(userId);

      return res.json({
        toughts,
        empty: toughts.length === 0,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro no dashboard" });
    }
  }

  static async create(req, res) {
    try {
      const userId = req.user.id;
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ message: "Título é obrigatório" });
      }

      const newTought = await ToughtService.create({
        title,
        userId,
      });

      return res.status(201).json(newTought);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao criar pensamento" });
    }
  }

  static async remove(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await ToughtService.delete(id, userId);

      return res.json({ message: "Pensamento removido com sucesso" });
    } catch (err) {
      console.error(err);
      return res.status(403).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ message: "Título é obrigatório" });
      }

      const updated = await ToughtService.update(id, userId, title);

      return res.json(updated);
    } catch (err) {
      console.error(err);
      return res.status(403).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      const tought = await ToughtService.getById(id);

      if (!tought) {
        return res.status(404).json({ message: "Não encontrado" });
      }

      return res.json(tought);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro ao buscar" });
    }
  }
};
