import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Comments.module.css";
import { useSession, getSession } from "next-auth/react";

export default function Comments(comment) {
  const [descricao, setComment] = useState("");
  const { data: session } = useSession();
  const changeComment = (txt) => {
    setComment(txt.target.value);
  };

  const [comment_cont, setCommentCont] = useState([]);

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
  }, [comment, comment_cont]);

  const id = comment.id;

  const handleSubmit = async () => {
    if (descricao == "") {
      return;
    } else {
      try {
        const comment = {
          userName: session?.user.name,
          descricao: descricao,
          id: id,
        };
        await axios.post("/api/comments/postComment", {
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
          disabled={enableComment}
        ></textarea>

        <div className={styles.button_container}>
          <button
            type="button"
            className={styles.button_postComment}
            onClick={handleSubmit}
            disabled={enableComment}
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
        {comment_cont.map((comentario, index) => (
          <div key={index}>{comentario}</div>
        ))}
      </div>
    </div>
  );
}
