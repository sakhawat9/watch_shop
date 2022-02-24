import nc from "next-connect";
import Watch from "../../../../../models/Watch";
import { isAuth } from "../../../../../utils/auth";
import db from "../../../../../utils/db";

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const watch = await Watch.findById(req.query.id);
  await db.disconnect();
  res.send(watch);
});

handler.put(async (req, res) => {
  await db.connect();
  const watch = await Watch.findById(req.query.id);
  if (watch) {
    watch.name = req.body.name;
    watch.slug = req.body.slug;
    watch.shortDesc = req.body.shortDesc;
    watch.category = req.body.category;
    watch.level = req.body.level;
    watch.price = req.body.price;
    // watch.delPrice = req.body.delPrice;
    // watch.rating = req.body.rating;
    watch.countInStock = req.body.countInStock;
    watch.videoUrl = req.body.videoUrl;
    watch.prichard = Boolean(req.body.prichard);
    watch.image = req.body.image;
    watch.bannerImage = req.body.bannerImage;
    watch.description = req.body.description;
    await watch.save();
    await db.disconnect();
    res.send({ message: "Watch Updated Successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Watch Not Found" });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const watch = await Watch.findById(req.query.id);
  if (watch) {
    await watch.remove();
    await db.disconnect();
    res.send({ message: 'Watch Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Watch Not Found' });
  }
});

export default handler;