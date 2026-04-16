import axios from "axios";

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

export async function sendMessage(text) {
    await axios.get(
        `https://api.telegram.org/bot${TOKEN}/sendMessage`,
        {
            params: {
                chat_id: CHAT_ID,
                text
            }
        }
    );
}
