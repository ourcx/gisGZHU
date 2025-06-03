import TileLayer from 'ol/layer/Tile.js';
function changeMap(n, map, amapLayer,maeketLayer) {
    

    var layers = map.getLayers();
    map.removeLayer(layers.item(0));  // 或者 layers.getArray()[0]


    if (n == 0) {
        map.addLayer(amapLayer)
    } else if (n == 1) {
        map.addLayer(maeketLayer)
    } 

    map.render();

}

export { changeMap }
