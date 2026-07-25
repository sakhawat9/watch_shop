import nc from "next-connect";
import User from "../../models/User";
import Watch from "../../models/Watch";
import data from "../../utils/data";
import USE_MONGO from "../../utils/dataSource";
import db from "../../utils/db";
import { generateId, writeCollection } from "../../utils/jsonStore";

const handler = nc();

// Destructive: wipes users + watches and reseeds. Guarded so it can never be
// triggered by a stray GET. Requires POST + a matching SEED_SECRET.
handler.post(async (req, res) => {
  const secret = req.headers["x-seed-secret"] || req.query.secret;
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (USE_MONGO) {
    await db.connect();
    await User.deleteMany();
    await User.insertMany(data.users);
    await Watch.deleteMany();
    await Watch.insertMany(data.watch);
    await db.disconnect();
  } else {
    const now = new Date().toISOString();
    writeCollection(
      "users",
      data.users.map((u) => ({ ...u, _id: generateId(), createdAt: now, updatedAt: now }))
    );
    writeCollection(
      "watches",
      data.watch.map((w) => ({ ...w, _id: generateId(), createdAt: now, updatedAt: now }))
    );
  }

  res.send({ message: "seeded successfully" });
});

export default handler;
