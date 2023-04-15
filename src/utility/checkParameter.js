const { ChannelType }= require("discord.js")
module.exports = (f, message, channel, number, forward, user, string) => {
    const { handle, rejectEmoji } = f;

    return new Promise((res, rej) => {
        if (!message || !message.channel) {
            if (!handle) return rej({ type: "error", message: "Invalid Number of messages were provided", id: 1 });

            if (!message.replied) message.channel.send({ embeds: [{ color: 0xff0000, title: `Invalid Number of messages were provided ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: 0xff0000, title: `Invalid Number of messages were provided ${rejectEmoji}` }] })

            return res("done");
        }
console.log(channel.type)
        if (!channel || !channel.type || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.PublicThread && channel.type !== ChannelType.AnnouncementThread && channel.type !== ChannelType.PrivateThread)) {
            if (!handle) return rej({ type: "error", message: "Invalid channel was provided", id: 0 });

            if (!message.replied) message.channel.send({ embeds: [{ color: 0xff0000, title: `Invalid Channel was provided ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: 0xff0000, title: `Invalid Channel was provided ${rejectEmoji}` }] })

            return res("done");
        }

        number = parseInt(number);

        if (!number || isNaN(number)) {
            if (!handle) return rej({ type: "error", message: "Invalid Number of messages were provided", id: 1 });

            if (!message.replied) message.channel.send({ embeds: [{ color: 0xff0000, title: `Invalid Number of messages were provided ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: 0xff0000, title: `Invalid Number of messages were provided ${rejectEmoji}` }] })

            return res("done");
        }

        if (!forward) return res({ message, channel, number });

        user = user?.id || user;

        if (!user && !string) {
            if (!handle) return rej({ type: "error", message: "Invalid user/user ID was provided", id: 2 });

            if (!message.replied) message.channel.send({ embeds: [{ color: 0xff0000, title: `Invalid User/User ID was provided ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: 0xff0000, title: `Invalid User/User ID was provided ${rejectEmoji}` }] })

            return res("done");
        }

        if (!user && (!string || string.trim().length === 0)) {
            if (!handle) return rej({ type: "error", message: "Invalid string was provided", id: 3 });

            if (!message.replied) message.channel.send({ embeds: [{ color: 0xff0000, title: `Invalid string was provided ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: 0xff0000, title: `Invalid string was provided ${rejectEmoji}` }] })

            return res("done");
        }

        return res({ message, channel, number, user, string });
    })
}