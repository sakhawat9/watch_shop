import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return;
    }
    await mongoose.disconnect();
  }

  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env.local and fill in " +
        "a working MongoDB connection string, then restart the dev server."
    );
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    if (err.code === "ENOTFOUND" || err.message?.includes("querySrv")) {
      throw new Error(
        `Could not resolve the MongoDB host in MONGODB_URI. The Atlas cluster ` +
          `may have been paused or deleted (free-tier clusters auto-delete after ` +
          `prolonged inactivity). Verify the connection string in your Atlas ` +
          `dashboard and update .env.local. Original error: ${err.message}`
      );
    }
    throw err;
  }
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
    }
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

function convertSubDocToObj(doc) {
  doc.lessondatas._id = doc.lessondatas._id.toString();
  doc.lessondatas.createdAt = doc.lessondatas.createdAt.toString();
  doc.lessondatas.updatedAt = doc.lessondatas.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj, convertSubDocToObj };
export default db;
