# Copilot code review instructions

This repository is a minimal PHP-served, client-side Markdown viewer. There is no
build system, package manager, linter, or test suite. Keep review feedback focused
on the points below.

## Project shape

- `viewer/getFiles.php` is the only server-side code: it lists `files/` and returns
  JSON. `viewer/script.js` is vanilla browser JS using `axios` and `showdown` loaded
  from CDNs in `viewer/index.html`. `viewer/github-markdown.css` is a vendored
  third-party stylesheet.

## What to review

- **JavaScript**: keep the existing vanilla-JS, framework-free style. Flag broken
  promise handling (missing `.catch`), undeclared globals, and DOM bugs.
- **PHP**: `getFiles.php` should return well-formed JSON and handle a missing/empty
  `files/` directory gracefully.
- **New dependencies**: this project has no `package.json`; browser libraries are
  added as `<script>`/`<link>` tags. Flag any accidental introduction of a build
  toolchain or npm dependency unless clearly intended.
- **Docs sync**: if a change alters the start command, port, or viewer URL, check
  that `README.md` and `CLAUDE.md` are updated to match.

## Do NOT flag

- Unescaped HTML from rendered Markdown (`showdown` output assigned to `innerHTML`
  in `script.js`). This XSS exposure is a **known, intentional, documented**
  limitation for viewing local trusted files (see the Warning in `README.md`).
  Only comment if a change makes the exposure materially worse than today, or if the
  PR explicitly claims to add sanitization.
- Absence of tests, linter config, or CI — none exist in this repo by design.
- Edits to `viewer/github-markdown.css` are unexpected; it is vendored. Flag manual
  edits to it rather than treating it as normal project code.
