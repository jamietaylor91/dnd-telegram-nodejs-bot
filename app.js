const dotenv = require('dotenv').config();
const bot = require('./services/botService.js')

if (dotenv.error) {
  throw dotenv.error
}
 
bot.startBot();
