# karyabaru landing page

A minimalist static landing page for **karyabaru** with a rotating multilingual suffix loaded from JSON.

## Files

- `index.html` - single-page markup
- `styles.css` - minimalist layout and animation styles
- `script.js` - loads JSON and rotates the dynamic word every 5 seconds
- `data/new-words.json` - source words for the rotating suffix
- `CNAME` - custom domain for GitHub Pages

## Local preview

Use a local HTTP server (recommended so `fetch` works correctly):

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000`

## Editing the rotating words

Update `data/new-words.json` with this contract:

```json
{
  "words": ["baru", "new", "nuevo"]
}
```

Rules:

- `words` must be a non-empty array of strings
- first word is typically `baru` for the initial state

## Deploy to GitHub Pages (Branch Publish)

1. Push this repository to GitHub on the `main` branch.
2. Go to **Repository Settings -> Pages**.
3. Under **Build and deployment**:
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`
4. Save and wait for GitHub Pages to publish.

## Custom domain setup

1. In **Settings -> Pages**, set your custom domain to match `CNAME` (`karyabaru.com`).
2. Configure DNS at your registrar:
- Apex/root domain: use `A` or `ALIAS/ANAME` records as supported
- `www` subdomain: use `CNAME` to your GitHub Pages host
3. Wait for DNS propagation.
4. Enable **Enforce HTTPS** once certificate issuance is complete.

## Rollout checklist

- commit all files
- push to `main`
- enable Pages branch publish (`main` + `/root`)
- confirm domain matches `CNAME`
- verify live site and HTTPS
