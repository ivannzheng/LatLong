import { geocodeKey } from "./config";

async function fetchLatLng() {
  try {
    const city = document.getElementById("city-input").value.trim();
    const latitudeBox = document.getElementById("latitude-value");
    const longitudeBox = document.getElementById("longitude-value");
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${geocodeKey}`;

    latitudeBox.textContent = 'Loading...';
    longitudeBox.textContent = 'Loading...';

    const response = await fetch(geocodeUrl);

    if (!response.ok) {
      throw new Error("Could not retrieve data");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      latitudeBox.textContent = '--';
      longitudeBox.textContent = '--';
      throw new Error("No results found for the given city.");
    }

    const lat = data.results[0].geometry.lat;
    const lng = data.results[0].geometry.lng;

    latitudeBox.textContent = lat.toFixed(6); 
    longitudeBox.textContent = lng.toFixed(6);

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
    document.getElementById("latitude-value").textContent = '--';
    document.getElementById("longitude-value").textContent = '--';
  }
}



