import * as fs from "fs";
import { Event } from "./events.js";

const css = fs.readFileSync("style.css", "utf-8");

const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>${css}</style>
</head>`;

export const renderEvent = (event: Event) => {
    return `
  <html>
  ${head(`EONET API Explorer - Event ${event.id}`)}
  <body>
    <div id="main-title">
        <a href="/">Earth Observatory Natural Event Tracker Explorer</a>
    </div>
    <div id="main-content">
    ${event.id}
    </div>
    <footer>
        <div>
        Earth Observatory Natural Event Tracker (EONET) Explorer
        <br>
        Developed by Alba Vilanova Cortezón with data from <a href="https://eonet.gsfc.nasa.gov/">NASA Goddard Space Flight Center</a>
        </div>
    </footer>
  </body>
</html>`;
};
