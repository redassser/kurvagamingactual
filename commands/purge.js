module.exports = {
        name: 'purge',
        description: 'Purge messages',
        execute(message, args) {
                if (!message.member.permissions.has('VIEW_AUDIT_LOG')) {message.channel.send("``Senior staff only``");return}
                if (isNaN(args[0]) || args.length != 1) {message.channel.send("``!purge [number]``");return}
                msg.bulkDelete(args[0]);
                msg.send(`${args[0]} messages deleted!`)
                .then(mesg => {mesg.delete(5000)})
                .catch();   
        },
};
