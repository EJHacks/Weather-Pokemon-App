// EVERYTHING IS WRITTEN IN ORDER OF EXECUTION

/* Runs when html is done (pointless when using defer) */
document.addEventListener("DOMContentLoaded", () => {
    // Adds click behavior to button
    document.getElementById("fetch-pokemon-btn").addEventListener("click", getPokemonData);

});

// Gets random pokemon, extracts data about it from pokeapi, and displays some of it on screen
async function getPokemonData() {

    // Grabs a random pokemon from 0 to 150 and its data
    const url = "https://pokeapi.co/api/v2/pokemon/" + Math.floor((Math.random() * 150) + 1);
    const response = await fetch(url);
    const data = await response.json();


    // Grabs selected pokemon image and sets the source, alt text, and gives it the pokemon-image class for formatting 
    let image = document.createElement("img");
    image.src = data.sprites.front_default;
    image.alt = data.name;
    image.classList.add("pokemon-image"); 

    // Appends the pokemon image into the pokemon container div 
    const container = document.getElementById("pokemon-container");

    if (container.childElementCount > 0){
        container.removeChild(container.lastElementChild);
    }
    container.appendChild(image);

    // Grabs the pokemon name p tag and inserts the pokemon's name into it
    const pokemonNameElement = document.getElementById("Pokemon-Name");
    pokemonNameElement.innerText = data.name;

    // Finally, calls APITest for extra data (Date, Temp, etc.)
    APITest();
}

// Displays weather data from random latitude and longitude via the open-meteo api
async function APITest() {
    // Generate random latitude and longitude to get data for [90 and 180 are excluded but it seems like too much work to fix it - Kal-el Baptiste]
    let lat = (((Math.random() * 2) - 1) * 90); // the * 2 makes the range [0, 2), the -1 makes the range [-1, 1)
    let long = (((Math.random() * 2) -1) * 180);

    // Fetches forcast for that latitude-longitude point 
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + long + "&daily=temperature_2m_max,temperature_2m_min";
    const response = await fetch(url);
    const data = await response.json();

    // Grabs weather container from HTML
    const container = document.getElementById("weather-container");

    // Removes all previous weather data if there is
    console.log("container children: " + container.childElementCount);
    if (container.childElementCount > 0){
        // since the length of the container children decreases on each loop, i DOES NOT need to be incremented (think about it)
        for (let i = 0; i < container.childElementCount;){
            console.log("Iteration: " + i);
            container.removeChild(container.lastElementChild);
        }
    }

    // Creates lat element and appends it into container. It also removes the old latitude.
    let latElement = document.createElement("p");
    latElement.innerText = "Latitude: " + lat + "°";
    container.appendChild(latElement);

    // Creates long element and appends it into container. It also removes the old latitude.
    let longElement = document.createElement("p");
    longElement.innerText = "Longitude: " + long + "°";
    container.appendChild(longElement);

    // Inserts low and max temp into 'weather name' p tag
    let temperature = document.createElement("p");
    temperature.innerText = `Lowest Temp: ${data.daily.temperature_2m_min[0]}°C - Highest Temp: ${data.daily.temperature_2m_max[0]}°C`;
    container.appendChild(temperature);

    // DEBUG + INFO
    console.log(data.daily)
    console.log("Date: " + data.daily.time[0]);
    console.log("Max Temperature: " + data.daily.temperature_2m_max[0]);
    console.log("Min Temperature: " + data.daily.temperature_2m_min[0]);
}



