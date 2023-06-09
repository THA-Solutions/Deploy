import db from "../../../lib/db";

export default async function getCartItems(req, res) {
  try {
    const email = req.query.email;
    const user = await db.user.findUnique({
      where: { email: email },
    }); //Procura no banco o usuario pelo email fornecido pela url

    const cartItems = await db.pedido.findFirst({
      where: {
        id_usuario: user.id,
        status: "ATIVO",
      },
    }); //Procura no banco a axistencia de um carrinho ativo para o usuario

    if (!cartItems || cartItems===null) {
      try {
        const cart = await db.pedido.create({
          data: {
            id_usuario: user.id,
            status: "ATIVO",
          },
        });
        res.status(200).json({ message: "Carrinho Criado!" });
        return cart;
      } catch (error) {
        res.status(500).json({ error: "Erro ao criar o carrinho." });
      }
    } //Se não existir, cria um carrinho novo
    const carts = await db.itempedido.findMany({
      where: {
        id_pedido: cartItems.id_pedido,
      },
      orderBy: {
        id_itempedido: "asc",
      },
      include: {
        produto: {
          select: {
            modelo: true,
            marca_produto: true,
          }
        }
      }
    }); //Se existir, retorna os itens do carrinho de acordo com o id_pedido

    const total = carts.reduce((total, item) => {
      return Number(total) + Number(item.total);
    }, 0);
    const result = {
      carts: carts,
      total: total,
    };

    await db.pedido.update({
      where: {
        id_pedido: cartItems.id_pedido,
      },
      data: {
        total_pedido: total,
      },
    });
    res.status(200).json(result);

    return carts, total; //Retorna os itens do carrinho
  } catch (error) {
    console.error("Erro ao carregar carrinho", error);
    res.status(500).json({ message: "Erro ao carregar o carrinho" });
  }
}
