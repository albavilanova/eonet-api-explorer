import { Event } from "./events.js";
import * as fs from "fs";

const css = fs.readFileSync("style.css", "utf-8");

const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>${css}</style>
</head>`;

// const renderMap = (events: Array<Event>) => {
//   let html = "";
//   for (const event of events) {
//     for (const geometry of event.geometry) {
//       console.log(geometry.coordinates[0]);
//       if (geometry.coordinates) {
//         html += `Lat: ${geometry.coordinates[0]}, lon: ${geometry.coordinates[1]}`;
//       }
//     }
//   }
//   return html;
// };

const renderEvents = (events: Array<Event>) => {
  let html = "";
  for (const event of events) {
    html += `<div class="event">
        <div class="categories">`;
    for (const category of event.categories) {
      html += `<div class="category ${category.id}">${category.title}</div>
                </div>`;
    }
    html += `
        <div class="title">${event.title}</div>`;
    html += `<div class="geometry">`;
    for (const geometry of event.geometry) {
      if (geometry.magnitudeValue) {
        html += `<div class="magnitude">Magnitude: ${geometry.magnitudeValue} ${geometry.magnitudeUnit}</div>`;
      }
      if (geometry.coordinates) {
        html += `<div class="coordinates">Lon: ${geometry.coordinates[0].toFixed(
          2
        )}, lat: ${geometry.coordinates[1].toFixed(2)}</div>`;
      }
    }
    html += `</div>`;
    html += `</div>`;
  }
  return html;
};

export const render = (events: Array<Event>) => {
  return `
<html>
  ${head("EONET events")}
  <body>
    <div id="main-title">
        Earth Observatory Natural Event Tracker Explorer
    </div>
    <div id="events">
        ${renderEvents(events)}
    </div>
  </body>
</html>`;
};
