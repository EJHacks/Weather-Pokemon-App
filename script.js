
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
}

async function APITest() {
    let lat = 1;
    let lon = 1;
    const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + lon + "&daily=temperature_2m_max,temperature_2m_min";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); 
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fetch-pokemon-btn").addEventListener("click", getPokemonData);

    APITest();
});
