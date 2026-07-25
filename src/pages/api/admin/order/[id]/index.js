import nc from "next-connect";
import orderRepo from "../../../../../repositories/orderRepo";
import { isAdmin, isAuth } from "../../../../../utils/auth";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  const order = await orderRepo.getById(req.query.id);
  if (!order) return res.status(404).send({ message: "Order Not Found" });
  res.send(order);
});

handler.delete(async (req, res) => {
  const removed = await orderRepo.removeById(req.query.id);
  if (!removed) {
    return res.status(404).send({ message: "Order Not Found" });
  }
  res.send({ message: "Order Deleted" });
});

export default handler;
