import bcrypt from "bcryptjs";
import nc from "next-connect";
import userRepo from "../../../repositories/userRepo";
import { isAuth, signToken } from "../../../utils/auth";

const handler = nc();
handler.use(isAuth);

handler.put(async (req, res) => {
  const existing = await userRepo.getById(req.user._id);
  if (!existing) {
    return res.status(404).send({ message: "User Not Found" });
  }

  const user = await userRepo.updateById(req.user._id, {
    name: req.body.name,
    email: req.body.email,
    img: req.body.img,
    facebook: req.body.facebook,
    linkedIn: req.body.linkedIn,
    twitter: req.body.twitter,
    password: req.body.password
      ? bcrypt.hashSync(req.body.password)
      : existing.password,
  });

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    img: user.img,
    facebook: user.facebook,
    linkedIn: user.linkedIn,
    twitter: user.twitter,
    user: user.user,
  });
});

export default handler;
