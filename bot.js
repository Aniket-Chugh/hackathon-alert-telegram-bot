const axios = require("axios");

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

async function sendMessage(text) {
  const res = await axios.get(
    `https://api.telegram.org/bot${TOKEN}/sendMessage`,
    { params: { chat_id: CHAT_ID, text } }
  );
  return res.data;
}

module.exports = { sendMessage };
