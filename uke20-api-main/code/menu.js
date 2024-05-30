const magnifyingGlass = document.querySelector('.fa-solid.fa-magnifying-glass');
magnifyingGlass.addEventListener("click", openmenu);

function openmenu() {
    if (mybtn.style.display !== 'block') {
        mybtn.style.display = 'block';
    } else {
        mybtn.style.display = 'none';
    }
    console.log('clicked');
}

// map settings
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

var map = L.map('map1').setView([40.638530, -95.764925], 4);
// let marker = L.marker([59.745164250056135,10.164131070531106 ]).addTo(map)
let marker = [];
let tileURL = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { }).addTo(map);
const tiles = L.tileLayer(tileURL,{attribution});
const markersLayer = L.layerGroup().addTo(map);

// function remove_markers(){
//     map.eachLayer(function(layer) {
//         if (layer instanceof L.marker) {
//             map.removeLayer(layer);
//         }
//     });
// }

async function show_me(){

    markersLayer.clearLayers();

    let search_term = document.getElementById("searchbar").value;
    const api_url = `https://api.openbrewerydb.org/v1/breweries/search?query=${search_term}&per_page=20`;
    console.log(search_term);
    // const api_url = 'https://api.openbrewerydb.org/v1/breweries/search?query=california&per_page=3';

    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);

    data.forEach(element => {
        if (element.longitude !== null && element.latitude !== null) {
            let marker = L.marker([element.latitude, element.longitude]).addTo(map);
            marker.bindPopup(`<b>${element.name}</b><br>${element.latitude}  ${element.longitude}`).openPopup();
    }
    });
}

// Add event listener for Ctrl + Scroll
map.scrollWheelZoom.disable();
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.deltaY !== 0) {
        map.scrollWheelZoom.enable();
    }
});
document.addEventListener('keyup', () => {
    map.scrollWheelZoom.disable();
});