import nc from "next-connect";
import userRepo from "../../../../../repositories/userRepo";
import { isAdmin, isAuth } from "../../../../../utils/auth";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const user = await userRepo.getById(req.query.id);
  if (!user) return res.status(404).send({ message: "User Not Found" });
  res.send(user);
});

handler.delete(async (req, res) => {
  const removed = await userRepo.removeById(req.query.id);
  if (!removed) {
    return res.status(404).send({ message: "User Not Found" });
  }
  res.send({ message: "User Deleted" });
});

export default handler;
