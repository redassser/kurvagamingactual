module.exports = {
	name: 'cah',
	description: 'Cards Against Humanity',
	execute(message, args) {
		const config = require("./config.json");
		var randomCAH = config.whiteCard[Math.floor(Math.random()*config.whiteCard.length)];
		let cah = new Discord.RichEmbed()
		.setTitle(argu+"\n"+randomCAH)
		.setColor("RANDOM")
		.setAuthor(message.author.username+" says...", message.author.avatarURL);
		msg.send(cah)
		message.delete();
	},
};
