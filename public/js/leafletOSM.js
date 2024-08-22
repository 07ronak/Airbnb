let lng = list.geometry.coordinates[0];
let lat = list.geometry.coordinates[1];
let address = list.location + ", " + list.country;
//A Leaflet map is initialized and centered at latitude and longitude with a zoom level of 13.
const map = L.map("map").setView([lat, lng], 13);
// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

L.marker([lat, lng] /* , { icon: redIcon } */)
  .addTo(map)
  .bindPopup(
    `<div><h5>${address}</h5>Exact location be provided after booking</div>`
  )
  .openPopup();
