import { singInResquest } from "../../../services/user.service";

export default async function handler(req, res) {
  try {
    const user = await singInResquest(req.body);
    if(user){
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        lastname: user.lastname,
        phone: Number(user.phone),
      }
      res.status(200).json(userData);
      return userData
    }else{
      return null
    }
    
  } catch (error) {
    console.error("Erro na comiunicacao com a rota de Login",error);
    res.status(500).json(error.message);
  }
}
