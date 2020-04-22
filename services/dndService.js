

const http = require('http')
const axios = require('axios');

async function getAllSpells(){
    return axios.get(process.env.DND_API_BASE_URL + 'api/spells');
} 
async function getSpellDetails(spell){
  return axios.get(process.env.DND_API_BASE_URL + 'api/spells/' + spell);
}
exports.getAllSpells = getAllSpells;
exports.getSpellDetails = getSpellDetails;


