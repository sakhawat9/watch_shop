import Order from "../models/Orders";
import db from "../utils/db";
import USE_MONGO from "../utils/dataSource";
import { generateId, readCollection, writeCollection } from "../utils/jsonStore";

const COLLECTION = "orders";

async function listAll() {
  if (USE_MONGO) {
    await db.connect();
    const items = await Order.find({}).lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(items));
  }
  return readCollection(COLLECTION);
}

async function listByUserId(userId) {
  if (USE_MONGO) {
    await db.connect();
    const items = await Order.find({ "userInfo._id": userId }).lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(items));
  }
  return readCollection(COLLECTION).filter((o) => o.userInfo?._id === userId);
}

async function getById(id) {
  if (USE_MONGO) {
    await db.connect();
    const item = await Order.findById(id).lean();
    await db.disconnect();
    return item ? JSON.parse(JSON.stringify(item)) : null;
  }
  return readCollection(COLLECTION).find((o) => o._id === id) || null;
}

async function create(data) {
  if (USE_MONGO) {
    await db.connect();
    const order = await new Order(data).save();
    await db.disconnect();
    return JSON.parse(JSON.stringify(order.toObject()));
  }
  const items = readCollection(COLLECTION);
  const now = new Date().toISOString();
  const item = { ...data, _id: generateId(), createdAt: now, updatedAt: now };
  items.push(item);
  writeCollection(COLLECTION, items);
  return item;
}

async function removeById(id) {
  if (USE_MONGO) {
    await db.connect();
    const order = await Order.findById(id);
    if (!order) {
      await db.disconnect();
      return false;
    }
    await order.deleteOne();
    await db.disconnect();
    return true;
  }
  const items = readCollection(COLLECTION);
  const next = items.filter((o) => o._id !== id);
  if (next.length === items.length) return false;
  writeCollection(COLLECTION, next);
  return true;
}

const orderRepo = { listAll, listByUserId, getById, create, removeById };
export default orderRepo;
