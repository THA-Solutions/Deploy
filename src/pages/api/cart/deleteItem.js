import db from "../../../lib/db";

export default async function remCartItem(req, res) {
  try {
    const { id, itemCart, acao } = req.body;

    if (acao === "deleteAll") {
      const deleted = itemCart.forEach(async (produto) => {
        const item = await db.itempedido.deleteMany({
          where: { id_itempedido: produto.id_itempedido },
        });

        return item;
      });
      res.json(deleted);
    } else {
      const deletedItem = await db.itempedido.delete({
        where: { id_itempedido: id },
      });
      res.status(200).json(deletedItem);
      return { deletedItem };
    }
  } catch (error) {
    console.error("erro ao alterar a quntidade de produtos", error);
  }
}
