# CLAUDE.md

## Overview

`markdown-viewer` is a minimal, dependency-light Markdown viewer served by PHP's
built-in web server. It lists every file in `files/` in a sidebar and renders the
selected file as HTML in the browser using client-side JavaScript. There is no
build step and no package manager.

## Running

- `bash start.sh` (Linux/macOS) or `start.bat` (Windows) runs `php -S localhost:8080`
  from the repository root.
- Open `http://localhost:8080/viewer` — the viewer lives under `viewer/`, and it
  fetches Markdown from `../files/` relative to that path.
- Requirement: PHP (CLI). Nothing else is installed locally; `axios` and `showdown`
  are loaded from CDNs at runtime.

## Architecture

- `files/` — the Markdown documents to display. Drop `.md` files here; they show up
  in the sidebar automatically. `1.md`–`5.md` are sample content.
- `viewer/index.html` — page shell. Loads `axios` and `showdown@1.9.0` from CDNs,
  then `github-markdown.css`, `style.css`, and `script.js`.
- `viewer/getFiles.php` — the only server-side code. `scandir`s `../files/`, drops
  `.` and `..`, and returns `{"files": [...]}` as JSON.
- `viewer/script.js` — on load, calls `getFiles.php`, builds the sidebar links, and
  opens the first file. `openFile()` fetches the raw Markdown and converts it with
  `showdown` (`setFlavor("github")`), writing the result into `#main`.
- `viewer/github-markdown.css` — vendored from
  [github-markdown-css](https://github.com/sindresorhus/github-markdown-css); treat
  as a third-party asset, do not hand-edit.
- `viewer/style.css` — the small amount of layout CSS (sidebar + main).

## Coding conventions

- Plain vanilla JavaScript, no framework, no bundler. Match the existing style in
  `script.js` (e.g. `axios` + promise `.then()`/`.catch()` chains).
- Dependencies are pulled from CDNs in `index.html`; there is no `package.json`.
  Add a new browser library by adding a `<script>`/`<link>` tag, not via npm.
- Keep server-side logic in plain PHP with no framework, consistent with
  `getFiles.php`.

## Testing

There is no test suite, linter, or formatter in this repository. Verify changes
manually: start the server, open `http://localhost:8080/viewer`, confirm the sidebar
lists the files in `files/` and that selecting one renders it correctly.

## Security caveat (by design)

Rendered Markdown is **not** HTML-sanitized: `showdown` output is assigned directly
to `innerHTML` in `script.js`, so `<script>` and other HTML in a Markdown file
execute. This is a known, documented limitation (see the Warning in `README.md`) —
the tool is meant for viewing local, trusted files. Do not silently "fix" this by
changing behavior; if you introduce sanitization, treat it as a deliberate feature
change and update `README.md` accordingly. Never commit secrets or credentials.

## Documentation update rules

- If you change how the server is started, the port, or the viewer URL, update both
  `README.md` (Usage) and this file.
- If you change the directory layout or the `getFiles.php` response shape, update the
  Architecture section above.
