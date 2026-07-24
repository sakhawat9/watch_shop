import nc from "next-connect";
import User from "../../models/User";
import Watch from "../../models/Watch";
import data from "../../utils/data";
import db from "../../utils/db";

const handler = nc();

// Destructive: wipes users + watches and reseeds. Guarded so it can never be
// triggered by a stray GET. Requires POST + a matching SEED_SECRET.
handler.post(async (req, res) => {
  const secret = req.headers["x-seed-secret"] || req.query.secret;
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Watch.deleteMany();
  await Watch.insertMany(data.watch);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;
