import { writeFile } from "fs/promises";
import { render } from "./render.js";
import { loadEvents } from "./events.js";

const limit = 5;
const start = "2019-01-01";
const end = "2022-01-01";

const events = await loadEvents({ limit, start, end });
const html = render(events);
await writeFile('events.html', html);