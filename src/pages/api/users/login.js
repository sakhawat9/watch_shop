import bcrypt from "bcryptjs";
import nc from "next-connect";
import userRepo from "../../../repositories/userRepo";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  const user = await userRepo.getByEmail(req.body.email);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
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
  } else {
    res.status(401).send({ message: "Invalid user or password" });
  }
});

export default handler;
