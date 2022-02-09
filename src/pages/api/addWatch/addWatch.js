import nc from "next-connect";
import Watch from "../../../models/Watch";
import db from "../../../utils/db";

const handler = nc();
handler.post(async (req, res) => {
  await db.connect();
  const newWatch = new Watch({
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
  const watch = await newWatch.save();
  await db.disconnect();

  res.send({
    name: watch.name,
    slug: watch.slug,
    shortDesc: watch.shortDesc,
    category: watch.category,
    price: watch.price,
    delPrice: watch.delPrice,
    description: watch.description,
    image: watch.img,
    prichard: watch.prichard,
  });
});
export default handler;
