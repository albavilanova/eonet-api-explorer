import fs from 'fs';
import path from 'path';

function getPaths(dirPath: string): string[] {
    let paths: string[] = [];
    function readDir(dirPath: string) {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                readDir(filePath);
            } else {
                paths.push(filePath.split('public')[1]);
            }
        });
    }
    readDir(dirPath);
    return paths;
}

// Get all files under assets
const assetsPath = './public/assets/';
const filesPaths = getPaths(assetsPath);

// Get all files under events
const eventsPath = './public/events/';
const eventsPaths = getPaths(eventsPath);

const server = Bun.serve({
    port: 3000,
    async fetch (req: Request): Promise<Response> {
        const path = new URL(req.url).pathname;
        
        if (path === "/") return new Response(Bun.file("public/index.html"));
        
        if (filesPaths.includes(path)) {
            return new Response(Bun.file("public/" + path));
        }
        
        if (eventsPaths.includes("/events" + path)) {
            return new Response(Bun.file("public/events" + path));
        }

        return new Response("Page not found", { status: 404 });
    }
});

console.log(`Listening on http://localhost:${server.port} ...`);