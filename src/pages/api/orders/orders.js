import nc from "next-connect";
import orderRepo from "../../../repositories/orderRepo";
import { isAuth } from "../../../utils/auth";

const handler = nc();
handler.use(isAuth);

handler.post(async (req, res) => {
  // Trust the verified token for identity rather than the client-supplied body,
  // and never persist the JWT itself.
  try {
    const order = await orderRepo.create({
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
    res.status(201).send(order);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

export default handler;
