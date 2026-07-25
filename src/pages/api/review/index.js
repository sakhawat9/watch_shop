import nc from "next-connect";
import reviewRepo from "../../../repositories/reviewRepo";

const handler = nc();

handler.post(async (req, res) => {
  const review = await reviewRepo.create({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    img: req.body.img,
  });

  res.status(201).send(review);
});
export default handler;
