const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

let client;
let db;

async function connectToMongo() {
	if (client && db) {
		return { client, db };
	}

	client = new MongoClient(MONGO_URI);

	await client.connect();
	db = client.db('stackBotDB');

	console.log('Connected to MongoDB');
	return { client, db };
}

module.exports = { connectToMongo };
