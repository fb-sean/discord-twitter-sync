const Discord = require('discord.js');
const Client = new Discord.Client();
const token = ""; // Use ur DC token
const prefix = ""; // Use ur prefix
const talkedRecently = new Set(); // Cooldown
const Twitter = require('twit');
const twitterConf = {
    consumer_key: "YOURCONSUMERKEY",
    consumer_secret: "YOURCONSUMERSECRETKEY",
    access_token: "YOURACCESTOKEN",
    access_token_secret: "YOURSECRERETACCESTOKEN",
  }
const twitterClient = new Twitter(twitterConf);


// Create a stream to follow tweets
const stream = twitterClient.stream('statuses/filter', {
    follow: 'YOURTWITTERID', 
  });
  stream.on('tweet', tweet => {
    if (tweet.user.screen_name != "URTWITTERNAME") return
    const destination2 = client.channels.cache.get('YOURCHANNELID');
    const twitterMessage = `**${tweet.user.name} (@${tweet.user.screen_name})** tweeted this: \nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    destination2.send(twitterMessage);
    return false;
  });

// Simple Replys + Ping Command
Client.on('message', message => {
    if(message.author.id == client.user.id){
        return;
      }

	if(message.mentions.users.size){
		if(message.mentions.users.first().id == client.user.id){
        	return message.channel.send(`My Prefix is \`\`${prefix}\`\`😄`)
		}
	}
	if(message.guild == null){
		return;
	}
    if (!message.content.startsWith(prefix) || message.author.bot) return;

            if (talkedRecently.has(message.author.id)) {
            } else {

            
                 if (message.content.toLowerCase() === `${prefix}ping`) {
                    const dt = new Date(message.createdTimestamp);
                    message.channel.send(`pong \`\`${new Date() - dt}ms\`\` | ws : \`\`${client.ws.ping}ms\`\``);
                 }

            talkedRecently.add(message.author.id);
            setTimeout(() => {
            
            talkedRecently.delete(message.author.id);
            }, 60000);  // Command Cooldown
        }

});

// Client Ready
Client.on("ready", () => {
  console.log(`${Client.user.tag} is starting, have fun!.`);
  Client.user.setStatus(`dnd`);
  Client.user.setActivity(`URTEXT | ${prefix}help`, { type: WATCHING })
});

//Login
Client.login(token)