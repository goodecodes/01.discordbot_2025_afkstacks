module.exports = {

	// Inserts a document
	async insertOne(collection, document) {
		return await collection.insertOne(document);
	},

	// Finds a single document
	async findOne(collection, query) {
		return await collection.findOne(query);
	},

	// Finds multiple document
	async findMany(collection, query = {}, options = {}) {
		return await collection.find(query, options).toArray();
	},

	// Upserts (insert or update) an document
	async upsertOne(collection, query, updateFields) {
		return await collection.updateOne(
			query,
			{ $set: updateFields },
			{ upsert: true },
		);
	},

	// Deletes a single item
	async deleteOne(collection, query) {
		return await collection.deleteOne(query);
	},

	// Deletes multiple items
	async deleteMany(collection, query) {
		return await collection.deleteMany(query);
	},

	async getGuildSettings(dbCollections, guildId) {
	// default keys are defined here
		// good for safely adding new settings even if not all guilds use
		const defaults = {
			clanMemberId: null,
			guestRoleId: null,
			pendingMemberRoleId: null,
			playerUpdateChannelId: null,
			setRsnChannelId: null,
			rankApplicationId: null,
			weekliesAnnouncementId: null,
			mentorListId: null,
			mentorPingsId: null,
			applicationLogId: null,
			groupId: null,
		};

		// Loads guildSettings from mongo
		const settingsDoc = await dbCollections.guildSettings.findOne({ guildId });
		if (!settingsDoc) {
			console.warn(`No guildSettings found for guildId ${guildId}`);

			// Returns default settings if they aren't set
			return { guildId, config: defaults };
		}

		// Merges defaults with stored config
		const config = { ...defaults, ...settingsDoc.config };

		return { ...settingsDoc, config };
	},

	async setGuildSetting(dbCollections, guildId, key, value) {
		const update = {};
		update[`config.${key}`] = value;

		const result = await dbCollections.guildSettings.updateOne(
			{ guildId },
			{ $set: update },
			{ upsert: true },
		);

		console.log(`setGuildSetting: [${guildId}] ${key} = ${value}`);
		return result;
	},


};
