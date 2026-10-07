# DEVCON 8 India Poster Creator

A lightweight, browser-based poster creator for DEVCON 8 India attendees. Add
your name and profile photo to generate a personalised event poster, then
download it as a PNG and copy a ready-to-share social caption.

## Features

- Upload a profile photo by selecting a file or dragging it into the upload area.
- Add a name to the poster preview.
- Preview changes instantly in the browser.
- Download the completed poster as a PNG.
- Switch between LinkedIn and X captions.
- Copy the selected caption to the clipboard.
- Keep uploaded photos local to the browser; no server or account is required.

## Run locally

This is a static HTML, CSS, and JavaScript project. No installation or build
step is required.

Deployed app: [DevCon 8 | Poster Creator](https://devcon-intersted-to-attend.vercel.app/)

1. Clone or download the project.
2. Open `index.html` in a modern browser.

For more consistent browser behavior, serve the folder with any local static
file server and open the displayed local URL. For example, with Python:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Project structure

| File | Description |
| --- | --- |
| `index.html` | Application layout and accessible form controls |
| `styles.css` | Responsive visual styling |
| `app.js` | Poster rendering, uploads, downloads, and captions |
| `ChatGPT Image Oct 7, 2026, 02_05_58 PM.png` | Poster template image |

## Usage

1. Upload a JPG or PNG profile photo. Square photos work best.
2. Enter your name.
3. Check the live poster preview.
4. Select **Download poster** to save the PNG.
5. Choose **LinkedIn** or **X**, then select **Copy** to copy the caption.

The event details and social captions are defined in `app.js`, while the poster
template is loaded from the PNG asset in the project root.
