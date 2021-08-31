const Discord = require("discord.js");
const linkdetector = require("links-finder");
let checkParameter = require("./utility/checkParameter");
let purgeIt = require("./utility/purgeIt");

class purge {
    /**
     * The module to purge messages in a channel in advanced ways
     * @note All properties are optional
     * @param {Object} options The options of Purge Class
     * @param {Boolean} options.handle whether you want me to auto handle everything i.e. auto replying on errors etc
     * @param {String} options.rejectEmoji The rejection emoji like ❌,❎
     * @param {String} options.acceptEmoji The Accepting emoji like ✔,✅
     */
    constructor(options) {
        if (!options) options = {};
        const { handle, rejectEmoji, acceptEmoji } = options;

        this.handle = handle || true;
        this.rejectEmoji = rejectEmoji || "❌";
        this.acceptEmoji = acceptEmoji || "✔";

        checkParameter = checkParameter.bind(this)
        purgeIt = purgeIt.bind(this)
    }

    /**
     * An module to purge normal messages of a channel ( upto 100 )
     * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used 
     * @param {Discord.TextChannel} channel The channel where you want to purge messages
     * @param {Number} number The number of messages to purge
     */
    async purgeMessages(message, channel, number) {
        return new Promise(async (res, rej) => {
            try {
                await checkParameter(this, message, channel, number).then(v => { if (v === "done") return res("done"); message = v.message; channel = v.channel; number = v.number }).catch(e => { rej(e); })
                purgeIt(this, message, channel, (v) => true, number).then(v => res("done")).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        })
    }

    /**
      * An module to purge bot messages from last 100 messages
      * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
      * @param {Discord.TextChannel} channel The channel where you want to purge messages
      */
    async purgeBotMessages(message, channel) {
        return new Promise(async (res, rej) => {
            try {
                await checkParameter(this, message, channel, 100).then(v => { if (v === "done") return res("done"); message = v.message; channel = v.channel; }).catch(e => { rej(e); })
                purgeIt(this, message, channel, (v) => v.author.bot, 100).then(v => res("done")).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        })
    }

    /**
      * An module to purge user messages from last 100 messages
      * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
      * @param {Discord.TextChannel} channel The channel where you want to purge messages
      * @param {Number} number The number of messages to purge
      * @param {Discord.User | Discord.GuildMember | String} user The discord user or user ID
      */
    async purgeUserMessages(message, channel, number, user) {
        return new Promise(async (res, rej) => {
            try {
                await checkParameter(this, message, channel, number, true, user).then(v => { if (v === "done") return res("done"); message = v.message; channel = v.channel; number = v.number; user = v.user }).catch(e => { rej(e); })
                purgeIt(this, message, channel, v => v.author.id === user, number).then(v => res("done")).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        })
    }

    /**
      * An module to purge messages which contains ( from last 100 messages ) some string ( from last 100 messages )
      * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
      * @param {Discord.TextChannel} channel The channel where you want to purge messages
      * @param {Number} number Number of messages to delete
      * @param {String} string The string which message should include
      */
    async purgeMessagesIncludes(message, channel, number, string) {
        return new Promise(async (res, rej) => {
            try {
                await checkParameter(this, message, channel, number, true, undefined, string).then(v => { if (v === "done") return res("done"); message = v.message; channel = v.channel; number = v.number; string = v.string }).catch(e => { rej(e); })
                purgeIt(this, message, channel, v => v.content.toLowerCase().includes(string), number).then(v => res("done")).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        })
    }

    /**
      * An module to purge messages which are equal to some string ( from last 100 messages )
      * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
      * @param {Discord.TextChannel} channel The channel where you want to purge messages
      * @param {Number} number Number of messages to delete
      * @param {String} string The string which message should include
      */
    async purgeMessagesEqual(message, channel, number, string) {
        return new Promise(async (res, rej) => {
            try {
                await checkParameter(this, message, channel, number, true, undefined, string).then(v => { if (v === "done") return res("done"); message = v.message; channel = v.channel; number = v.number; string = v.string }).catch(e => { rej(e); })
                purgeIt(this, message, channel, v => v.content.toLowerCase() === string, number).then(v => res("done")).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        })
    }

    /**
      * An module to purge messages which starts with some string ( from last 100 messages )
      * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
      * @param {Discord.TextChannel} channel The channel where you want to purge messages
      * @param {Number} number Number of messages to delete
      * @param {String} string The string which message should include
      */
    async purgeMessagesStartsWith(message, channel, number, string) {
        return new Promise(async (res, rej) => {
            try {
                await checkParameter(this, message, channel, number, true, undefined, string).then(v => { if (v === "done") return res("done"); message = v.message; channel = v.channel; number = v.number; string = v.string }).catch(e => { rej(e); })
                purgeIt(this, message, channel, v => v.content.toLowerCase().startsWith(string), number).then(v => res("done")).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        })
    }

    /**
      * An module to purge messages which ends with some string ( from last 100 messages )
      * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
      * @param {Discord.TextChannel} channel The channel where you want to purge messages
      * @param {Number} number Number of messages to delete
      * @param {String} string The string which message should include
      */
    async purgeMessagesEndsWith(message, channel, number, string) {
        return new Promise(async (res, rej) => {
            try {
                await checkParameter(this, message, channel, number, true, undefined, string).then(v => { if (v === "done") return res("done"); message = v.message; channel = v.channel; number = v.number; string = v.string }).catch(e => { rej(e); })
                purgeIt(this, message, channel, v => v.content.toLowerCase().endsWith(string), number).then(v => res("done")).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        })
    }

    /**
      * An module to purge messages which contains ( from last 100 messages ) emojis
      * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
      * @param {Discord.TextChannel} channel The channel where you want to purge messages
      * @param {Number} number Number of messages to delete
      */
    async purgeMessagesWithEmojis(message, channel, number) {
        return new Promise(async (res, rej) => {
            try {
                await checkParameter(this, message, channel, number).then(v => { if (v === "done") return res("done"); message = v.message; channel = v.channel; number = v.number; }).catch(e => { rej(e); })
                purgeIt(this, message, channel, v => /(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/.test(v.content), number).then(v => res("done")).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        });
    }

    /**
      * An module to purge messages which contains ( from last 100 messages ) Attachments
      * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
      * @param {Discord.TextChannel} channel The channel where you want to purge messages
      * @param {Number} number Number of messages to delete
      */
    async purgeMessagesWithAttachments(message, channel, number) {
        return new Promise(async (res, rej) => {
            try {
                await checkParameter(this, message, channel, number).then(v => { if (v === "done") return res("done"); message = v.message; channel = v.channel; number = v.number; }).catch(e => { rej(e); })
                purgeIt(this, message, channel, v => v?.attachments?.size > 0, number).then(v => res("done")).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        });
    }

    /**
      * An module to purge messages which contains ( from last 100 messages ) links
      * @param {Discord.Message | Discord.CommandInteraction} message The message or interaction in which command was used
      * @param {Discord.TextChannel} channel The channel where you want to purge messages
      * @param {Number} number Number of messages to delete
      */
    async purgeMessagesWithLinks(message, channel, number) {
        return new Promise(async (res, rej) => {
            try {
                await checkParameter(this, message, channel, number).then(v => { if (v === "done") return res("done"); message = v.message; channel = v.channel; number = v.number; }).catch(e => { rej(e); })
                purgeIt(this, message, channel, v => linkdetector.findLinks(v.content).length > 0, number).then(v => res("done")).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        });
    }

}

module.exports = purge;