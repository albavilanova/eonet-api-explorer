import { writeFile } from "fs/promises";
import { render } from "./render.js";
import { loadEvents } from "./events.js";

const limit = 500;
const start = "2017-01-01";
const end = "2024-12-31";

const events = await loadEvents({ limit, start, end });
const html = render(events);
await writeFile('events.html', html);