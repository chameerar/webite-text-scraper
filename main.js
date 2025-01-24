const axios = require("axios");
const cheerio = require("cheerio");

// Get website URL and webhook URL from the environment variables
const websiteUrl = process.env.WEBSITE_URL;
const webhookUrl = process.env.WEBHOOK_URL;
const quotedBy = process.env.QUOTED_BY;
const excludedText = process.env.EXCLUDED_TEXT
  ? process.env.EXCLUDED_TEXT.split(",")
  : [];

if (!websiteUrl) {
  console.error(
    "Website URL not found. Please set the WEBSITE_URL environment variable."
  );
  process.exit(1);
}

if (!webhookUrl) {
  console.error(
    "Webhook URL not found. Please set the WEBHOOK_URL environment variable."
  );
  process.exit(1);
}

async function getHumanReadableTextFromWebsite() {
  console.log(`Fetching human-readable content from: ${websiteUrl}...`);

  try {
    // Fetch the HTML of the website
    console.log("Sending HTTP GET request...");
    const { data: html } = await axios.get(websiteUrl);
    console.log("Website data successfully fetched!");

    console.log("Loading HTML into Cheerio...");
    const $ = cheerio.load(html);

    const humanReadableText = [];
    console.log("Exluded " + excludedText)
    console.log("Extracting meaningful text...");
    // Extract text from specific elements likely to contain readable content
    $("p, h1, h2, h3, blockquote").each((index, element) => {
      const text = $(element).text().trim();

      // Ignore very short or empty text and non-human readable text
      if (text.length > 10 && /^[a-zA-Z0-9\s,.'"-]+$/.test(text)) {
        const isExcluded = excludedText.some(pattern => text.toLowerCase().includes(pattern.toLowerCase()));
        if (!isExcluded) {
            humanReadableText.push(text);
            console.log(`Extracted text (${index + 1}): "${text}"`);
        }
      }
    });

    console.log(
      `Total meaningful text nodes found: ${humanReadableText.length}`
    );
    if (humanReadableText.length === 0) {
      console.log("No meaningful text found on the website.");
      return;
    }

    // Select a random piece of human-readable text
    const randomIndex = Math.floor(Math.random() * humanReadableText.length);
    const randomText = humanReadableText[randomIndex];
    console.log(`\nRandomly selected meaningful text: "${randomText}"\n`);
    var responseText = randomText;
    if (quotedBy) {
      responseText = `${randomText} \n\t - ${quotedBy}`;
    }

    // Send the resulting text to the webhook URL
    console.log("Sending the extracted text to the webhook...");

    const response = await axios.post(webhookUrl, {
      text: responseText, // sending the text as a field in the body
    });

    console.log(`Webhook response: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

// Run the function
getHumanReadableTextFromWebsite();
