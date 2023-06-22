import { updateUser } from "../../../services/user.service";

export default async function handler(req, res) {
  try {

    let user = await updateUser(req.body);
    user={...user,phone:Number(user.phone)}
    res.status(200).json(user);
    return user;
  } catch (error) {
    console.error("Erro no haldler updateUser",error)
  }
}
