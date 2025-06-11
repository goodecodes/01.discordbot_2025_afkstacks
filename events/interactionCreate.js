const { Events } = require('discord.js');
const path = require('node:path');
const { loadHandlers } = require('../utils/loadHandlers.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		// Lazy load handlers onto client (only once)
		if (!interaction.client.buttonHandlers) {
			console.log('[INIT] Loading button handlers...');
			interaction.client.buttonHandlers = loadHandlers(path.join(__dirname, '../handlers/buttons'));
		}

		if (!interaction.client.dropdownHandlers) {
			console.log('[INIT] Loading dropdown handlers...');
			interaction.client.dropdownHandlers = loadHandlers(path.join(__dirname, '../handlers/dropdowns'));
		}

		if (!interaction.client.modalHandlers) {
			console.log('[INIT] Loading modal handlers...');
			interaction.client.modalHandlers = loadHandlers(path.join(__dirname, '../handlers/modals'));
		}

		// Process Button Interaction
		if (interaction.isButton()) {
			// Dynamic button matching
			const handlerKey = [...interaction.client.buttonHandlers.keys()].find(key =>
				interaction.customId.startsWith(key),
			);

			const handler = interaction.client.buttonHandlers.get(handlerKey);

			if (handler) {
				try {
					await handler(interaction);
				} catch (error) {
					console.error(`Error in button handler [${handlerKey}]:`, error);
					if (!interaction.replied && !interaction.deferred) {
						await interaction.reply({ content: 'There was an error handling this button.', ephemeral: true });
					}
				}
			} else {
				console.warn(`No button handler for customId: ${interaction.customId}`);
			}
		}

		// Process Dropdown Interaction
		else if (interaction.isStringSelectMenu()) {
			const handler = interaction.client.dropdownHandlers.get(interaction.customId);

			if (handler) {
				try {
					await handler(interaction);
				} catch (error) {
					console.error(`Error in dropdown handler [${interaction.customId}]:`, error);
					if (!interaction.replied && !interaction.deferred) {
						await interaction.reply({ content: 'There was an error handling this dropdown.', ephemeral: true });
					}
				}
			} else {
				console.warn(`No dropdown handler for customId: ${interaction.customId}`);
			}
		}

		// Process Modal Interaction
		else if (interaction.isModalSubmit()) {
			const handler = interaction.client.modalHandlers.get(interaction.customId);

			if (handler) {
				try {
					await handler(interaction);
				} catch (error) {
					console.error(`Error in modal handler [${interaction.customId}]:`, error);
					if (!interaction.replied && !interaction.deferred) {
						await interaction.reply({ content: 'There was an error handling this modal.', ephemeral: true });
					}
				}
			} else {
				console.warn(`No modal handler for customId: ${interaction.customId}`);
			}
		}

		// Process Chat Input Command
		else if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error in chat command [${interaction.commandName}]:`, error);
				if (!interaction.replied && !interaction.deferred) {
					await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
				}
			}
		}
	},
};
