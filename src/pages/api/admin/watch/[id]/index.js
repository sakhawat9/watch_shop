import nc from "next-connect";
import watchRepo from "../../../../../repositories/watchRepo";
import { isAdmin, isAuth } from "../../../../../utils/auth";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const watch = await watchRepo.getById(req.query.id);
  if (!watch) return res.status(404).send({ message: "Watch Not Found" });
  res.send(watch);
});

handler.put(async (req, res) => {
  const watch = await watchRepo.updateById(req.query.id, {
    name: req.body.name,
    slug: req.body.slug,
    shortDesc: req.body.shortDesc,
    category: req.body.category,
    price: Number(req.body.price),
    // delPrice drives the struck-through "was" price and the Sale badge; the
    // edit endpoint previously dropped it, so a discount could be set at
    // creation but never changed afterwards.
    delPrice: Number(req.body.delPrice ?? req.body.price),
    countInStock: Number(req.body.countInStock),
    prichard: Boolean(req.body.prichard),
    image: req.body.image,
    description: req.body.description,
  });
  if (!watch) {
    return res.status(404).send({ message: "Watch Not Found" });
  }
  res.send({ message: "Watch Updated Successfully" });
});

handler.delete(async (req, res) => {
  const removed = await watchRepo.removeById(req.query.id);
  if (!removed) {
    return res.status(404).send({ message: "Watch Not Found" });
  }
  res.send({ message: "Watch Deleted" });
});

export default handler;
