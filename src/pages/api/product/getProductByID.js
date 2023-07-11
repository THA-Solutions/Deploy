import db from "../../../lib/db";

export default async function handlerGetProduct(req, res) {
  try {
    const id = Number(req.query.id);

    //Procura um produto basedo em seu id,que foi passado previamente pela requisicao http
    let produto = await db.produto.findUnique({
      where: {
        id_produto: id,
      },
    });

    const tabelaDerivada =
      produto.categoria === "Inversor On-Grid" ||
      produto.categoria === "Inversor Off-Grid"
        ? "inversor"
        : produto.categoria === "Painel Solar"
        ? "painel"
        : produto.categoria === "Carregador Veicular"
        ? "carregamento"
        : produto.categoria === "Monitoramento"
        ? "monitoramento"
        : produto.categoria === "MicroInversor"
        ? "microinversores"
        : produto.categoria === "Água Mineral" ||
          produto.categoria === "Energético" ||
          produto.categoria === "Refrigerante"
        ? "bebidas"
        : null;


        
    const produtoDerivado = await db[tabelaDerivada].findFirst({
      where: {
        id_produto: id,
      },
    });

    produtoDerivado.id_bebida=Number(produtoDerivado.id_bebida)

    produto={
      ...produto,
      ...produtoDerivado
    }
    res.status(200).json(produto);
    return {
      produto,
    };
  } catch (error) {
    console.error("Erro ao carregar produto (id)", error);
  }
}
