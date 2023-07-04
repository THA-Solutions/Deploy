import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Comments.module.css";
import { useSession, getSession } from "next-auth/react";
import { BASE_URL } from "@/constants/constants";
import { useRouter } from "next/router";




export default function Comments(comment) {
  const [descricao, setComment] = useState("");
  const { data: session } = useSession();
  const [comment_cont, setCommentCont] = useState([]);
  const router = useRouter(); //Pega o id do produto na url
  const [currentPage,setCurrentPage]=useState(0)//Pagina atual
  const limit=5//Quantidade de comentarios por pagina
  const Max_Items=5 //Quantidade de botoes de paginacao
  const Max_Left=(Max_Items-1)/2//Quantidade de botoes de paginacao a esquerda
  const pages = Math.ceil(comment_cont.length/limit)//Quantidade de paginas
  const startIndex=currentPage*limit//Indice inicial
  const currentData=comment_cont.slice(startIndex,startIndex+limit)//Dados da pagina atual
  const first = Math.max(currentPage-Max_Left,1)
  //Declaracao de variaveis



  const changeComment = (txt) => {
    setComment(txt.target.value);
  };//Funcao responsavel por alterar o valor dos comentarios

  const createDivsFromComments = (comments) => {
    return comments.map((comentario) => {
      return (
        <div
          className={styles.comment_container}
          key={comentario.id_comentario}
        >
          <div className={styles.user_date_container}>
            <h3 className={styles.user_comment}>
              Usuário: {comentario.userName}
            </h3>
            <h3 className={styles.date_comment}>
              Data: {comentario.data_lancamento}
            </h3>
          </div>

          <p className={styles.comment}>{comentario.descricao}</p>
        </div>
      );
    });
  };

  useEffect(() => {
    let data = comment.comment.map((comment) => {
      return {
        userName: comment.userName,
        descricao: comment.descricao,
        data_lancamento: comment.data_lancamento,
      };
    });

    let newDivs = createDivsFromComments(data);

    if (comment_cont.length === 0) {
      setCommentCont([...comment_cont, ...newDivs]);
    }
  }, [comment]);

  const id = comment.id;

  const handleSubmit = async () => {
    if (descricao == "") {
      return;
    } else {
      try {

      if(session){  
        const comment = {
          userName: session?.user.name,
          descricao: descricao,
          id: id,
        };
        await axios.post(`${BASE_URL}/api/comments/postComment`, {
          comment: comment,
        });
        const newComment = {
          userName: session?.user.name,
          descricao: descricao,
          data_lancamento: new Date().toLocaleDateString(), // assume a data atual
        };
        let newDivs = createDivsFromComments([newComment]);
        setCommentCont([...comment_cont, newDivs]);
        setComment("");
        }else{
          router.push("/Login");
        }

      } catch (error) {
        console.error("erro ao salvar comentario", error);
      }
    }
  };
  const [enableComment, setEnableComment] = useState(false);

  useEffect(() => {
    if (session) {
      setEnableComment(false);
    } else {
      setEnableComment(true);
    }
  }, [session]);

  return (
    <div className={styles.container}>
      <h2>Comentarios</h2>
      <div className={styles.postComment_container}>
        <textarea
          rows="5"
          value={descricao}
          onChange={changeComment}
          
        ></textarea>
        { session === null ? <span className={styles.error_message}>
          Faça login para comentar
                </span> : null}
        
        <div className={styles.button_container}>
          <button
            type="button"
            className={styles.button_postComment}
            onClick={handleSubmit}
            
          >
            Publicar Comentário
          </button>
          <button
            type="button"
            className={styles.button_cancelComment}
            onClick={() => {
              setComment("");
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
      <hr />
      <div>
        {currentData.map((comentario, index) => (
          <div key={index}>{comentario}</div>
        ))}
      <div className={styles.pagination}>
      {Array.from({ length: Math.min(Max_Items, pages) })
        .map((_, index) => index + first)
        .map((page) => (
          page <= pages-1 ? (<button 
          value={page}
            onClick={(e) => {setCurrentPage(Number(e.target.value))}}
          >
            {page}
          </button>):null
            
        ))}
        </div>  
      
      </div>
    </div>
  );
}
