const { Events, ActivityType } = require('discord.js');
const { connectToMongo } = require('../db/connectToMongo.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		// Helpful log to see what command we loaded
		console.log('Commands loaded:', client.commands.keys());

		// Setting the bot's activity status
		client.user.setPresence({
			activities: [{ name: 'your commands.', type: ActivityType.Listening }],
			status: 'online',
		});

		const { db } = await connectToMongo();
		client.db = db;

		client.dbCollections = {
			guildSettings: db.collection('guildSettings'),
			// raffleEntries: db.collection('raffleEntries'),
			// potluckEntries: db.collection('potluckEntries'),
			// applications: db.collection('applications'),
			// guildSettings: db.collection('guildSettings'),

		};

		console.log('MongoDB connected and ready');


	},
};