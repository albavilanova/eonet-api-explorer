import { loadEvents } from "./events.js";

const limit = 1;
const start = "2019-01-01";
const end = "2022-01-01";

const events = await loadEvents({ limit, start, end });
console.log(events);