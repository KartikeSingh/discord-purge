# Installations
```
npm i discord-purger
```

# What?
You might be thinking that what is this package we already have inbuilt purge method BUT with this package you can purge in advanced ways and very easily. for example puring messages with links, images, emoji of a user etc.

# Why?
- Fast.
- Easy to use.
- Active Support on [discord server](https://discord.gg/XYnMTQNTFh).

# Methods
This package have following methods.
```js
const Purger = require('discord-purger');
const purger = new Purger();

/**
* @param {Discord.Message | Discord.CommandInteraction} message
* @param {Discord.TextChannel} channel The channel where you want to purge messages
* @param {Number} number 
 */
purger.purgeMessages(message, channel, number);

/**
  * An module to purge bot messages from last 100 messages
  * @param {Discord.Message | Discord.CommandInteraction} message
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  */
purger.purgeBotMessages(message, channel)

/**
  * An module to purge user messages from last 100 messages
  * @param {Discord.Message | Discord.CommandInteraction} message
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Discord.User | Discord.GuildMember | String} user The discord user or user ID
  * @param {Number} user The number of messages to purge
  */
purger.purgeUserMessages(message, channel, number, user)

/**
  * An module to purge messages which contains some string ( from last 100 messages )
  * @param {Discord.Message | Discord.CommandInteraction} message
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {String} string The string which message should include
  * @param {Number} number Number of messages to delete
  */
purger.purgeMessagesIncludes(message, channel, number, string)

/**
  * An module to purge messages which are equal to some string ( from last 100 messages )
  * @param {Discord.Message | Discord.CommandInteraction} message
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {String} string The string which message should include
  * @param {Number} number Number of messages to delete
  */
purger.purgeMessagesEqual(message, channel, number, string)

/**
  * An module to purge messages which starts with some string ( from last 100 messages )
  * @param {Discord.Message | Discord.CommandInteraction} message
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {String} string The string which message should include
  * @param {Number} number Number of messages to delete
  */
purger.purgeMessagesStartsWith(message, channel, number, string)
/**
  * An module to purge messages which ends with some string ( from last 100 messages )
  * @param {Discord.Message | Discord.CommandInteraction} message
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {String} string The string which message should include
  * @param {Number} number Number of messages to delete
  */
purger.purgeMessagesEndsWith(message, channel, number, string)

/**
  * An module to purge messages which contains emojis
  * @param {Discord.Message | Discord.CommandInteraction} message
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number Number of messages to delete
  */
purger.purgeMessagesWithEmojis(message, channel, number)

/**
  * An module to purge messages which contains Attachments
  * @param {Discord.Message | Discord.CommandInteraction} message
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number Number of messages to delete
  */
purger.purgeMessagesWithAttachments(message, channel, number)
/**
  * An module to purge messages which contains links
  * @param {Discord.Message | Discord.CommandInteraction} message
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number Number of messages to delete
  */
purger.purgeMessagesWithLinks(message, channel, number);
```

# Advanced 
```js
// You can disable auto message handling via
const Purger = require('discord-purger');
const purger = new Purger({ 
    handle: false,
    acceptEmoji: "✅",
    rejectEmoji: "❎"
});

// Now you will get promise rejections on errors
const ErrorObject = {
    type:"error",
    message:"Some error message",
    id:1, // The error ID
};

// All the possible Error IDS
const ListOfErros = {
    0:"Invalid_Channel",
    1:"Invalid_Number_Of_Messages",
    2:"Invalid_User",
    3:"Messages_Not_Found",
}

// promise full fill when purged successfully
const successObject = {
    type: "success",
     message: `Successfully Purged ${numberOfMessages} messages`,
    data // This Object have username as keys and value is number of their messages purged 
}
```

# Support
for support or issues or queries contace me on my [discord server](https://discord.gg/XYnMTQNTFh).