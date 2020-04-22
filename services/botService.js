
const dnd = require('./dndService.js');
const Slimbot = require('slimbot');
const maxMessageLength = 4096;


function startBot(){
    console.log('Bot start...');
    const slimbot = new Slimbot(process.env.BOT_TOKEN);
    wireBot(slimbot);
    console.log('Bot wired and ready to go...');
    
}
async function wireBot(slimbot){
    slimbot.on('message', message => {
        let formatedMessage = message.text.toLocaleLowerCase();
        if(formatedMessage === "spells"){
            getSpellNames(slimbot,message);
        }else if(formatedMessage.includes("spell")){
            let spell = formatedMessage.trim().split(' ')[1];
            if(spell != ' '){
                getSpellDetails(spell, slimbot, message);
            }else{
                slimbot.sendMessage(message.chat.id, "Invalid format");
            }
        }else{
            slimbot.sendMessage(message.chat.id, "An error occured");
        }
      });            
      slimbot.startPolling();
}
function getSpellNames(slimbot, message){
    dnd.getAllSpells().then( (response) => {
         const replyMessage = response.data.results.map((spell) => spell.name ).toString();
         /*If replyMessage length is greater than Max Allowed Message length then divide and send multiple messages */
         if(replyMessage.length > maxMessageLength){
             const numberOFResponseMessages = replyMessage.length / maxMessageLength;
             for(var i = 0; i < numberOFResponseMessages; i++){
                let chunkMessage = replyMessage.slice(i * maxMessageLength, (maxMessageLength * (i+1)));
                if(!chunkMessage){
                    chunkMessage = replyMessage.slice(i * maxMessageLength, replyMessage.length);
                }
                slimbot.sendMessage(message.chat.id, chunkMessage);

             }
             return;
         }
         slimbot.sendMessage(message.chat.id, replyMessage);
    })
    .catch(function (error) {
        slimbot.sendMessage(message.chat.id, "An error occured");
    });
}
function getSpellDetails(spell, slimbot, message){
    dnd.getSpellDetails(spell).then((response) => {
        let replyMessage = "";
        replyMessage =  "Name: " + "\n";
        replyMessage = replyMessage + response.data.name + "\n";
        if( response.data.higher_level.length > 0){
            replyMessage = replyMessage + "Higher Level: " + "\n";
            replyMessage = replyMessage +  response.data.higher_level[0] + "\n";
        }
      
        replyMessage = replyMessage + "Range: " + "\n";
        replyMessage = replyMessage + response.data.range + "\n";
        replyMessage = replyMessage + "Duration: " + "\n";
        replyMessage = replyMessage + response.data.duration + "\n";
        slimbot.sendMessage(message.chat.id, replyMessage);

    })
    .catch(function (error) {
        slimbot.sendMessage(message.chat.id, "An error occured");
    });
}
exports.startBot = startBot;