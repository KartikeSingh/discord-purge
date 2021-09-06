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

# Note
- We supports Discord.js V-13 <b>only</b>.
- We supports both slash commands and text based commands.
- Right now the you can purge 100 messages at most.
- You will have to use `.then` and `.catch` if <b>handle</b> is setted to false.

# Methods
This package have following methods.
- ## Easy Way

```js
const Purger = require('discord-purger');
const purger = new Purger();

/**
 * @param {String} _module The module to use, The list is give below.
 * @param {Object} message The Discord.js Messages Object or Command Interaction in which command was used. 
 * @param {Object} channel The Discord.js Channel Object where i have to purge the messages.
 * @param {Number} number The number of messages ot purge.
 * @param {Object | String} extra The user Object for user-messages , string for Includes/Ends/Stats/Equals nothing.
 */
purger.purge(_module_, message, channel, number, user || string);

// All available modules.
const modules = [
    "messages",
    "bot-messages",
    "user-messages",
    "link-messages",
    "emoji-messages",
    "attachment-messages",
    "messages-equal",
    "messages-includes",
    "messages-starts",
    "messages-ends"
]
```

- ## Complex Way

```js
const Purger = require('discord-purger');
const purger = new Purger({
  handle:true,
  rejectEmoji:"❎", // emoji to show on error.
  acceptEmoji:"✅", // Emoji to show on success.
});
/**
  * An module to purge normal messages of a channel ( upto 100 )
  * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used 
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number The number of messages to purge
  */
purger.purgeMessages(message, channel, number)

/**
  * An module to purge bot messages from last 100 messages
  * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  */
purger.purgeBotMessages(message, channel)

/**
  * An module to purge user messages from last 100 messages
  * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number The number of messages to purge
  * @param {Discord.User | Discord.GuildMember | String} user The discord user or user ID
  */
purger.purgeUserMessages(message, channel, number, user)

/**
  * An module to purge messages which contains ( from last 100 messages ) some string ( from last 100 messages )
  * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number Number of messages to delete
  * @param {String} string The string which message should include
  */
purger.purgeMessagesIncludes(message, channel, number, string)

/**
  * An module to purge messages which are equal to some string ( from last 100 messages )
  * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number Number of messages to delete
  * @param {String} string The string which message should include
  */
purger.purgeMessagesEqual(message, channel, number, string)

/**
  * An module to purge messages which starts with some string ( from last 100 messages )
  * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number Number of messages to delete
  * @param {String} string The string which message should include
  */
purger.purgeMessagesStartsWith(message, channel, number, string)

/**
  * An module to purge messages which ends with some string ( from last 100 messages )
  * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number Number of messages to delete
  * @param {String} string The string which message should include
  */
purger.purgeMessagesEndsWith(message, channel, number, string)
/**
  * An module to purge messages which contains ( from last 100 messages ) emojis
  * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number Number of messages to delete
  */
purger.purgeMessagesWithEmojis(message, channel, number)

/**
  * An module to purge messages which contains ( from last 100 messages ) Attachments
  * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number Number of messages to delete
  */
purger.purgeMessagesWithAttachments(message, channel, number)

/**
  * An module to purge messages which contains ( from last 100 messages ) links
  * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
  * @param {Discord.TextChannel} channel The channel where you want to purge messages
  * @param {Number} number Number of messages to delete
  */
purger.purgeMessagesWithLinks(message, channel, number)
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