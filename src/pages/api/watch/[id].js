import nc from "next-connect";
import watchRepo from "../../../repositories/watchRepo";

const handler = nc();

handler.get(async (req, res) => {
  const watch = await watchRepo.getById(req.query.id);
  if (!watch) {
    return res.status(404).send({ message: "Watch Not Found" });
  }
  res.send(watch);
});

export default handler;
