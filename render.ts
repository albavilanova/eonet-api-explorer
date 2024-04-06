import { Event } from "./events.js";
import * as fs from 'fs';

const css = fs.readFileSync('style.css', 'utf-8');

const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>${css}</style>
</head>`;

const renderEvents = (events: Array<Event>) => {
  let html = "";
  for (const event of events) {
    console.log(event);
    html += `<div class="event">
      <div class="data">
        <div class="title">${event.title}</div>
        <div class="categories">`
        for (const category of event.categories) {
            html += `<div class="category">${category.title}</div>`
        }

    html += `
        </div>
      </div>
    </div>`;
  }
  return html;
}

export const render = (events: Array<Event>) => {
  return `
<html>
  ${head("EONET events")}
  <body>
    ${renderEvents(events)}
  </body>
</html>`;
};