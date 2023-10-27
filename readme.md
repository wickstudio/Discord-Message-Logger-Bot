# Discord Message Logger Bot

## Overview
This Discord bot is designed to automatically log messages sent in a specific channel to a JSON file (`messages.json`). The bot listens for new messages and records them in the JSON file for future reference.

![Demo Screenshot](https://media.discordapp.net/attachments/875162620502626387/1167558706481856602/image.png?ex=654e90c7&is=653c1bc7&hm=ae83d921e6b393476418f8438634a8145dd0b9095c03e953ed76edf9e4538138&=&width=591&height=675)

## Features
- Automatically logs messages sent in a specified channel.
- Logs message content, author, and timestamp.
- Easily customizable and configurable.

## Setup
Follow these steps to set up and deploy the bot:

1. **Prerequisites**
   - Node.js installed on your machine.
   - A Discord bot token. You can create a bot and get the token from the [Discord Developer Portal](https://discord.com/developers/applications).

2. **Configuration**
   - Clone or download this repository to your local machine.
   - Open the `config.json` file in the project directory and fill in the following information:
     - `token`: Your Discord bot token.
     - `channelId`: The ID of the channel where you want to log messages.
     - `adminUserId`: The ID of the admin role (optional for additional functionality).

3. **Installation**
   - Run `install.bat` to install the required dependencies.

4. **Bot Usage**
   - To log messages to `messages.json`, ensure that your bot has access to the specified channel (based on `channelId` in `config.json`).
   - When users send messages in the specified channel, the bot will automatically log them.

5. **Customization**
   - You can further customize the bot by modifying the channel ID in the `config.json` file to log messages in a specific channel of your choice.

6. **Running the Bot**
   - Start the bot by running `start.bat`. This script will take care of the necessary setup and execution.

## Social Media and Contact
You can connect with me on social media for questions, support, or suggestions:

- [Website](https://wickdev.xyz/)
- [Instagram](https://www.instagram.com/mik__subhi)
- [Discord](https://discord.gg/zhS5nuRkaz)
- [GitHub](https://github.com/Wickdev077)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- This bot is built using the [discord.js](https://discord.js.org) library.
- Special thanks to the Discord community for support and inspiration.

![Wick Dev](https://media.discordapp.net/attachments/875162620502626387/1167560061665689690/New_Project_-_2023-10-04T194651.988-fotor-2023100717817.png?ex=654e920a&is=653c1d0a&hm=a737c2909cee5ec9d9b647d38876d54ef1dc68e12618645204a9df213bf34519&=&width=1285&height=675)