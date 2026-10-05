const http = require("http");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");
const mimeTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml"
};

http.createServer((req, res) => {
    const requestPath = req.url === "/" ? "/index.html" : decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.resolve(publicDir, `.${requestPath}`);

    if (!filePath.startsWith(publicDir)) {
        res.writeHead(403);
        return res.end("Forbidden");
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(error.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end(error.code === "ENOENT" ? "Not found" : "Server error");
        }

        res.writeHead(200, {
            "Cache-Control": requestPath === "/index.html" ? "no-cache" : "public, max-age=3600",
            "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream"
        });
        res.end(content);
    });
}).listen(process.env.PORT || 3000, "0.0.0.0", () => {
    console.log(`Nexora site listening on ${process.env.PORT || 3000}`);
});
