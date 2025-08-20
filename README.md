# Draw Steel Lookup (v3.6)


This release prevents stale V2 caches by:
- Bumping the SW cache key to **draw-steel-lookup-v3-6**
- Versioning critical assets: `index.html?v=3.6` and `manifest.webmanifest?v=3.6`
- Showing an **update toast** when a new SW is installed so users can reload


## Deploy on GitHub Pages
1. Replace files at repo root with v3.6.
2. Commit & push; wait for Pages to publish.
3. Verify in DevTools → Application → Service Workers: cache = draw-steel-lookup-v3-6.


### Updating users with installed PWAs
- After deployment, reopening the app should show an **Update available** toast. Tap **Reload**.
- If stubborn caches persist, remove the app icon and re‑add to Home Screen (iOS) or Clear & reset site storage (Android → Chrome).