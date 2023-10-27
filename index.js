const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const channelId = config.channelId;
let messageLog = [];
const adminUserId = config.adminUserId;

// Load existing messages from messages.json if it exists
if (fs.existsSync('messages.json')) {
  try {
    const data = fs.readFileSync('messages.json', 'utf8');
    messageLog = JSON.parse(data);
  } catch (err) {
    console.error('Error loading messages.json:', err);
  }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.channel.id === channelId) {
    const messageContent = {
      authorID: message.author.id,
      authorUsername: message.author.username,
      content: message.content,
      timestamp: message.createdAt,
      attachments: [],
    };

    if (message.attachments.size > 0) {
      message.attachments.each((attachment) => {
        messageContent.attachments.push(attachment.url);
      });
    }

    messageLog.push(messageContent);

    // Save the updated messageLog to messages.json
    fs.writeFileSync('messages.json', JSON.stringify(messageLog, null, 2));
  }

  if (message.content === '!clear' && message.author.id === adminUserId) {
    // Clear the message log and the file
    messageLog = [];
    fs.writeFileSync('messages.json', '[]');
    message.channel.send('Message log cleared.');
  }

  if (message.content === '!help') {
    const helpEmbed = new MessageEmbed()
      .setTitle('Bot Commands')
      .setColor(0x0099ff)
      .addField('!help', 'Show this help message')
      .addField('!get', 'Retrieve message log')
      .addField('!clear', 'Clear the message log (Admin only)');
    message.channel.send({ embeds: [helpEmbed] });
  }

  if (message.content === '!get') {
    const numMessages = 10; // Number of messages to display
    const chunks = chunkArray(messageLog.slice().reverse(), numMessages);

    if (chunks.length > 0) {
      let currentPage = 0;
      const sendPageToChannel = async (currentPage) => {
        try {
          const messages = await message.channel.messages.fetch({ limit: 1 });
          if (messages.size > 0) {
            const oldMessage = messages.first();
            if (oldMessage.deletable) {
              await oldMessage.delete();
            }
          }
        } catch (error) {
          console.error('Error deleting old message:', error);
        }
        const chunk = chunks[currentPage];
        if (chunk) {
          const embed = new MessageEmbed()
            .setTitle(`Messages Log - Page ${currentPage + 1}`)
            .setColor(0x0099ff);

          chunk.forEach((msg, msgIndex) => {
            const author = msg.authorUsername;
            const messageText = msg.content;
            const attachments = msg.attachments.join('\n');
            if (messageText || attachments) {
              embed.addField(`**${author}**`, `${messageText}\n${attachments}`);
            }
          });

          const row = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId('prev')
              .setLabel('⬅️')
              .setStyle('PRIMARY'),
            new MessageButton()
              .setCustomId('next')
              .setLabel('➡️')
              .setStyle('PRIMARY')
          );

          message.channel.send({ embeds: [embed], components: [row] }).then((msg) => {
            const filter = (interaction) => {
              return interaction.user.id === message.author.id;
            };

            const collector = msg.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', (interaction) => {
              if (interaction.customId === 'prev' && currentPage > 0) {
                currentPage--;
              } else if (interaction.customId === 'next' && currentPage < chunks.length - 1) {
                currentPage++;
              }
              sendPageToChannel(currentPage);
            });
          });
        } else {
          message.channel.send('No messages found.');
        }
      };

      sendPageToChannel(currentPage);
    } else {
      message.channel.send('No messages found.');
    }
  }
});

function chunkArray(arr, chunkSize) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

client.login(config.token);
