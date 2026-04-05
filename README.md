# Link Color Coder

A Chrome extension that colors every link on a page based on its security type — so you can spot dangerous or suspicious URLs at a glance.

## Color Legend

| Color  | Meaning                              |
|--------|--------------------------------------|
| 🟢 Green  | `https://` - encrypted, secure link  |
| 🔴 Red    | `http://` - unencrypted link         |
| 🟡 Yellow | IP-based URL (e.g. `http://1.2.3.4`) - potentially suspicious |

## Features

- Works automatically on every page — no clicks needed
- Handles dynamically loaded content (SPAs, infinite scroll) via `MutationObserver`
- Lightweight: no external dependencies, no network requests
- Popup with a quick color legend

## Installation (Developer Mode)

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the `link-color-coder` folder

## File Structure

```
link-color-coder/
├── manifest.json   # Chrome Manifest v3 config
├── content.js      # Core logic - classifies and colors links
├── popup.html      # Extension popup with color legend
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```
