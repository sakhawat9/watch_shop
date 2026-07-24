import nc from "next-connect";
import db from "../../../../../utils/db";
import { isAuth, isAdmin } from "../../../../../utils/auth";
import User from "../../../../../models/User";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const users = await User.findById(req.query.id);
  await db.disconnect();
  res.send(users);
});

handler.delete(async (req, res) => {
  await db.connect();
  const users = await User.findById(req.query.id);
  if (users) {
    await users.deleteOne();
    await db.disconnect();
    res.send({ message: 'User Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'User Not Found' });
  }
});

export default handler;