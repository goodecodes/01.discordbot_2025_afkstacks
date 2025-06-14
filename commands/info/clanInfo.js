const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { WOMClient } = require('@wise-old-man/utils');
// will need to get from mongodb
const { getInfoConfig } = require('../../utils/handlers/configHelper');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('clan-info')
		.setDescription('Displays clan information from the Wise Old Man API'),
	async execute(interaction) {

		try {
			const { guild } = interaction;
			// will need to get from mongodb
		   const { clanMemberId, groupId } = await getInfoConfig();

			// Create a WOMClient instance and fetch the group details (replace 123 with your actual group ID)
			const client = new WOMClient();
			// will need to get from mongodb
			const group = await client.groups.getGroupDetails(groupId);
			const members = group.memberships;

			// Fetch all members in the guild to ensure they’re cached
			await guild.members.fetch();

			const clanMemberCount = guild.members.cache.filter(member =>
			// will need to get from mongodb
				member.roles.cache.has(clanMemberId),
			).size;

			// Build the embed with the desired information
			const embed = new EmbedBuilder()
				.setTitle('ℹ️ Information')
				.setDescription(group.description)
				.addFields({
					name: `▶️ ${group.name}`,
					value:
            '\u200B\n' +
            `**🪪 Group ID:** ${group.id.toString()}\n` +
            `**👤 Clan Chat:** ${group.clanChat || 'N/A'}\n` +
            `**🌐 Homeworld:** ${group.homeworld ? group.homeworld.toString() : 'N/A'}\n` +
            `**🕝 Creation Date:** ${new Date(group.createdAt).toLocaleDateString()}\n` +
            `**👥 Member Count:** ${group.memberCount.toString()}\n` +
            `**🔮 Discord Engagement:** ${100 * (clanMemberCount / members.length).toFixed(2)}%`,
				})
				.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
				.setTimestamp();

			// Reply with the embed
			await interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'There was an error fetching the clan information.',
				ephemeral: true,
			});
		}
	},
};
