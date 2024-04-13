import { writeFile } from "fs/promises";
import { render } from "./render.js";
import { renderEvent } from "./renderEvent.js";
import { loadEvents } from "./events.js";

const limit = 500;
const start = "2000-01-01";
const end = "2024-12-31";

const events = await loadEvents({ limit, start, end });
var html = render(events);
await writeFile('./public/index.html', html);

for (const event of events) {
    html = renderEvent(event);
    await writeFile(`./public/events/${event.id}.html`, html);
}