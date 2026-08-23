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
    price: Number(req.body.price),
    delPrice: Number(req.body.delPrice ?? req.body.price),
    description: req.body.description,
    image: req.body.img,
    // These were previously ignored, so every product created through the
    // admin silently fell back to the repository defaults regardless of what
    // the form said.
    countInStock: Number(req.body.countInStock ?? 20),
    prichard: Boolean(req.body.prichard),
  });

  res.status(201).send(watch);
});

export default handler;
