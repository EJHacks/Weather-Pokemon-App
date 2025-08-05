async function getPokemonData() {
    const url = "https://pokeapi.co/api/v2/pokemon/" + Math.ceil(Math.random() * 150);
    const response = await fetch(url);
    const data = await response.json();


    let image = document.createElement("img");
    image.src = data.sprites.front_default;
    image.alt = data.name;
    image.classList.add("pokemon-image");


    const container = document.getElementById("pokemon-container");
    container.innerHTML = "";
    container.appendChild(image);



    const pokemonNameElement = document.getElementById("Pokemon-Name");
    pokemonNameElement.innerText = data.name;

    APITest();
}

async function APITest() {
    let lat = Math.random() * 10
    let lon = Math.random() * 10
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&daily=temperature_2m_max,temperature_2m_min";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.daily)
    console.log("Date: " + data.daily.time[0]);
    console.log("Max Temperature: " + data.daily.temperature_2m_max[0]);
    console.log("Min Temperature: " + data.daily.temperature_2m_min[0]);

    let weather = document.getElementById("weather-name")
    weather.innerHTML = `Min Temp: ${data.daily.temperature_2m_min[0]} - Max Temp: ${data.daily.temperature_2m_max[0]}`;
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fetch-pokemon-btn").addEventListener("click", getPokemonData);

});
