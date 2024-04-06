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
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin="">
  </script>
</head>`;

const addMapElements = (events: Array<Event>) => {
  let html = "";
  for (const event of events) {
    for (const geometry of event.geometry) {
      if (geometry.coordinates) {
        html += `L.marker([${geometry.coordinates[1]}, ${geometry.coordinates[0]}]).addTo(mymap);`
      }
    }
  }
  return html;
};

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
        )}, Lat: ${geometry.coordinates[1].toFixed(2)}</div>`;
      }
      // Show only 1 magnitude and set of coords, this can be expanded at per event level
      break
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
    <div id="main-content">
        <div id="map"></div>
        <div>
            <div id="events">
                ${renderEvents(events)}
            </div>
        </div>
    </div>
    <script>
    var mymap = L.map('map').setView([0, 0], 1);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: '&copy; Esri'
    }).addTo(mymap);
    ${addMapElements(events)}
    </script>
    <footer>
        Earth Observatory Natural Event Tracker (EONET) Explorer
        <br>
        Developed by Alba Vilanova Cortezón with data from <a href="https://eonet.gsfc.nasa.gov/">NASA Goddard Space Flight Center</a>
    </footer>
  </body>
</html>`;
};
