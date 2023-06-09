import db from "../../../lib/db";

export default async function handler(req, res) {
  try {
    const { comment } = req.body;
    const id = Number(comment.id);
    const result = await db.comentarios.create({
      data: {
        userName: comment.userName,
        id_produto: id,
        descricao: comment.descricao,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar comentário." });
  }
}
