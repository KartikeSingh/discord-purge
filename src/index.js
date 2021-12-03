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
        const { handle = true, rejectEmoji, acceptEmoji } = options || {};

        this.handle = handle;
        this.rejectEmoji = rejectEmoji || "❌";
        this.acceptEmoji = acceptEmoji || "✔";

        checkParameter = checkParameter.bind(this)
        purgeIt = purgeIt.bind(this)
    }

    /**
     * 
     * @param {"messages" | "bot-messages" | "user-messages" | "link-messages" | "emoji-messages" | "attachment-messages"  | "messages-equal" | "messages-includes" | "messages-starts" | "messages-ends"} _module The purge module you want to use.
     * @param {Object} message The Discord.js Messages Object or Command Interaction in which command was used. 
     * @param {Object} channel The Discord.js Channel Object where i have to purge the messages.
     * @param {Number} number The number of messages ot purge.
     * @param {Object | String} extra The user Object for user-messages , string for Includes/Ends/Stats/Equals otherwise nothing.
     */
    async purge(_module, message, channel, number, extra) {
        return new Promise((resolve, reject) => {
            if ("messages" !== _module && "bot-messages" !== _module && "user-messages" !== _module && "link-messages" !== _module && "emoji-messages" !== _module && "attachment-messages" !== _module && "messages-equal" !== _module && "messages-includes" !== _module && "messages-starts" !== _module && "messages-ends" !== _module) return reject({ type: "error", message: "Invalid Module was provided", id: 4 });

            console.log(this.handle);
            switch (_module) {
                case "messages":
                    this.purgeMessages(message, channel, number).then(v => resolve(v)).catch(e => reject(e));
                    break;
                case "bot-messages":
                    this.purgeBotMessages(message, channel).then(v => resolve(v)).catch(e => reject(e));
                    break;
                case "link-messages":
                    this.purgeMessagesWithLinks(message, channel, number).then(v => resolve(v)).catch(e => reject(e));
                    break;
                case "emoji-messages":
                    this.purgeMessagesWithEmojis(message, channel, number).then(v => resolve(v)).catch(e => reject(e));
                    break;
                case "attachment-messages":
                    this.purgeMessagesWithAttachments(message, channel, number).then(v => resolve(v)).catch(e => reject(e));
                    break;
                case "user-messages":
                    this.purgeUserMessages(message, channel, number, extra).then(v => resolve(v)).catch(e => reject(e));
                    break;
                case "messages-equal":
                    this.purgeMessagesEqual(message, channel, number, extra).then(v => resolve(v)).catch(e => reject(e));
                    break;

                case "messages-includes":
                    this.purgeMessagesIncludes(message, channel, number, extra).then(v => resolve(v)).catch(e => reject(e));
                    break;

                case "messages-starts":
                    this.purgeMessagesStartsWith(message, channel, number, extra).then(v => resolve(v)).catch(e => reject(e));
                    break;
                case "messages-ends":
                    this.purgeMessagesEndsWith(message, channel, number, extra).then(v => resolve(v)).catch(e => reject(e));
                    break;

            }
        })
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
                purgeIt(this, message, channel, (v) => true, number).then(v => res(v)).catch(e => rej(e))
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
                purgeIt(this, message, channel, (v) => v.author.bot, 100).then(v => res(v)).catch(e => rej(e))
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
                purgeIt(this, message, channel, v => v.author.id === user, number).then(v => res(v)).catch(e => rej(e))
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
                purgeIt(this, message, channel, v => v.content.toLowerCase().includes(string.toLowerCase()), number).then(v => res(v)).catch(e => rej(e))
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
                purgeIt(this, message, channel, v => v.content.toLowerCase() === string.toLowerCase(), number).then(v => res(v)).catch(e => rej(e))
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
                purgeIt(this, message, channel, v => v.content.toLowerCase().startsWith(string.toLowerCase()), number).then(v => res(v)).catch(e => rej(e))
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
                purgeIt(this, message, channel, v => v.content.toLowerCase().endsWith(string.toLowerCase()), number).then(v => res(v)).catch(e => rej(e))
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
                purgeIt(this, message, channel, v => /(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/.test(v.content.toLowerCase()), number).then(v => res(v)).catch(e => rej(e))
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
                purgeIt(this, message, channel, v => v?.attachments?.size > 0, number).then(v => res(v)).catch(e => rej(e))
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
                purgeIt(this, message, channel, v => linkdetector.findLinks(v.content).length > 0, number).then(v => res(v)).catch(e => rej(e))
            } catch (e) {
                rej(e);
            }
        });
    }

}

module.exports = purge;
