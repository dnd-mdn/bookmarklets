# bookmarklets
Collection of bookmarklets

## Usage

1. Add bookmarklet JavaScript files to `scripts/`.
2. Register each file in `scripts/manifest.json`.
3. Open `index.html` using a local web server so `fetch()` can load files.

## Local testing (npm, no extra dependencies)

1. Ensure Node.js is installed.
2. Run:

```bash
npm run dev
```

3. Open `http://127.0.0.1:5500/` in your browser.

Each manifest entry can be:

- A string filename, such as `"test.js"`
- An object:

```json
{
	"name": "My Bookmarklet",
	"file": "my-bookmarklet.js",
	"description": "Optional summary"
}
```

In the UI, pick a script from the list to:

- View its source in a read-only Monaco editor
- Drag the generated link into your bookmarks/favorites bar
