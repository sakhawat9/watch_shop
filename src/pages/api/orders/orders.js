import nc from "next-connect";
import Order from "../../../models/Orders";
import { isAuth } from "../../../utils/auth";
import db from "../../../utils/db";

const handler = nc();
handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  // Trust the verified token for identity rather than the client-supplied body,
  // and never persist the JWT itself.
  const newOrder = new Order({
    paymentInfo: req.body.paymentInfo,
    cartItems: req.body.cartItems,
    shippingAddress: req.body.shippingAddress,
    userInfo: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin || false,
    },
  });

  try {
    const order = await newOrder.save();
    await db.disconnect();
    res.status(201).send(order);
  } catch (err) {
    await db.disconnect();
    res.status(400).send({ message: err.message });
  }
});

export default handler;
