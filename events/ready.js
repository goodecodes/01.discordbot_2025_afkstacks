const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		// Helpful log to see what command we loaded
		console.log('Commands loaded:', client.commands.keys());

		// Setting the bot's activity status
		client.user.setPresence({
			activities: [{ name: 'your commands.', type: ActivityType.Listening }],
			status: 'online',
		});

	},
};