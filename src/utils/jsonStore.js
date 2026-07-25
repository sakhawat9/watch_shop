import fs from "fs";
import path from "path";

// Server-only. Simple synchronous file-backed collections used when
// DATA_SOURCE !== "mongodb". Good enough for local dev/demo use; concurrent
// writes are not locked, so this is not meant for multi-instance production.
const DATA_DIR = path.join(process.cwd(), "data");

function filePath(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readCollection(collection) {
  const file = filePath(collection);
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8");
  return raw.trim() ? JSON.parse(raw) : [];
}

function writeCollection(collection, items) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(filePath(collection), `${JSON.stringify(items, null, 2)}\n`);
}

// Mongo-like 24-char hex id so existing `_id` string handling (comparisons,
// .toString() calls, URL params) keeps working unchanged.
function generateId() {
  const timestamp = Math.floor(Date.now() / 1000)
    .toString(16)
    .padStart(8, "0");
  const random = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
  return timestamp + random;
}

export { readCollection, writeCollection, generateId };
