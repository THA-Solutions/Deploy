import ProductDetails from "@/components/ProductDetails";
import Comments from "@/components/Comments";
import axios from "axios";

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id_produto;
  try {
    const productData = await axios
      .get(`http://fgldistribuidora.com.br/api/product/getProductByID`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        return {
          id: response.data.id_produto,
          titulo: response.data.titulo_produto,
          preco: response.data.preco,
          marca: response.data.marca_produto,
          modelo: response.data.modelo,
          descricao: response.data.descricao,
        };
      });

    const comments = await axios.get(
      "http://fgldistribuidora.com.br/api/comments/getComments",
      {
        params: {
          id: id,
        },
      }
    );
    const findedComments = comments.data.comment;
    const comment = findedComments.map((comment) => {
      return {
        userName: comment.userName,
        descricao: comment.descricao,
        data_lancamento: comment.data_lancamento.substring(0, 10),
      };
    });

    return {
      props: {
        produto: productData,
        comment: comment,
        id: id,
      },
    };
  } catch (error) {
    console.error("Erro ao carregar a pagina de produtos");
  }
}

export default function produto({ produto, comment, id }) {
  return (
    <div>
      <ProductDetails produto={produto} />
      <Comments comment={comment} id={id} />
    </div>
  );
}
