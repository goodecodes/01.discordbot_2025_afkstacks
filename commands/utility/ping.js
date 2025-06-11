const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('checks the bot\'s ping'),

	async execute(interaction) {
		interaction.reply(`Pinging StackBot with ${client.ws.ping}ms of latency.`);
	},
};