import db from "../../../lib/db";

export default async function handlerGetProduct(req, res) {
  try {
    const id = Number(req.query.id);
    //Procura um produto basedo em seu id,que foi passado previamente pela requisicao http
    const produto = await db.produto.findUnique({
      where: {
        id_produto: id,
      },
    });
    res.status(200).json(produto);
    return {
      produto,
    };
  } catch (error) {
    console.error("Erro ao carregar produto", error);
  }
}
