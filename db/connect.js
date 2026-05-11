const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db('contacts'); // database name
  console.log('Connected to MongoDB');
}

function getDb() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

module.exports = { connectToDatabase, getDb };
