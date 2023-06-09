import { register } from "../../../services/user.service";

export default async function handler(req, res) {
  try {
    const newUser = await register(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
}
