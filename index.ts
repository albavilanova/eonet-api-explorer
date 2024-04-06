const server =  Bun.serve({
    fetch(req: Request): Response | Promise<Response> {
        return new Response(Bun.file("events.html"));
    },
    port: 3000,
});

console.log(`Listening on http://localhost:${server.port} ...`);