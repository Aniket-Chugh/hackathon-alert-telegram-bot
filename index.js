import axios from "axios";
import { sendMessage } from "./bot.js";

let lastState = "";

const urls = [
    "https://unstop.com/c/amity-university-au-noida-placement-interview-competitions-articles-videos-66",
    "https://unstop.com/c/bennett-university-bu-greater-noida-placement-interview-competitions-articles-videos-11104"
];

async function check() {
    let data = "";

    for (let url of urls) {
        const res = await axios.get(url);
        data += res.data;
    }

    if (data.includes("hackathon") && data !== lastState) {
        await sendMessage("🔥 New Hackathon/Competition added on Unstop!");
        lastState = data;
    }

    console.log("checked...");
}

check();
