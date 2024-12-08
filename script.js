let routes = [
    { 
        id: 1, 
        name: 'Ruta Centro', 
        type: 'bus', 
        stops: ['Plaza Mayor', 'Mercado Central', 'Parque Principal'], 
        streets: ['Calle Mayor', 'Avenida Central', 'Paseo del Parque', 'Calle del Comercio'],
        mapLinkIda: 'https://www.google.com/maps/d/embed?mid=1_FjGYhKgbX6LCQ6lGfNTvJQwdCE&ehbc=2E312F',
        mapLinkVuelta: 'https://www.google.com/maps/d/embed?mid=1YuBrDfOHMY2YQcTdc3H6MKHHiLw&ehbc=2E312F'
    },
    { 
        id: 2, 
        name: 'Ruta Universitaria', 
        type: 'train', 
        stops: ['Estación Central', 'Campus Norte', 'Campus Sur'], 
        streets: ['Avenida de la Universidad', 'Calle de las Ciencias', 'Paseo de los Estudiantes'],
        mapLinkIda: 'https://www.google.com/maps/d/embed?mid=1Xbk_b9lhxVsYOhl9yrKUmNT5V5M&ehbc=2E312F',
        mapLinkVuelta: 'https://www.google.com/maps/d/embed?mid=1_FjGYhKgbX6LCQ6lGfNTvJQwdCE&ehbc=2E312F'
    },
    { 
        id: 3, 
        name: 'Ruta Parques', 
        type: 'bike', 
        stops: ['Parque del Oeste', 'Jardín Botánico', 'Parque del Este'], 
        streets: ['Avenida de los Parques', 'Calle Verde', 'Paseo de las Flores', 'Camino del Bosque'],
        mapLinkIda: 'https://www.google.com/maps/d/embed?mid=1YuBrDfOHMY2YQcTdc3H6MKHHiLw&ehbc=2E312F',
        mapLinkVuelta: 'https://www.google.com/maps/d/embed?mid=1Xbk_b9lhxVsYOhl9yrKUmNT5V5M&ehbc=2E312F'
    }
];

let selectedRoute = null;
let isShowingVuelta = false;

function displayRoutes() {
    const routesList = document.getElementById('routesList');
    routesList.innerHTML = '';
    routes.forEach(route => {
        const routeElement = document.createElement('div');
        routeElement.className = 'route-item';
        routeElement.textContent = route.name;
        routeElement.onclick = () => selectRoute(route);
        routesList.appendChild(routeElement);
    });
}

function selectRoute(route) {
    selectedRoute = route;
    isShowingVuelta = false;
    updateRouteDetails();
    updateMap();
    updateToggleButtonText();
}

function updateRouteDetails() {
    const detailsContainer = document.getElementById('routeDetails');
    detailsContainer.innerHTML = `
        <h3>${selectedRoute.name}</h3>
        <p>Tipo: ${selectedRoute.type}</p>
        <h4>Paradas:</h4>
        <ul>${selectedRoute.stops.map(stop => `<li>${stop}</li>`).join('')}</ul>
        <h4>Calles:</h4>
        <ul>${selectedRoute.streets.map(street => `<li>${street}</li>`).join('')}</ul>
    `;
}

function updateMap() {
    const mapContainer = document.getElementById('mapContainer');
    const mapLink = isShowingVuelta ? selectedRoute.mapLinkVuelta : selectedRoute.mapLinkIda;
    mapContainer.innerHTML = `<iframe src="${mapLink}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
}

function updateToggleButtonText() {
    const toggleBtn = document.getElementById('toggleMapBtn');
    const toggleExpandedBtn = document.getElementById('toggleExpandedMapBtn');
    const buttonText = isShowingVuelta ? 'Cambiar a Mapa de Ida' : 'Cambiar a Mapa de Vuelta';
    toggleBtn.textContent = buttonText;
    toggleExpandedBtn.textContent = buttonText;
}

function toggleMap() {
    isShowingVuelta = !isShowingVuelta;
    updateMap();
    updateToggleButtonText();
}

function expandMap() {
    const overlay = document.getElementById('expandedMapOverlay');
    const expandedMapContainer = document.getElementById('expandedMapContainer');
    overlay.style.display = 'block';
    const mapLink = isShowingVuelta ? selectedRoute.mapLinkVuelta : selectedRoute.mapLinkIda;
    expandedMapContainer.innerHTML = `<iframe src="${mapLink}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
}

function closeExpandedMap() {
    const overlay = document.getElementById('expandedMapOverlay');
    overlay.style.display = 'none';
}

function searchRoutes() {
    const searchTerm = document.getElementById('routeSearch').value.toLowerCase();
    const filteredRoutes = routes.filter(route => route.name.toLowerCase().includes(searchTerm));
    routes = filteredRoutes;
    displayRoutes();
}

function addNewRoute(event) {
    event.preventDefault();
    const newRoute = {
        id: routes.length + 1,
        name: document.getElementById('routeName').value,
        type: document.getElementById('routeType').value,
        stops: document.getElementById('routeStops').value.split(',').map(stop => stop.trim()),
        streets: document.getElementById('routeStreets').value.split(',').map(street => street.trim()),
        mapLinkIda: document.getElementById('mapLinkIda').value,
        mapLinkVuelta: document.getElementById('mapLinkVuelta').value
    };
    routes.push(newRoute);
    displayRoutes();
    document.getElementById('addRouteForm').reset();
}

// Event Listeners
document.getElementById('toggleMapBtn').addEventListener('click', toggleMap);
document.getElementById('expandMapBtn').addEventListener('click', expandMap);
document.getElementById('closeExpandedMapBtn').addEventListener('click', closeExpandedMap);
document.getElementById('toggleExpandedMapBtn').addEventListener('click', toggleMap);
document.getElementById('routeSearch').addEventListener('input', searchRoutes);
document.getElementById('addRouteForm').addEventListener('submit', addNewRoute);

// Initial setup
displayRoutes();
if (routes.length > 0) {
    selectRoute(routes[0]);
}