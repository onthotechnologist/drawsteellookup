# Draw Steel Lookup — Mobile PWA (GitHub Pages)

This is a self-contained mobile DM screen for *Draw Steel* with summaries and collapsible quotes.

## Deploy on GitHub Pages

1. Create a new repo (e.g. `draw-steel-lookup`).  
2. Upload everything in this folder to the repo **root** (including `icons/`, `index.html`, `sw.js`, `manifest.webmanifest`).  
3. In the repo: *Settings → Pages* → **Build and deployment** → Source: *Deploy from a branch* → Branch: *main* (or *master*) / folder: **/** → Save.  
4. Open your Pages URL. The service worker will cache assets for offline use.

### Install on a phone

- **iPhone (Safari):** Open the site → Share → **Add to Home Screen** → Add.  
- **Android (Chrome):** Open the site → look for the **Install** prompt or use Chrome menu → **Install app**.

## Customization

- **Title:** Already set to **Draw Steel Lookup** in `<title>` and in `manifest.webmanifest` and `apple-mobile-web-app-title`.- **Home Screen Icon:** `icons/icon-180.png` is used by iOS; `icons/icon-192.png` and `icons/icon-512.png` by Android. Replace these files to change the icon. The app UI itself does **not** show the logo.
- **Cache busting:** Bump the `CACHE` version string in `sw.js` after any edits to force clients to update.
- **Start URL / scope:** Both set to `.` for GitHub Pages subpaths.

## Files

- `index.html` — single-page app with sections, search, nav, and quotes.
- `manifest.webmanifest` — PWA metadata (name, icons, theme).
- `sw.js` — service worker for offline caching.
- `icons/icon-180.png` — iOS Home Screen icon.
- `icons/icon-192.png`, `icons/icon-512.png` — Android icons.

---

© You. Rules text © their respective owners. This project is for table reference only.
