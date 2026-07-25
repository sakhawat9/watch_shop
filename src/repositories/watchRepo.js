import Watch from "../models/Watch";
import db from "../utils/db";
import USE_MONGO from "../utils/dataSource";
import { generateId, readCollection, writeCollection } from "../utils/jsonStore";

const COLLECTION = "watches";

async function listAll() {
  if (USE_MONGO) {
    await db.connect();
    const items = await Watch.find({}).lean();
    await db.disconnect();
    return items.map(db.convertDocToObj);
  }
  return readCollection(COLLECTION);
}

async function getById(id) {
  if (USE_MONGO) {
    await db.connect();
    const item = await Watch.findById(id).lean();
    await db.disconnect();
    return item ? db.convertDocToObj(item) : null;
  }
  return readCollection(COLLECTION).find((w) => w._id === id) || null;
}

async function getBySlug(slug) {
  if (USE_MONGO) {
    await db.connect();
    const item = await Watch.findOne({ slug }).lean();
    await db.disconnect();
    return item ? db.convertDocToObj(item) : null;
  }
  return readCollection(COLLECTION).find((w) => w.slug === slug) || null;
}

async function search({ name, category }) {
  if (USE_MONGO) {
    await db.connect();
    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = category;
    const items = await Watch.find(filter).lean();
    await db.disconnect();
    return items.map(db.convertDocToObj);
  }
  let items = readCollection(COLLECTION);
  if (name) {
    const needle = name.toLowerCase();
    items = items.filter((w) => w.name?.toLowerCase().includes(needle));
  }
  if (category) {
    items = items.filter((w) => w.category === category);
  }
  return items;
}

async function create(data) {
  if (USE_MONGO) {
    await db.connect();
    const watch = await new Watch(data).save();
    await db.disconnect();
    return db.convertDocToObj(watch.toObject());
  }
  const items = readCollection(COLLECTION);
  const now = new Date().toISOString();
  const item = {
    bannerImage:
      "https://res.cloudinary.com/medsy/image/upload/v1648894980/images/herobg_sou5pk.jpg",
    rating: 4,
    countInStock: 20,
    prichard: false,
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
    const watch = await Watch.findById(id);
    if (!watch) {
      await db.disconnect();
      return null;
    }
    Object.assign(watch, patch);
    await watch.save();
    await db.disconnect();
    return db.convertDocToObj(watch.toObject());
  }
  const items = readCollection(COLLECTION);
  const index = items.findIndex((w) => w._id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...patch, updatedAt: new Date().toISOString() };
  writeCollection(COLLECTION, items);
  return items[index];
}

async function removeById(id) {
  if (USE_MONGO) {
    await db.connect();
    const watch = await Watch.findById(id);
    if (!watch) {
      await db.disconnect();
      return false;
    }
    await watch.deleteOne();
    await db.disconnect();
    return true;
  }
  const items = readCollection(COLLECTION);
  const next = items.filter((w) => w._id !== id);
  if (next.length === items.length) return false;
  writeCollection(COLLECTION, next);
  return true;
}

const watchRepo = { listAll, getById, getBySlug, search, create, updateById, removeById };
export default watchRepo;
