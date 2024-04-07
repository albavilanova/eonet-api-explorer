import { writeFile } from "fs/promises";
import { render } from "./render.js";
import { loadEvents } from "./events.js";

const limit = 50;
const start = "2023-01-01";
const end = "2023-12-31";

const events = await loadEvents({ limit });
const html = render(events);
await writeFile('events.html', html);