
import { useForm } from "react-hook-form";

export default function ProductInfos(divisao) {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
     const handleAdd = async (data) => {
     }
     const Divisao = "Solar"
    switch (Divisao){
        case "Solar":     
    return(
    <section>
        <div>
        <form
            onSubmit={handleSubmit(handleAdd)}
            className={styles.formClass}
          >  
        <h2>Informacoes</h2>
        <input
                id="titulo_produto"
                type="titulo_produto"
                placeholder="Titulo do Produto"
                disabled={false}
                {...register("titulo_produto", {
                  required: true,
                  validate: (value) => validator.isEmail(value),
                })}
        />

        </form>
        </div>
    </section>
        )
};

}