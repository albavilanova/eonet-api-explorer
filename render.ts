import { marker } from "leaflet";
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
  let js = "";
  for (const event of events) {
    for (const geometry of event.geometry) {
      if (geometry.coordinates) {
        var markerContent = `<div class="event">`
        markerContent += `<div class="categories">`
        for (const category of event.categories) {
          markerContent += `<div class="category ${category.id}">${category.title}</div>`;
        }
        markerContent += `</div>`;
        markerContent += `<div class="title">${event.title}</div>`;
        if (geometry.magnitudeValue) {
          markerContent += `<div class="magnitude">Magnitude: ${geometry.magnitudeValue} ${geometry.magnitudeUnit}</div>`;
        }
        markerContent += `</div>`;
        js += `var marker = L.marker([${geometry.coordinates[1]}, ${geometry.coordinates[0]}]);`
        js += `marker.addTo(mymap).bindPopup('${markerContent}');`
      }
      break
    }
  }
  return js;
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
    </div>
    <script>
    var mymap = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: '&copy; Esri'
    }).addTo(mymap);
    ${addMapElements(events)}
    </script>
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
