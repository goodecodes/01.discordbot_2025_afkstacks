const fs = require('node:fs');
const path = require('node:path');

function loadHandlers(folderPath) {
	const handlers = new Map();
	const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

	for (const file of files) {
		const filePath = path.join(folderPath, file);
		const handler = require(filePath);

		if (handler.customId && handler.execute) {
			handlers.set(handler.customId, handler.execute);
		} else {
			console.warn(`[WARNING] Handler at ${filePath} is missing "customId" or "execute".`);
		}
	}

	return handlers;
}

module.exports = { loadHandlers };
