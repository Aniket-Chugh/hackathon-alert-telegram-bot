import axios from "axios";
import { sendMessage } from "./bot.js";

const urls = [
  "https://unstop.com/c/amity-university-au-noida-placement-interview-competitions-articles-videos-66",
  "https://unstop.com/c/bennett-university-bu-greater-noida-placement-interview-competitions-articles-videos-11104",
  "https://unstop.com/c/jaypee-institute-of-information-technology-jiit-noida-placement-interview-competitions-articles-videos-720",
  "https://unstop.com/c/dronacharya-college-of-engineering-dce-gurgaon-placement-interview-competitions-articles-videos-10415",
  "https://unstop.com/c/dr-ss-bhatnagar-university-institute-of-chemical-engineering-technology-panjab-university-chandigarh-placement-interview-competitions-articles-videos-109994",
  "https://unstop.com/c/chandigarh-university-gharuan-punjab-1207479",
  "https://unstop.com/c/punjab-engineering-college-pec-chandigarh-placement-interview-competitions-articles-videos-14908",
  "https://unstop.com/c/chandigarth-university-779315",
  "https://unstop.com/c/thapar-university-tu-patiala-punjab-india-placement-interview-competitions-articles-videos-1328",
  "https://unstop.com/c/sgt-university-sgtu-gurgaon-haryana-placement-interview-competitions-articles-videos-106284",
  "https://unstop.com/c/gautam-buddha-university-gbu-greater-noida-placement-interview-competitions-articles-videos-105265"
];

const seen = new Set();

async function checkHackathons() {
  try {
    await sendMessage("🤖 BOT STARTED & WORKING ✅");

    let newFound = false;

    for (const url of urls) {
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

    if (!newFound) {
      console.log("Checked... no new hackathons found.");
    }

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    process.exit(1);
  }
}

checkHackathons();
