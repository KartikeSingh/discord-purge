module.exports = (f, message, channel, filter, number = 100, e) => {
    const { handle, rejectEmoji, autoDeleteIn, acceptEmoji } = f;
    return new Promise(async (res, rej) => {
        let data = {}, content = "";

        let _msgs = (await channel.messages.fetch({ limit: 100 })).filter(filter);
        const msgs = [];

        _msgs.forEach(v => {
            if (msgs.length > number) return;
            data[v.author.username] ? data[v.author.username]++ : data[v.author.username] = 1;
            msgs.push(v);
        });

        if (msgs.length === 0) {
            if (!handle) return rej({ type: "error", message: "No messages found", id: 3 });

            if (!message.replied) message.channel.send({ embeds: [{ color: "RED", title: `No messages found ${rejectEmoji}` }] })
            else message.followUp({ embeds: [{ color: "RED", title: `No messages found ${rejectEmoji}` }] })

            return res("done");
        }

        await channel.bulkDelete(msgs);

        if (!handle) return res({ type: "success", message: `Successfully Purged ${msgs.length} messages`, data });

        if (Object.keys(data).length > 0) for (let i = 0; i < Object.keys(data).length; i++)content += `**${Object.keys(data)[i]}** : ${Object.values(data)[i]}\n`

        if (!message.replied) message.channel.send({ embeds: [{ color: "GREEN", title: `Successfully Purged ${msgs.length} messages ${acceptEmoji}`, description: `Messages were from these users :\n` + content }] })
        else message.reply({ embeds: [{ color: "GREEN", title: `Successfully Purged ${msgs.length} messages ${acceptEmoji}`, description: `Messages were from these users :\n` + content }] })
        res("done");
    })
}