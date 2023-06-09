import db from "../../../lib/db";

export default async function remCartItem(req, res) {
  try {
    const { titulo_produto, acao, cartId } = req.body;
    const [item] = await db.itempedido.findMany({
      select: {
        id_itempedido: true,
        quantidade: true,
        total: true,
        produto: {
          select: {
            preco: true,
          },
        },
        pedido: {
          select: {
            id_pedido: true,
          },
        },
      },
      where: {
        produto: {
          titulo_produto: titulo_produto,
        },
        id_pedido: cartId,
      },
      orderBy: {
        id_itempedido: "asc",
      },
    });
    
    let quantidade =
      acao === "increase"
        ? item.quantidade + 1
        : item.quantidade - 1 < 1
        ? 1
        : item.quantidade - 1;
    const itemAlterado = await db.itempedido.update({
      where: { id_itempedido: item.id_itempedido },
      data: {
        quantidade: quantidade,
        total: quantidade * Number(item.produto.preco),
      },
    });

    res.status(200).json(itemAlterado);
    return { itemAlterado };
  } catch (error) {
    console.error("erro ao alterar a quntidade de produtos", error);
  }
}
