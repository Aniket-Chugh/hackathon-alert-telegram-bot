import axios from "axios";
import { sendMessage } from "./bot.js";

const urls = [
  "https://unstop.com/c/amity-university-au-noida-placement-interview-competitions-articles-videos-66",
  "https://unstop.com/c/bennett-university-bu-greater-noida-placement-interview-competitions-articles-videos-11104",
  "https://unstop.com/c/jaypee-institute-of-information-technology-jiit-noida-placement-interview-competitions-articles-videos-720"
];

// 👇 persistent memory (per run, not perfect but ok)
let seen = new Set();
let firstRun = true;

async function checkHackathons() {
  try {

    let newFound = false;

    for (let url of urls) {
      const res = await axios.get(url);
      const html = res.data;

      const isValid =
        html.includes("Hackathon") ||
        html.includes("Competition") ||
        html.includes("Challenge") ||
        html.includes("Ideathon");

      const isExpired =
        html.includes("Expired") ||
        html.includes("Closed");

      if (isValid && !isExpired && !seen.has(url)) {
        seen.add(url);
        newFound = true;

        await sendMessage(
`🔥 NEW LIVE OPPORTUNITY!

👉 ${url}

⚡ Apply Now`
        );
      }
    }

    // 👇 FIRST RUN MESSAGE ONLY
    if (firstRun) {
      await sendMessage("🤖 BOT STARTED & WORKING ✅");
      firstRun = false;
    }

    // 👇 if no new hackathons
    if (!newFound && !firstRun) {
      console.log("checked... no new hackathons");
    }

  } catch (err) {
    console.log("ERROR:", err.message);
  }
}

checkHackathons();
