const apiKey = 'e9675baa5d9c4c2e96c212051241304';
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const mapElement = document.getElementById('map');
let map; // Declare map variable globally

// Add event listener to the search button
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.location.name;
            temperatureElement.textContent = `${data.current.temp_c}°C`;
            descriptionElement.textContent = data.current.condition.text;

            // Update background color based on temperature
            updateBackgroundColor(data.current.temp_c);

            // Clear previous map layers and markers
            if (map) {
                map.remove();
            }

            // Initialize map with location coordinates
            const latitude = data.location.lat;
            const longitude = data.location.lon;
            initializeMap(latitude, longitude);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
        });
}

// Add the new function here
function updateBackgroundColor(temperature) {
    const container = document.querySelector('.container');
    // Determine the background color based on temperature ranges
    if (temperature < 0) {
        container.style.backgroundColor = '#1D24CA'; // Extremely Cold
    } else if (temperature >= 0 && temperature <= 15) {
        container.style.backgroundColor = '#86B6F6'; // Cold
    } else if (temperature > 15 && temperature <= 20) {
        container.style.backgroundColor = '#90D26D'; // Slightly Cold
    } else if (temperature > 20 && temperature <= 25) {
        container.style.backgroundColor = '#FFF455'; // Slightly Warm
    } else if (temperature > 25 && temperature <= 30) {
        container.style.backgroundColor = '#FFC700'; // Warm
    } else {
        container.style.backgroundColor = '#E21818'; // Extremely Hot
    }
}


function initializeMap(latitude, longitude) {
    // Initialize map
    map = L.map(mapElement).setView([latitude, longitude], 10);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for the location
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Your Location')
        .openPopup();
}
