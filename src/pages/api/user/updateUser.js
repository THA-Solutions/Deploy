import { updateUser } from "../../../services/user.service";

export default async function handler(req, res) {
  try {

    const address = await updateUser(req.body);
    
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json(error.message);
  }
}
