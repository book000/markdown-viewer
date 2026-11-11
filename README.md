# markdown-viewer

A simple Markdown viewer served by PHP's built-in web server. It renders Markdown with [showdown](https://github.com/showdownjs/showdown) and styles it with [github-markdown-css](https://github.com/sindresorhus/github-markdown-css).

## Requirements

- PHP (CLI)
- A browser with network access (`axios` and `showdown` are loaded from CDNs)

## Demo

[Demo](https://tomacheese.com/demo/markdown-viewer/viewer/)

## Usage

1. Place the Markdown files inside the `files` folder.
2. From the repository root, run `bash start.sh` on Linux/macOS or `start.bat` on Windows (both run `php -S localhost:8080`).
3. Open `http://localhost:8080/viewer`. Every file in `files` is listed in the sidebar.

## Warning

**HTML tags are not escaped in this program. Please be careful when using it as there is a risk of XSS through raw HTML such as script tags or event-handler attributes. The developer does not take any responsibility.**

## License

This project is licensed under the [MIT License](LICENSE).
