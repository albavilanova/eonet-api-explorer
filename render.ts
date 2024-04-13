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

const addMapElements = (events: Array<Event>) => {
  let js = "";
  for (const event of events) {
    let geometry = event.geometry[event.geometry.length - 1];
    if (geometry.coordinates) {
      var markerContent = `<div class="marker"><a href="${event.id}.html">`;
      markerContent += `<div class="categories">`;
      for (const category of event.categories) {
        markerContent += `<div class="category ${category.id}">`;
        markerContent += `<img src="assets/icons/${event.categories[0].id}-icon.png" class="category-icon"/>`;
        markerContent += `<div class="category-name">${category.title}</div>`;
        markerContent += `</div>`;
        break;
      }
      markerContent += `</div>`;
      markerContent += `<div class="title">${event.title}</div>`;
      markerContent += `<div class="date">Date: ${
        geometry.date.split("T")[0]
      }</div>`;
      if (geometry.magnitudeValue) {
        markerContent += `<div class="magnitude">Magnitude: ${geometry.magnitudeValue} ${geometry.magnitudeUnit}</div>`;
      }
      markerContent += `</a></div>`;
      js += `var LeafletIcon = L.Icon.extend({options: {iconSize: [20, 20]}});`;
      js += `var icon = new LeafletIcon({iconUrl: "assets/icons/${event.categories[0].id}-icon.png"});`;
      js += `var marker = L.marker([${geometry.coordinates[1]}, 
                                    ${geometry.coordinates[0]}],
                                    {icon: icon}
                                  );`;
      js += `marker.addTo(mymap).bindPopup('${markerContent}');`;
    }
  }
  return js;
};

export const render = (events: Array<Event>) => {
  return `
<html>
  ${head("EONET API Explorer")}
  <body>
    <div class="main-title">
      <a href="/">Earth Observatory Natural Event Tracker Explorer</a>
    </div>
    <div class="main-content" id="events-container">
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
