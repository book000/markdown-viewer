# Copilot code review instructions

Follow `AGENTS.md` at the repository root for the project overview, structure, conventions, and the language rule. This file is only the review checklist.

## What to review

- **JavaScript**: keep the existing vanilla-JS, framework-free style. Flag broken promise handling (missing `.catch`), undeclared globals, and DOM bugs.
- **PHP**: `viewer/getFiles.php` should return well-formed JSON and handle a missing or empty `files/` directory gracefully.
- **Dependencies**: there is no `package.json`; browser libraries are added as `<script>`/`<link>` tags. Flag an accidental build toolchain or npm dependency unless clearly intended.
- **Docs sync**: if a change alters the start command, port, or viewer URL, check that `README.md` and `AGENTS.md` are updated.

## Do NOT flag

- Unescaped HTML from rendered Markdown (`showdown` output assigned to `innerHTML` in `viewer/script.js`). This is a known, intentional, documented limitation for viewing local trusted files (see the Warning in `README.md`). Comment only if a change makes the exposure materially worse or claims to add sanitization.
- Absence of tests, linter config, or CI.
- Edits to `viewer/github-markdown.css` are unexpected because it is vendored: flag manual edits rather than treating it as normal project code.

## Language

Deliverables (commit messages, PR text, review comments, code comments, docs) are written in English. Runtime messages are English. Quotations, technical identifiers, generated files, and external source text are exempt.
