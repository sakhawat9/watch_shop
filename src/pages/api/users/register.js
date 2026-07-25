import bcrypt from "bcryptjs";
import nc from "next-connect";
import userRepo from "../../../repositories/userRepo";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  const existing = await userRepo.getByEmail(req.body.email);
  if (existing) {
    return res.status(409).send({ message: "Email is already registered" });
  }

  const user = await userRepo.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
    img: req.body.img,
    facebook: req.body.facebook,
    linkedIn: req.body.linkedIn,
    twitter: req.body.twitter,
    user: req.body.user,
  });

  const token = signToken(user);
  res.status(201).send({
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
