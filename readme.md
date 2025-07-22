# Study Time Tracker

A Chrome extension to track the time you spend on study websites like LeetCode, HackerRank, ChatGPT, and GeeksforGeeks.

## Features

- Automatically tracks time spent on supported study sites
- Shows daily breakdown of study time per site
- Simple popup UI to view your tracked data

## Supported Sites

- leetcode.com
- hackerrank.com
- chat.openai.com / chatgpt.com
- geeksforgeeks.org

## Installation

1. Download or clone this repository.
2. Go to `chrome://extensions` in your browser.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select this folder.

## Usage

- Click the extension icon to open the popup and view your study stats.
- The extension will automatically track your time on supported sites.
- Data is stored locally in your browser.

## File Structure

- `background.js` – Tracks tab activity and logs study time.
- `popup.html` / `popup.js` – Popup UI to display tracked data.
- `content.js` – (Reserved for future use or site-specific scripts.)
- `manifest.json` – Extension configuration.
- `styles.css` – Styles for the popup.
- `icons/` – Extension icon.

##