const dotenv = require('dotenv').config({ path: 'config/.env' });
const bot = require('./services/bot.js')

if (dotenv.error) {
  throw dotenv.error
}
 
bot.startBot();
