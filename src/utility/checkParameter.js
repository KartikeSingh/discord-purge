module.exports = (f, message, channel, number, forward, user, string) => {
    const { handle, rejectEmoji } = f;

    return new Promise((res, rej) => {
        if (!message || !message.channel) {
            if (!handle) return rej({ type: "error", message: "Invalid Number of messages were provided", id: 1 });

            if (!message.replied) message.channel.send({ embeds: [{ color: "RED", title: `Invalid Number of messages were provided ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: "RED", title: `Invalid Number of messages were provided ${rejectEmoji}` }] })

            return res("done");
        }

        if (!channel || !channel.type || (channel.type !== "GUILD_TEXT" && channel.type !== "GUILD_PUBLIC_THREAD" && channel.type !== "GUILD_NEWS" && channel.type !== "GUILD_NEWS_THREAD" && channel.type !== "GUILD_PRIVATE_THREAD")) {
            if (!handle) return rej({ type: "error", message: "Invalid channel was provided", id: 0 });

            if (!message.replied) message.channel.send({ embeds: [{ color: "RED", title: `Invalid Channel was provided ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: "RED", title: `Invalid Channel was provided ${rejectEmoji}` }] })

            return res("done");
        }

        number = parseInt(number);

        if (!number || isNaN(number)) {
            if (!handle) return rej({ type: "error", message: "Invalid Number of messages were provided", id: 1 });

            if (!message.replied) message.channel.send({ embeds: [{ color: "RED", title: `Invalid Number of messages were provided ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: "RED", title: `Invalid Number of messages were provided ${rejectEmoji}` }] })

            return res("done");
        }

        if (!forward) return res({ message, channel, number });

        user = user?.id || user;

        if (!user && !string) {
            if (!handle) return rej({ type: "error", message: "Invalid user/user ID was provided", id: 2 });

            if (!message.replied) message.channel.send({ embeds: [{ color: "RED", title: `Invalid User/User ID was provided ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: "RED", title: `Invalid User/User ID was provided ${rejectEmoji}` }] })

            return res("done");
        }

        if (!user && (!string || string.trim().length === 0)) {
            if (!handle) return rej({ type: "error", message: "Invalid string was provided", id: 3 });

            if (!message.replied) message.channel.send({ embeds: [{ color: "RED", title: `Invalid string was provided ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: "RED", title: `Invalid string was provided ${rejectEmoji}` }] })

            return res("done");
        }

        return res({ message, channel, number, user, string });
    })
}