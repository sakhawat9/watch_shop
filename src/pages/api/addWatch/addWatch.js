import nc from "next-connect";
import watchRepo from "../../../repositories/watchRepo";
import { isAdmin, isAuth } from "../../../utils/auth";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.post(async (req, res) => {
  const watch = await watchRepo.create({
    name: req.body.name,
    slug: req.body.slug,
    shortDesc: req.body.shortDesc,
    category: req.body.category,
    price: req.body.price,
    delPrice: req.body.delPrice,
    description: req.body.description,
    image: req.body.img,
    prichard: false,
  });

  res.status(201).send(watch);
});

export default handler;
