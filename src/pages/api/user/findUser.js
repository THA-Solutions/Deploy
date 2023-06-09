import { findUser } from "../../../services/user.service";

export default async function handler(req, res) {
  try {
    const findedUser = await findUser(req.body);
    res.status(200).json(findedUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
}
