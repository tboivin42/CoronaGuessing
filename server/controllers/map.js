const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoidGJvaXZpbiIsImEiOiJjazcyZjBrb3gwMWtwM2VtaWlodzdxN2p6In0.P1SXOPffjX7XUh8cSiCBNA';

export const map = new mapboxgl.Map({
style: 'mapbox://styles/mapbox/streets-v11'
});

// <link href='https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.css' rel='stylesheet' />
