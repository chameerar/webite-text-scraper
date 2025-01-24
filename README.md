# Web Scraper for Random Text Extraction

This script fetches human-readable content from a specified website, filters out unwanted text (based on exact match exclusion patterns), and sends a randomly selected piece of text to a specified webhook URL. It’s useful for scraping and processing website content in a controlled, customizable manner.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Setup](#setup)
4. [Environment Variables](#environment-variables)
5. [How to Run](#how-to-run)
6. [Example Usage](#example-usage)
7. [Error Handling](#error-handling)
8. [Additional Notes](#additional-notes)

---

## Overview

This Node.js script scrapes a specified website for meaningful text (like paragraphs, headings, and blockquotes), removes unwanted texts based on exact matching exclusion patterns (provided through environment variables), and sends the remaining text to a webhook URL.

---

## Features

- **Web Scraping**: Fetches human-readable text from a specified website.
- **Text Filtering**: Excludes text based on exact matches with user-defined exclusion patterns.
- **Webhook Integration**: Sends the extracted text to a specified webhook URL.
- **Random Text Selection**: Randomly selects a piece of text from the filtered content.
- **Logging**: Provides detailed logs for debugging.

---

## Setup

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://your-repo-url-here
   cd your-repo-directory
2. **Install Dependencies**: This script requires the following dependencies:

- axios: For sending HTTP requests.
- cheerio: For parsing and scraping HTML content.
To install them, run:
```bash
npm install axios cheerio
```

## Environment Variables

The script relies on the following environment variables:

- WEBSITE_URL: Required — The URL of the website from which to extract the text.
- WEBHOOK_URL: Required — The URL where the extracted text will be sent.
- EXCLUDED_TEXT: Optional — A comma-separated list of exact text patterns to be excluded. If no value is provided, no filtering will be performed.
- QUOTED_BY: Optional - The resulting text will be shown with this value as the name of the person who said it.

### Example:
Set the environment variables directly or create a .env file with the following content:
```
WEBSITE_URL=https://www.tfw2005.com/boards/threads/optimus-prime-inspirational-quote-thread.1033030
WEBHOOK_URL=https://your-webhook-url-here.com
EXCLUDED_TEXT="advertisement,terms and conditions,privacy policy,signup"
QUOTED_BY="Optimus Prime"
```

## How to Run
1. Set Environment Variables:
```bash
export WEBSITE_URL=https://www.tfw2005.com/boards/threads/optimus-prime-inspirational-quote-thread.1033030 \
export WEBHOOK_URL=https://your-webhook-url-here.com \
export EXCLUDED_TEXT="advertisement,terms and conditions,privacy policy,signup" \
export QUOTED_BY="Optimus Prime"
```

2. Run the Script:
Once the environment variables are set, simply run:
```bash
node main.js
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing
If you'd like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. For any bugs or feature requests, please open an issue.


Let me know if you need any changes to the README!
