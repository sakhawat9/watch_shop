import nc from "next-connect";
import watchRepo from "../../../repositories/watchRepo";

const handler = nc();

handler.get(async (req, res) => {
  const watch = await watchRepo.listAll();
  res.send(watch);
});

export default handler;
