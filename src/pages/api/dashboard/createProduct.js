import db from "../../../lib/db";

export default async function createProduct(req, res) {

const body= req.body
const tabelaDerivada= body.categoria==="Inversor On-Grid" || "Inversor Off-Grid" ? "inversor" : body.categoria==="Painel Solar" ? "painel" :body.categoria==="Carregador Veicular" ? "carregamento" : body.categoria==="Monitoramento" ? "monitoramento" : body.categoria==="MicroInversor" ? "microinversores" : body.categoria==="Água Mineral" || "Energético" || "Refrigerante"? "bebidas" : null
 const attRemove = ['titulo_produto', 'marca_produto','categoria','modelo','preco','quantidade','descricao','peso','altura','largura','comprimento','divisao',"url"];
 const newObj = {};

 for (const keyValue in body) {
   if (!attRemove.includes(keyValue)) {
     newObj[keyValue] = body[keyValue];
   }
 }
const tabelaProduto= await db.produto.create({
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
            status: "ATIVO",
        }
    }
    )

const produtoDerivado=await db[tabelaDerivada].create({
    data: {
        ...newObj,
        produto: {
            connect: {
              id_produto: tabelaProduto.id_produto, // Conecta o painel ao produto usando o ID do produto
            },
          },
}}
)

res.status(200).json({message:"Produto criado com sucesso"})
return produtoDerivado
}

