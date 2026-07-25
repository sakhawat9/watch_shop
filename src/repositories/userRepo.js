import User from "../models/User";
import db from "../utils/db";
import USE_MONGO from "../utils/dataSource";
import { generateId, readCollection, writeCollection } from "../utils/jsonStore";

const COLLECTION = "users";

async function listAll() {
  if (USE_MONGO) {
    await db.connect();
    const items = await User.find({}).lean();
    await db.disconnect();
    return items.map(db.convertDocToObj);
  }
  return readCollection(COLLECTION);
}

async function getById(id) {
  if (USE_MONGO) {
    await db.connect();
    const item = await User.findById(id).lean();
    await db.disconnect();
    return item ? db.convertDocToObj(item) : null;
  }
  return readCollection(COLLECTION).find((u) => u._id === id) || null;
}

async function getByEmail(email) {
  if (USE_MONGO) {
    await db.connect();
    const item = await User.findOne({ email }).lean();
    await db.disconnect();
    return item ? db.convertDocToObj(item) : null;
  }
  return readCollection(COLLECTION).find((u) => u.email === email) || null;
}

async function create(data) {
  if (USE_MONGO) {
    await db.connect();
    const user = await new User(data).save();
    await db.disconnect();
    return db.convertDocToObj(user.toObject());
  }
  const items = readCollection(COLLECTION);
  const now = new Date().toISOString();
  const item = {
    isAdmin: false,
    facebook: "",
    linkedIn: "",
    twitter: "",
    img: "https://res.cloudinary.com/academist/image/upload/v1635867877/instagram-3814050_960_720_tuxecu.png",
    user: true,
    ...data,
    _id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  items.push(item);
  writeCollection(COLLECTION, items);
  return item;
}

async function updateById(id, patch) {
  if (USE_MONGO) {
    await db.connect();
    const user = await User.findById(id);
    if (!user) {
      await db.disconnect();
      return null;
    }
    Object.assign(user, patch);
    await user.save();
    await db.disconnect();
    return db.convertDocToObj(user.toObject());
  }
  const items = readCollection(COLLECTION);
  const index = items.findIndex((u) => u._id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...patch, updatedAt: new Date().toISOString() };
  writeCollection(COLLECTION, items);
  return items[index];
}

async function removeById(id) {
  if (USE_MONGO) {
    await db.connect();
    const user = await User.findById(id);
    if (!user) {
      await db.disconnect();
      return false;
    }
    await user.deleteOne();
    await db.disconnect();
    return true;
  }
  const items = readCollection(COLLECTION);
  const next = items.filter((u) => u._id !== id);
  if (next.length === items.length) return false;
  writeCollection(COLLECTION, next);
  return true;
}

const userRepo = { listAll, getById, getByEmail, create, updateById, removeById };
export default userRepo;
