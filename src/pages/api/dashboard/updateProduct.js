import db from "../../../lib/db";



export default async function updateProduct(req,res){
try {
    const body = req.body;
console.log('oi')
const tabelaDerivada = body.categoria === "Inversor On-Grid" || body.categoria === "Inversor Off-Grid"? "inversor": body.categoria === "Painel Solar"? "painel": body.categoria === "Carregador Veicular"? "carregamento": body.categoria === "Monitoramento"? "monitoramento": body.categoria === "MicroInversor"? "microinversores": body.categoria === "Água Mineral" ||  body.categoria === "Energético" ||  body.categoria === "Refrigerante"? "bebidas": null;
  let id =
    tabelaDerivada === "bebidas"
      ? "id_bebida"
      : tabelaDerivada === "carregamento"
      ? "id_carregamento"
      : tabelaDerivada === "inversor"
      ? "id_inversor"
      : tabelaDerivada === "microinversores"
      ? "id_microinv"
      : tabelaDerivada === "monitoramento"
      ? "id_monitoramento"
      : tabelaDerivada === "painel"
      ? "id_painel"
      : null;  
  
  const attRemove = [
    "id_bebida",
    "titulo_produto",
    "marca_produto",
    "categoria",
    "modelo",
    "preco",
    "quantidade",
    "descricao",
    "peso",
    "altura",
    "largura",
    "status",
    "id_produto",
    "id_inversor",
    "id_painel",
    "id_carregamento",
    "id_monitoramento",
    "id_microinversor",
    "comprimento",
    "divisao",
    "img_url",
  ];
  const newObj = {};

  for (const keyValue in body) {
    if (!attRemove.includes(keyValue)) {
      newObj[keyValue] = body[keyValue];
    }
  }

  const newProduct = await db.produto.update({
    where: { id_produto: body.id_produto },
    data: {
      titulo_produto: body.titulo_produto,
      marca_produto: body.marca_produto,
      categoria: body.categoria,
      modelo: body.modelo,
      preco: body.preco,
      quantidade: Number(body.quantidade),
      descricao: body.descricao,
      peso: body.peso,
      altura: body.altura,
      largura: body.largura,
      comprimento: body.comprimento,
      divisao: body.divisao,
      img_url: body.url,
      [tabelaDerivada]: {
        update: {
          where: { [id]: body[id] },
          data: {
            ...newObj,
          },
        },
      },
    },
  });

console.log('tchau',newProduct)
    res.status(200).json({ message: "Produto atualizado com sucesso" });

} catch (error) {
  console.error("Erro ao atualizar produto", error);
}

}