import nc from "next-connect";
import User from "../../models/User";
import Watch from "../../models/Watch";
import USE_MONGO from "../../utils/dataSource";
import db from "../../utils/db";
import { readCollection } from "../../utils/jsonStore";

const handler = nc();

// Destructive: wipes users + watches and reseeds from data/*.json. Guarded so
// it can never be triggered by a stray GET — requires POST and a matching
// SEED_SECRET.
//
// The seed source used to be a hardcoded fixture in src/utils/data.js holding
// nine lorem-ipsum products named "watch-01" … "watch-09". Running this
// endpoint would have overwritten the real catalogue with placeholder copy, so
// the curated JSON files are now the single source of truth for both backends.
handler.post(async (req, res) => {
  const secret = req.headers["x-seed-secret"] || req.query.secret;
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (!USE_MONGO) {
    return res.status(400).send({
      message:
        "DATA_SOURCE is not 'mongodb' — the JSON files in data/ are already the live store.",
    });
  }

  const users = readCollection("users");
  const watches = readCollection("watches");

  await db.connect();
  await User.deleteMany();
  await User.insertMany(users);
  await Watch.deleteMany();
  await Watch.insertMany(watches);
  await db.disconnect();

  res.send({
    message: "Seeded successfully",
    users: users.length,
    watches: watches.length,
  });
});

export default handler;
