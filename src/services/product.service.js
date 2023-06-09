import db from "../lib/db";

class productService {
  async getProductsById(id) {
    try {
      const id_produto = Number(id);
      const produto = await db.produto.findUnique({
        where: {
          id_produto: id_produto,
        },
      });

      return produto;
    } catch (error) {
      console.error("Erro ao carregar produto", error);
    }
  } //Busca um produto em especifico

  async getAllProducts(req, res) {
    try {
      const product = await db.produto.findMany();
      res.status(200).json(product);
      return {
        product,
      };
    } catch (error) {
      console.error("Erro ao carregar produto", error);
    }
  }

  async getComments(id) {
    try {
      const id_produto = Number(id);
      const comment = await db.comentarios.findMany({
        where: {
          id_produto: id_produto,
        },
      });

      return comment;
    } catch (error) {
      console.error("Erro ao carregar comentários", error);
    }
  } //Busca os comentarios do produto

  async postComment(comment) {
    try {
      const id_produto = Number(comment.id_produto);
      const result = await db.comentarios.create({
        data: {
          id_produto: id_produto,
          descricao: comment.descricao,
        },
      });

      return result;
    } catch (error) {
      console.error("Erro ao salvar comentário", error);
    }
  }
}

export default new productService();
