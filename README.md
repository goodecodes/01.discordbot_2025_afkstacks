# StackBot - Custom Discord Bot

A Discord bot providing solutions for managing **OSRS Clans**, built with [discord.js](https://discord.js.org/), [Node.js](https://nodejs.org/en), and [MongoDB](https://www.mongodb.com/).

---
## APIs & Integrations

Below is a quick overview of the external APIs this bot talks to:

- **Discord API**   
  • Docs: https://discord.com/developers/docs/intro

- **Wise Old Man API**      
  • Docs: https://docs.wiseoldman.net/

- **MongoDB Atlas** (or Local MongoDB)  
  • Docs: https://docs.atlas.mongodb.com/

- **OSRS Wiki API**   
  • Docs: https://oldschool.runescape.wiki/api.php

--- 

##  Key Features

- **Event Management**: Easily create BotW and Sotw weekly events through the bot on both Wise Old Man and your Discord Server. When the events conclude, the bot will auto generate an announcement in a channel or thread of your choosing. The skill or boss can be random or chosen.

- **Embed Creation**: The bot has many pre-built embeds that can employed in your server from role applications, dropdown menus, coffer utilities, etc.

- **Member Management**: The bot can map discord members to their in game identity. From here, it can handle member status changes and role management between in-game and discord for you.
---

## Prerequisites

- **Git** (v2.0+): to clone the repo and manage versions

- **Node.js** (v20+ newer): includes npm for installing dependencies

- **npm** (comes with Node.js) to install packages and run scripts

- **MongoDB** (v5.0+), if you’re running a local database for persistence

- **MongoDB Atlas** for managing mongodb in the cloud. 

- **VSCode** or another code editor for development 

- (Optional) Cloud Host of your choice (AWS, Google Cloud, Microsoft Azure)

---

## Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/goodecodes/01.discordbot_2025_afkstacks.git
   cd your-bot-repo

2. **Install node packages**
   ```bash 
    npm i

## Running

1. **Command Deployment**
    ```bash
    node ./deploy-commands.js

2. **Start Bot**
    ```bash
    node ./index.js

## Support
1. [discord.gg/stackbot]()