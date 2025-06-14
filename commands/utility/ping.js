const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Checks the bot\'s latency'),

	async execute(interaction) {
		interaction.reply(`Pinging StackBot with ${interaction.client.ws.ping}ms of latency.`);
	},
};