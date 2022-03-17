import nc from "next-connect";
import db from "../../../../../utils/db";
import { isAuth } from "../../../../../utils/auth";
import Order from "../../../../../models/Orders";

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(orders);
});

handler.delete(async (req, res) => {
  await db.connect();
  const orders = await Order.findById(req.query.id);
  if (orders) {
    await orders.remove();
    await db.disconnect();
    res.send({ message: "Order Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Order Not Found" });
  }
});

export default handler;
