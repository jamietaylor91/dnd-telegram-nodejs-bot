
const Slimbot = require('slimbot');

function startBot(){
    console.log('Bot start...');
    const slimbot = new Slimbot(process.env.BOT_TOKEN);
    wireBot(slimbot);
    console.log('Bot wired and ready to go...');
    
}
function wireBot(slimbot){
    slimbot.on('message', message => {
        slimbot.sendMessage(message.chat.id, 'Message received');
      });
      
      // Call API
      
      slimbot.startPolling();
}

exports.startBot = startBot;