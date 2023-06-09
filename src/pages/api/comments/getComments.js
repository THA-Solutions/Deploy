import db from "../../../lib/db";

export default async function handlerGet(req, res) {
  try {
    const id = Number(req.query.id);
    const comment = await db.comentarios.findMany({
      where: {
        id_produto: id,
      },
    });
    res.status(200).json({ comment });
    return {
      comment,
    };
  } catch (error) {
    console.error("Erro ao carregar comentários", error);
    res.status(500).json({ message: "Erro ao carregar comentários" });
  }
}
