import db from "../../../lib/db";

export default async function remCartItem(req, res) {
  try {
    const { email } = req.body;
    const user = await db.user.findUnique({
      where: { email: email },
    });

    const activeCart = await db.pedido.findFirst({
      where: {
        id_usuario: user.id,
        status: "ATIVO",
      },
    });
    const alteredCart = await db.pedido.update({
      where: {
        id_pedido: activeCart.id_pedido,
      },
      data: {
        status: "EM ANDAMENTO",
      },
    });
    return alteredCart;
  } catch (error) {
    console.error("erro ao alterar a quntidade de produtos", error);
  }
}
