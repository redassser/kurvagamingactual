
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = "!";
const request = require('request');
const cheerio = require('cheerio');
const Enmap = require('enmap');
const EnmapMongo = require("enmap-mongo");
const fs = require("fs");
client.warn = new Enmap({ provider: new EnmapMongo({
  name: `warnings`,
  dbName: `warnings`,
  url: process.env.MONGODB
})
})
client.commands = new Enmap({ provider: new EnmapMongo({
  name: `commands`,
  dbName: `commands`,
  url: process.env.MONGODB2
})
})
client.on("ready", () => {
  console.log("I am ready!");
  client.user.setActivity("!commands");
});

client.on("message", (message) => {
  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  var argu = args.join(" ")
  var argo = argu.replace(args[0], "");
  var num = parseInt(command.replace("scp-", ""), 10);
  var msg = message.channel;
  if (message.isMentioned("464042836032225281")) {
    var hello = config.hello[Math.floor(Math.random()*config.hello.length)];
    message.channel.send(hello);
  }
  //START FOR NEWCOMERS
  //THEY CAN CHOOSE WHICH CHANNELS THEY WISH TO SEE
  if (msg.id === "490675505968840714") {
    if (!message.content.startsWith(prefix)||message.author.bot) {message.delete();return}
    if (command === "give") {
      if (args[0] === "scp") {
        message.member.addRole("490675133946789888");
        msg.send(message.author+" ``has been given entrance to Site Kurva``")
        .then(msg => {
          msg.delete(15000);
        })
        .catch();
        message.delete();
        return;
      } else if (args[0] === "neighbour") {
        message.member.addRole("490675168843268098");
        msg.send(message.author+" ``has been given entrance to the neighbour's house``")
        .then(msg => {
          msg.delete(15000);
        })
        .catch();
        message.delete();
        return;
      } else {
        msg.send("``!give scp\n!give neighbour``")
        .then(msg => {
          msg.delete(5000);
        })
        .catch();
        message.delete();
        return;
      }
    } else message.delete();
  }
  //end of channel choosing
  //this is to heck the bots and non-prefixes
  if (!message.content.startsWith(prefix) || message.author.bot || msg.id === "490675505968840714") return;
  //This is for warnings and stuff down here
  if (command === "warn") {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {msg.send("``Staff only``");return}
    if (args.length < 2) {msg.send("``!warn [name] [reason]``");return}
    if (client.warn.has(args[0].toLowerCase())) {
      msg.send("``"+args[0]+" has been warned again``")
      client.warn.push(args.shift().toLowerCase(), args.join(" "))
    } else {
      msg.send("``"+args[0].toLowerCase()+" has been warned``")
      client.warn.set(args.shift().toLowerCase(), [args.join(" ")]);
    }
  }
  if (command === "check") {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {msg.send("``Staff only``");return}
    if (args.length != 1) {msg.send("``!check [name]``");return}
    if (client.warn.has(args[0].toLowerCase())) {
      msg.send("``"+args[0].toLowerCase()+" has been warned "+client.warn.get(args[0].toLowerCase()).length+" times for these reasons...``\n"+client.warn.get(args[0].toLowerCase()).join("\n"))
    } else {
      msg.send("``There are no warnings under this name``")
    }
  }
  if (command === "watchlist") {
    if (!message.member.permissions.has("MANAGE_MESSAGES")){msg.send("``Staff only``");return}
    function hasWarns (value) {
      return client.warn.get(value).length > 1;
    }
    const array = client.warn.keyArray().filter(hasWarns)
    if (array.length != 0) {
      for (var i = 0; i < array.length; i++) {
        array[i] = client.warn.get(array[i].toLowerCase()).length + " warns - " + array[i]
      }
      msg.send("``These people have been warned more than once...``\n"+array.join('\n'));
    } else {
      msg.send("``No people with more than one warning``")
    }
  }
  if (command === "remove") {
    if (!message.member.permissions.has('MANAGE_MESSAGES')){msg.send("``Staff only``");return}
    if (args.length != 1) {msg.send("``!remove [name]``");return}
    if (client.warn.has(args[0].toLowerCase())) {
      client.warn.delete(args[0].toLowerCase());
      msg.send("``Warnings removed.``")
    } else {
      msg.send("``No warnings for that name``");
    }
  }
  if (command === "list") {
    if (!message.member.permissions.has("MANAGE_MESSAGES")){msg.send("``Staff only``");return}
    const array = client.warn.keyArray()
    if (array.length != 0) {
      for (var i = 0; i < array.length; i++) {
        array[i] = client.warn.get(array[i].toLowerCase()).length + " warns - " + array[i]
      }
      msg.send("``These people have been warned...``\n"+array.join('\n'));
    } else {
      msg.send("``No people have been warned``")
    }
  }
  //No more warnings uwu
  if (command === "mute") {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {msg.send("``Moderators only``");return}
    if (args.length != 1) {msg.send("``!mute [mention]``");return}
    var mention = message.mentions.members.first();
    if (!message.isMentioned(mention)) {msg.send("``Please mention someone``");return}
    if (mention.roles.has("465987375902883874")) {
      msg.send(mention+" ``has already been muted``")
    } else {
      mention.addRole("465987375902883874");
      msg.send(mention+" ``has been muted``")
    }
  }
  if (command === "unmute") {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {msg.send("``Moderators only``");return}
    if (args.length != 1) {message.channel.send("``!unmute [mention]``");return}
    var mention = message.mentions.members.first();
    if (!message.isMentioned(mention)) {msg.send("``Please mention someone``");return}
    if (!mention.roles.has("465987375902883874")) {
      msg.send(mention+" ``has not been muted``")
    } else {
      mention.removeRole("465987375902883874");
      msg.send(mention+" ``has been unmuted``")
    }
  }
  if (command === "ban") {
    if (!message.member.permissions.has('VIEW_AUDIT_LOG')) {msg.send("``Administrator only``");return}
    var mention = message.mentions.members.first();
    if (!message.isMentioned(mention)) {msg.send('``You have to mention someone``');return}
    mention.ban();
    msg.send('``'+mention+' has been banned.``');
  }
  if (command === "cah") {
    var randomCAH = config.whiteCard[Math.floor(Math.random()*config.whiteCard.length)];
    let cah = new Discord.RichEmbed()
      .setTitle(argu+"\n"+randomCAH)
      .setColor("15844367")
      .setAuthor(message.author.username+" says...", message.author.avatarURL);
    msg.send(cah)
    message.delete();
    console.log(`${message.author.username} in ${message.channel.name} used the cah command.`);
  }
  //build-a-b̶e̶a̶r̶ command
  if (command === "cc") {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
     message.channel.send("``Moderators only``");
     return;
   }
   if (args.length < 2) {
     message.channel.send("``!cc [command] [response]``")
     return;
   }
   if (client.commands.has(args[0])) {
     message.channel.send("``This command already exists``");
     return;
   }
   client.commands.set(args.shift(), args.join(" "));
   message.channel.send("``Command has been made``");
 }
 if (client.commands.has(command)) {
   message.channel.send(client.commands.get(command))
 }
 if (command === "ccdel") {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
     message.channel.send("``Moderators only``");
     return;
   }
   if (args.length != 1) {
     message.channel.send("``!ccdel [command]``")
     return;
   }
   if (!client.commands.has(args[0])) {
     message.channel.send("``This command does not exist``");
     return;
   }
   client.commands.delete(args[0])
   message.channel.send("``Command successfuly deleted``")
 }
  
  //no more building!
  if (command === "kick") {
     if (message.member.permissions.has('ADMINISTRATOR')) {
       var mention = message.mentions.members.first();
    if (message.isMentioned(mention)) {
    message.channel.send(`${mention} has been kicked.`);
  }
    else {
      message.channel.send(`You have to mention someone!`);
    }
     } else {
       message.channel.send("Nope!");
     }
  }
   if (command === "restart"){
     function resetBot(channel) {
    channel.send("I'll be back shortly!")
    .then(msg => client.destroy())
    .then(() => client.login(process.env.BOT_TOKEN));
}
 if (message.member.permissions.has('MANAGE_MESSAGES')) {
resetBot(message.channel);
 } else {
   message.channel.send("Nope!");
 }
   } 
  if (command.startsWith("scp-")&&num >= 0 && num <= 4000) {
    switch (num.toString().length) {
      case 1:
        var scp = "00"+num;
        break;
      case 2:
        var scp = "0"+num;
        break;
      case 3:
        var scp = num
        break;
      case 4:
        var scp = num;
        break;
    }
    if(command.endsWith("-j")) {
      message.channel.send(`http://www.scp-wiki.net/scp-${scp}-j`);
    } else {
     message.channel.send(`http://www.scp-wiki.net/scp-${scp}`);
    }
  }
   if (command === "hug") {
    var mention = message.mentions.members.first();
    if (message.isMentioned(mention)) {
    message.channel.send(`(>^_^)> ${mention} <(^.^<)`)
  }
    else 
      message.channel.send(`(>^_^)> ${message.author} <(^.^<)`)
  }
  if (command === "donate") {
      message.channel.send("Donate here: https://www.paypal.com/pools/c/839i9RcUvF")
}
  if (command === "purge") {
    if (!message.member.permissions.has('VIEW_AUDIT_LOG')) {
     message.channel.send("``Senior staff only``");
      return;
    }
    if (isNaN(args[0]) || args.length != 1) {
     message.channel.send("``!purge [number]``");
      return;
    }
    message.channel.bulkDelete(args[0]);
        message.channel.send(`${args[0]} messages deleted!`)
  .then(msg => {
    msg.delete(5000);
  })
  .catch();
     
  }
 if (command === "support") {
   message.channel.send("No worries, a staff member will be with you soon!")
  client.channels.get("466373577503932441").send(`<@&432337866493001740>, ${message.author} is having a bit of a problem in ${message.channel}`);
  }
  if (command === "commands") {
    message.channel.send("You have been messaged the commands!")
    message.author.send({"embed": {
    "color": 3947583,
    "title": "Use prefix '!'",
        fields: [
          {
          name: "scp-[Any number between 1 and 3999](-j opional)",
          value: "Links to that SCP's page."
        },
                 {
          name: "hug",
          value: "Gives a hug to you or the person you mention!"
        },
                 {
          name: "donate",
          value: "Links to the official Kurva PayPal page!"
        },
                 {
          name: "commands",
          value: "You *just* did it."
        },
                 {
          name: "support",
          value: "Tells a staff member that you need help. Do not abuse it or there will be consequences."
        },
          {
          name: "kgmeme",
          value: "Give you a free Kurva Gaming certified meme."
        },
         {
          name: "ss0, 1, 2, 3, k",
          value: "Tells you the current status of the server."
        },
        {
          name: "8ball",
          value: "Answers your question *very* truthfully."
        },
         {
          name: "cah",
          value: "Continues your sentence with a white card from Cards Against Humanity!"
        },
                 {
          name: "purge\nADMIN ONLY",
          value: "Deletes specified number of messages."
        },
         {
          name: "status\nADMIN ONLY",
          value: "Sets the **Playing** message for the bot."
        },
         {
          name: "ping\nOWNER ONLY",
          value: "Pings a person the given number of times.\nUp to 5 reccomended."
        },
        {
          name: "restart\nMOD ONLY",
          value: "Restarts the bot."
        },
         {
          name: "vote\nADMIN ONLY",
          value: "Starts a vote!"
        },
        {
          name: "cc (command) (text)\nADMIN ONLY",
          value: "The bot will say the (text) when you do !(command)."
        },
        {
          name: "ccdel (command)\nADMIN ONLY",
          value: "The command will be deleted from existance."
        },
         {
          name: "cclist",
          value: "Lists all CC commands currently in use."
        },
       ],
      }
     });
  }
  if (command === "count") {
    message.channel.send(`There are ${message.guild.memberCount} people in the discord!`);
  }
  if (command === "say" && args[0].length === 21) {
    if (message.member.permissions.has('VIEW_AUDIT_LOG')) {
    var gsg = args[0].slice(2, 20);
    var argo = argu.replace(`${args[0]}`, "");
     message.guild.channels.get(`${gsg}`).send(`${argo}`);
     console.log(`${message.author.username} said ${argo} in ${gsg}.`);
  }
  else {
  message.channel.send("Nope.");
  }
  }
  //northern border to moderation nation
  var onmods = [];
  var onadmins = [];
  var onseniors = [];
  if (command === "mods") {
  var allsenior = (message.guild.roles.get('432355512584110113').members.map(m=>m.user).join('\n'));
  var allmod = (message.guild.roles.get('432337866493001740').members.map(m=>m.user).join('\n'));
  var alladmin = (message.guild.roles.get('432337534794727425').members.map(m=>m.user).join('\n'));
  function onmod() {
    var i;
    for (i = 0; i < message.guild.roles.get('432337866493001740').members.array().length; i++) { 
    if(message.guild.roles.get('432337866493001740').members.array()[i].presence.game!=null){
      if(message.guild.roles.get('432337866493001740').members.array()[i].presence.game.name==='SCP: Secret Laboratory'){
        onmods.push(message.guild.roles.get('432337866493001740').members.array()[i].user);
      }
    }
}
  }
  function onsenior() {
    var i;
    for (i = 0; i < message.guild.roles.get('432355512584110113').members.array().length; i++) { 
    if(message.guild.roles.get('432355512584110113').members.array()[i].presence.game!=null){
      if(message.guild.roles.get('432355512584110113').members.array()[i].presence.game.name==='SCP: Secret Laboratory'){
        onseniors.push(message.guild.roles.get('432355512584110113').members.array()[i].user);
      }
    }
}
  }
    function onadmin() {
    var i;
    for (i = 0; i < message.guild.roles.get('432337534794727425').members.array().length; i++) { 
    if(message.guild.roles.get('432337534794727425').members.array()[i].presence.game!=null){
      if(message.guild.roles.get('432337534794727425').members.array()[i].presence.game.name==='SCP: Secret Laboratory'){
        onadmins.push(message.guild.roles.get('432337534794727425').members.array()[i].user);
      }
    }
}
  }
  onmod();

  onadmin();
  onsenior();
   message.channel.send({"embed": {
    "color": 857707,
    timestamp: new Date(),
    "title": `Kurva Gaming Official Servers`,
    "thumbnail":{
      "url": "https://i.imgur.com/QTZC9gA.png"
    },
    "footer": {
      "icon_url": "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/08-512.png",
      "text": "Please call for any in-game mod before anyone else!"
    },
     "author": {
      "name": "Currently available Moderators",
      "icon_url": "https://vignette.wikia.nocookie.net/roblox/images/c/ce/Police_Sergeants_Cap.png/revision/latest?cb=20170211084322"
     },
        fields: [{
          name: "Mods",
          value: `All: ${allmod}`,
          inline: true
        },
        {
          name: "Mods",
          value: `In-game: ${onmods.join(', ')}`,
          inline: true
        },
        {
          name: "Senior mods",
          value: `All: ${allsenior}`,
          inline: true
        },
                         {
          name: "Senior mods",
          value: `In-game: ${onseniors.join(', ')}`,
          inline: true
        },
        {
          name: "Admins",
          value: `All: ${alladmin}`,
          inline: true
        },
                 {
          name: "Admins",
          value: `In-game: ${onadmins.join(', ')}`,
          inline: true
        }
          ],
      }
     }); 
  }
  if (command === "offline") {
    var mention = message.mentions.members.first();
    if (args.length === 0) {
    //mod
    if (message.member.roles.has("432337866493001740")) {var rem = "432337866493001740"; var add = "471095786554523658"}
    if (message.member.roles.has("432355512584110113")) {var rem = "432355512584110113"; var add = "477195100867526689"}
      message.member.removeRole(rem);
      message.member.addRole(add);
      msg.send(message.author+"is now offline.");
      message.delete();
    } 
    //senior
    //admin
        else if (message.member.roles.has("432337534794727425")) {
      message.member.removeRole("432337534794727425");
      message.member.addRole("477195674421821451");
      message.channel.send(`${message.author} is now offline.`);
      message.delete();
    } 
    }
    //mention
        else if (message.isMentioned(mention)) {
          if (message.author.permissions.has("VIEW_AUDIT_LOGS")) {
      //mod
    if (mention.roles.has("432337866493001740")) {
      mention.removeRole("432337866493001740");
      mention.addRole("471095786554523658");
      message.channel.send(`${mention} is now offline.`);
    } 
    //senior
        else if (mention.roles.has("432355512584110113")) {
      mention.removeRole("432355512584110113");
      mention.addRole("477195100867526689");
      message.channel.send(`${mention} is now offline.`);
    } 
    //admin
        else if (mention.roles.has("432337534794727425")) {
      mention.removeRole("432337534794727425");
      mention.addRole("477195674421821451");
      message.channel.send(`${mention} is now offline.`);
    } 
          } else {
          message.channel.send("``Senior moderators only``")
          }
        } else {
        message.channel.send("``Nope!``")
        }
    }
    if (command === "online") {
      //mod
      if (message.member.roles.has("471095786554523658")) {
      message.member.addRole("432337866493001740");
      message.member.removeRole("471095786554523658");
      message.channel.send(`${message.author} is now online.`);
      message.delete();
    } 
      //senior
      else if (message.member.roles.has("477195100867526689")) {
      message.member.addRole("432355512584110113");
      message.member.removeRole("477195100867526689");
      message.channel.send(`${message.author} is now online.`);
      message.delete();
    }
      //admin
      else if (message.member.roles.has("477195674421821451")) {
      message.member.addRole("432337534794727425");
      message.member.removeRole("477195674421821451");
      message.channel.send(`${message.author} is now online.`);
      message.delete();
    } else {
      message.channel.send("Nope!");
    }
  }
  //southern border to moderaton nation
  if (command === "kgmeme") {
    var embedPic = config.ourArray[Math.floor(Math.random()*config.ourArray.length)];
   message.channel.send(embedPic); 
    console.log(`${message.author.username} in ${message.channel.name} used the kgmeme command.`);
  }
  if (command === "status") {
      if (message.member.permissions.has('ADMINISTRATOR')) {
  var statusgame = argu
  client.user.setActivity(`${statusgame}`);
  }
   else {
  message.channel.send("Nope.");
  }
  }
 
   if (command === "8ball" && argu != "") {
    console.log(`${message.author.username} in ${message.channel.name} used the 8ball command.`);
    var randomResponse = config.myArray[Math.floor(Math.random()*config.myArray.length)];
    message.channel.send(`${message.author}'s question was '${argu}' \nThe magic 8 ball says... '` + randomResponse + `'`);
    message.delete();
  }
 
if (command === "ping" && !isNaN(args[1]) && message.isMentioned(message.mentions.members.first())) {
  if (message.guild.ownerID === message.author.id) {
  var step;
  if (args[1] <= 5) {
for (step = 0; step < args[1]; step++) {
  message.channel.send(`${args[0]}`);
}
  } else {
    for (step = 0; step < args[1]; step+=5) {
  message.channel.send(`${args[0]} ${args[0]} ${args[0]} ${args[0]} ${args[0]}`);
}
  }
} else {
  message.channel.send("Nope.");
}
}
  if (command === "vote" && argu != "") {
 if (message.member.permissions.has('ADMINISTRATOR')) {
    message.channel.send({embed: {
    color: 15844367,
    author: {
      name: `${message.author.username} is calling a vote!`,
      icon_url: message.author.avatarURL
    },
    title: `${argu}`,
    }
    }).then(newMessage => {
   newMessage.react('✅')
   newMessage.react('❌')
        // (catch errors)
        .catch(console.error);
    })
    // (catch errors)
    .catch(console.error);
    message.delete();  
}
  else {
  message.channel.send("Nope.");
  }
  }
  //oh look the servers isnt that neat
   if (message.channel.id === "442739266909503489" || message.channel.id === "486892954297040896" || message.channel.id === "464091801331040297") {
 var theip = 7;
 var title = 7;
 var portEnd = 7;

 if (command === "players") {
   var arra = [];
    request('https://api.scpslgame.com/lobbylist.php?format=json', function(err, resp, html) {
        if (!err){
          var arra = [];
              var json = JSON.parse(html);
     if ("error" in json) {
     console.log("Someone help me!");
     } else {
       var ser1 = json.find(o => o.ip === "192.223.31.157" && o.port === '7777');
          if(!ser1) {
           arra.push("Server 1 - Offline"); 
          } else {
            arra.push("Server 1 - "+ser1.players);
          }
       var ser2 = json.find(o => o.ip === "192.223.31.157" && o.port === '7778');
          if(!ser2) {
           arra.push("Server 2 - Offline"); 
          } else {
            arra.push("Server 2 - "+ser2.players);
          }
       var ser3 = json.find(o => o.ip === "192.223.31.157" && o.port === '7779');
          if(!ser3) {
           arra.push("Server 3 - Offline"); 
          } else {
            arra.push("Server 3 - "+ser3.players);
          }
       var ser4 = json.find(o => o.ip === "192.223.31.157" && o.port === '7780');
          if(!ser4) {
           arra.push("Server 4 - Offline"); 
          } else {
            arra.push("Server 4 - "+ser4.players);
          }
       var ser5 = json.find(o => o.ip === "192.223.31.157" && o.port === '7781');
          if(!ser5) {
           arra.push("Server 5 - Offline"); 
          } else {
            arra.push("Server 5 - "+ser5.players);
          }
       var ser0 = json.find(o => o.ip === "192.223.27.212" && o.port === '7777');
          if(!ser0) {
           arra.push("Official Server - Offline"); 
          } else {
            arra.push("Official Server - "+ser0.players);
          }
       message.channel.send(arra)
     } 
            }  
});
 }
if (command === "ss1" || command === "ss2" || command === "ss3" || command === "ss4" || command === "ss5" || command === "ss0"|| command === "ss1w"|| command === "ss2w"|| command === "ss3w") {
  if (command === "ss1") {
    var title = "Kurva Gaming Dedicated Server #1";
    var portEnd = "7777"; 
    var theip = "192.223.31.157"
  } else if (command === "ss2") {
    var title = "Kurva Gaming Dedicated Server #2";
    var portEnd = "7778";
    var theip = "192.223.31.157"
  } else if (command === "ss3") {
    var title = "Kurva Gaming Dedicated Server #3";
    var portEnd = "7779";
    var theip = "192.223.31.157"
  } else if (command === "ss4") {
    var title = "Kurva Gaming Dedicated Server #4";
    var portEnd = "7780";
    var theip = "192.223.31.157"
  } else if (command === "ss5") {
    var title = "Kurva Gaming Dedicated Server #5";
    var portEnd = "7781";
    var theip = "192.223.31.157"
  } else if (command === "ss0") {
    var title = "Official SCP: Secret Laboratory Server";
    var portEnd = "7777"
    var theip = "192.223.27.212";
  } else if (command === "ss1w") {
    var title = "Kurva Gaming West Dedicated Server #1";
    var portEnd = "7777"
    var theip = "162.248.94.92";
  } else if (command === "ss2w") {
    var title = "Kurva Gaming West Dedicated Server #2";
    var portEnd = "7778"
    var theip = "162.248.94.92";
  } else if (command === "ss3w") {
    var title = "Kurva Gaming West Dedicated Server #3";
    var portEnd = "7779"
    var theip = "162.248.94.92";
  }
  
      request('https://api.scpslgame.com/lobbylist.php?format=json', function(err, resp, html) {
        if (!err){
    {
              var json = JSON.parse(html);
     if ("error" in json) {
     console.log("Someone help me!");
     } else {
       var obj = json.find(o => o.ip === theip && o.port === portEnd);
          if(!obj) {
           message.channel.send({"embed": {
    "color": 9245716,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory [OFFLINE]",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: `${portEnd}`,
          inline: true
        },
        {
          name: "PLAYERS:",
          value: 'N/A',
          inline: true
        }
          ],
      }
     }); 
          } else {
            var playerCount = obj.players
                     message.channel.send({"embed": {
    "color": 3498293,
    timestamp: new Date(),
    "title": `${title}`,
     "author": {
      "name": "SCP Secret Laboratory",
      "icon_url": "http://scp-sl.wdfiles.com/local--files/nav:side/scp-sl-logo.png"
     },
        fields: [{
          name: "IP:",
          value: `${theip}`,
          inline: true
        },
        {
          name: "PORT:",
          value: `${portEnd}`,
          inline: true
        },
        {
          name: "PLAYERS:",
          value: `${playerCount}`,
          inline: true
        }
          ],
      }
     });  
          }
     } 
            }   
        }
});
}
 }
});
client.on('guildMemberAdd', (member) => {
  if (member.guild.id === "432332961057079297") {
    member.guild.channels.get('490679880460140564').send(`${member} welcome :)`); 
  }
});
client.login(process.env.BOT_TOKEN);
