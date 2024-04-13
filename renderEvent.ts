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
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
  crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin="">
  </script>
</head>`;

const addEventInfo = (event: Event) => {
  let html = "";
  html += `<h1 class="event-title">${event.title} (${event.id})</h1>`;
  html += `<div class="event-content">`;
  html += `<section>`;
  html += `<h2>Categories:</h2>`;
  for (const category of event.categories) {
    html += `<div class="category ${category.id}">`;
    html += `<img src="assets/icons/${event.categories[0].id}-icon.png" class="category-icon"/>`;
    html += `<div class="category-name">${category.title}</div>`;
    html += `</div>`;
  }
  html += `<h2>Sources:</h2>`;
  html += `<ol>`;
  for (const source of event.sources) {
    html += `<li><a href="${source.url}">${source.id}</a></li>`;
  }
  html += `</ol>`;
  html += `</section>`;
  html += `<section>`;
  html += `<h2>Location & Magnitude:</h2>`;
  html += `<div id="event-map"></div>`;
  html += `<table id="geometry-table">
  <tr>
    <th>Date</th>
    <th>Coordinates</th>
    <th>Magnitude</th>
  </tr>`;
  for (const geometry of event.geometry) {
    html += `<tr>`;
    html += `<td>${geometry.date}</td>`;
    html += `<td>${geometry.coordinates}</td>`;
    if (geometry.magnitudeValue) {
      html += `<td>${geometry.magnitudeValue} ${geometry.magnitudeUnit}</td>`;
    } else {
      html += `<td>Unknown</td>`;
    }
    html += `</tr>`;
  }
  html += `</table>`;
  html += `</section>`;
  html += `</div>`;
  return html;
};

const addMapElements = (event: Event) => {
  let js = "";
  js += `var markers = [];`;
  for (const geometry of event.geometry) {
    js += `var LeafletIcon = L.Icon.extend({options: {iconSize: [10, 10]}});`;
    js += `var icon = new LeafletIcon({iconUrl: "assets/icons/dot-icon.png"});`;
    js += `var marker = L.marker([${geometry.coordinates[1]},
                                  ${geometry.coordinates[0]}],
                                  {icon: icon}
                                  );`;
    js += `marker.addTo(eventMap);`;
    js += `markers.push(marker);`;
  }
  js += `var group = new L.featureGroup(markers);`;
  js += `eventMap.fitBounds(group.getBounds());`;

  return js;
};

export const renderEvent = (event: Event) => {
  return `
  <html>
  ${head(`EONET API Explorer - Event ${event.id}`)}
  <body>
    <div class="main-title">
        <a href="/">Earth Observatory Natural Event Tracker Explorer</a>
    </div>
    <div class="main-content" id="event-container">
      <div class="info">
      ${addEventInfo(event)}
      <script>
      var eventMap = L.map('event-map');
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 18,
          attribution: '&copy; Esri'
      }).addTo(eventMap);
      ${addMapElements(event)}
      </script>
      </div>
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
