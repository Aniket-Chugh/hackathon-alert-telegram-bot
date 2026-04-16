const axios = require("axios");
const { sendMessage } = require("./bot");

const urls = [
  "https://unstop.com/c/amity-university-au-noida-placement-interview-competitions-articles-videos-66",
  "https://unstop.com/c/bennett-university-bu-greater-noida-placement-interview-competitions-articles-videos-11104",
  "https://unstop.com/c/jaypee-institute-of-information-technology-jiit-noida-placement-interview-competitions-articles-videos-720"
];

const seen = new Set();

async function checkHackathons() {
  try {
    await sendMessage("🤖 BOT STARTED & WORKING ✅");  // 👈 fires first, always

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
