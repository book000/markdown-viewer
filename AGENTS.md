# AGENTS.md

Guidance for AI coding agents and contributors. `CLAUDE.md` imports this file, and `.github/copilot-instructions.md` adds the review checklist.

## Language

- All deliverables are written in **English**: commit messages, PR/Issue titles and bodies, review comments, code comments, and documentation (`README.md`, `AGENTS.md`, etc.).
- Exceptions (keep as is): quotations, technical identifiers, generated files, and external source text (including the vendored `viewer/github-markdown.css` and the sample content in `files/`).
- Runtime messages (logs, errors) are English.
- Do not rewrite Git history to change the language of past commits.

## Overview

`markdown-viewer` is a minimal Markdown viewer served by PHP's built-in web server. A sidebar lists every file in `files/`, and the selected file is rendered to HTML in the browser. There is no build step, package manager, linter, formatter, test suite, or CI.

## Commands

- `bash start.sh` (Linux/macOS) or `start.bat` (Windows) runs `php -S localhost:8080`. Run it from the repository root, because `viewer/` and `files/` are resolved relative to the document root.
- Open `http://localhost:8080/viewer`.
- Requirement: PHP (CLI). `axios` and `showdown@1.9.0` are loaded from CDNs at runtime, so the browser needs network access.

## Structure

- `files/`: the Markdown documents to display. Every entry in this directory is listed, not only `.md` files. The `.md` files shipped there are sample content.
- `viewer/index.html`: page shell. Loads `axios` and `showdown` from CDNs, then `github-markdown.css`, `style.css`, and `script.js`.
- `viewer/getFiles.php`: the only server-side code. Runs `scandir` on `../files/`, drops `.` and `..`, and returns `{"files": [...]}` as JSON.
- `viewer/script.js`: on load, calls `getFiles.php`, builds the sidebar links, and opens the first file. `openFile()` fetches the raw Markdown from `../files/`, converts it with `showdown` (`setFlavor("github")`), and writes the result into `#main`.
- `viewer/github-markdown.css`: vendored from [github-markdown-css](https://github.com/sindresorhus/github-markdown-css). Treat it as a third-party asset and do not hand-edit it.
- `viewer/style.css`: layout CSS (sidebar and main).

## Conventions

- Plain vanilla JavaScript with no framework or bundler. Match the existing style in `script.js` (`axios` with promise `.then()`/`.catch()` chains).
- Add a browser library with a `<script>`/`<link>` tag in `index.html`, not via npm. Keep server-side logic in plain PHP, consistent with `getFiles.php`.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/); branches follow [Conventional Branch](https://conventional-branch.github.io) short form (`feat/...`, `fix/...`).
- Do not commit to Renovate PRs. Never commit secrets.

## Testing

There is no automated check. Verify changes manually: start the server, open `http://localhost:8080/viewer`, confirm the sidebar lists the files in `files/`, and confirm that selecting one renders it correctly.

## Security caveat (by design)

Rendered Markdown is **not** HTML-sanitized: the `showdown` output is assigned directly to `innerHTML` in `script.js`, so raw HTML in a Markdown file (for example `<img onerror=...>`) executes. The sidebar link text (`a.innerHTML = file`) is also unescaped. This is a known, documented limitation (see the Warning in `README.md`); the tool is meant for viewing local, trusted files. Do not silently "fix" this. If you add sanitization, treat it as a deliberate feature change and update `README.md`.

## Keeping docs in sync

- If you change how the server is started, the port, or the viewer URL, update `README.md` (Usage) and this file.
- If you change the directory layout or the `getFiles.php` response shape, update the Structure section above.
