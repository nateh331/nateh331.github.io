// Markers
const markers = JSON.parse(document.getElementById("markers-data").textContent);

for (i=0; i<markers.features.length;i++){
	markers.features[i].geometry.coordinates.reverse();
}
/*
var leftMarkers = structuredClone(markers);
var rightMarkers = structuredClone(markers);
for (i=0; i<markers.features.length;i++){
	leftMarkers.features[i].geometry.coordinates[1]=leftMarkers.features[i].geometry.coordinates[1]-360;
	rightMarkers.features[i].geometry.coordinates[1]=rightMarkers.features[i].geometry.coordinates[1]+360;
}
//merge the marker arrays
markers.features = markers.features.concat(leftMarkers.features);
markers.features = markers.features.concat(rightMarkers.features);
*/


const aerial = JSON.parse(document.getElementById("aerial").textContent);

var leftAerial = structuredClone(aerial);
var rightAerial = structuredClone(aerial);
for (i=0; i<aerial.features.length;i++){
	leftAerial.features[i].geometry.coordinates[1]=leftAerial.features[i].geometry.coordinates[1]-360;
	rightAerial.features[i].geometry.coordinates[1]=rightAerial.features[i].geometry.coordinates[1]+360;
}
//merge the marker arrays
aerial.features = aerial.features.concat(leftAerial.features);
aerial.features = aerial.features.concat(rightAerial.features);

const cus = JSON.parse(document.getElementById("cus").textContent);

var leftCus = structuredClone(cus);
var rightCus = structuredClone(cus);
for (i=0; i<cus.features.length;i++){
	leftCus.features[i].geometry.coordinates[1]=leftCus.features[i].geometry.coordinates[1]-360;
	rightCus.features[i].geometry.coordinates[1]=rightCus.features[i].geometry.coordinates[1]+360;
}
//merge the marker arrays
cus.features = cus.features.concat(leftCus.features);
cus.features = cus.features.concat(rightCus.features);

function makeTooltip(feature){
	var tooltip = "";
	if(feature.properties.db_aemp != null){
		tooltip += "db_aemp::" + feature.properties.db_aemp + "<br>";
	};
	if(feature.properties.db_surface != null){
		tooltip += "db_surface::" + feature.properties.db_surface + "<br>";
	};
	if(feature.properties.db_aerial != null){
		tooltip += "db_aerial::" + feature.properties.db_aerial + "<br>";
	};
	if(feature.properties.db_seabed != null){
		tooltip += "db_seabed::" + feature.properties.db_seabed + "<br>";
	};
	if(feature.properties.datetime != null){
		var str = feature.properties.datetime + "";
		var dt = str.split('T');
		tooltip += "date::" + dt[0] + "<br>";
		tooltip += "time::" + dt[1] + "<br>";
	};
	if(feature.properties.depth != null){
		tooltip += "depth::" + feature.properties.depth + "<br>";
	};
	if(feature.properties.speed != null){
		tooltip += "speed::" + feature.properties.speed + "<br>";
	};
	return tooltip;
}

//Draw lines between markers
function connectDots(data, map, type, color) {
	var features = data.features,
		feature;
		c = [];
		lines = [];

	/*
	var strFeatures = [];
	for(var i=0; i<data.features.length; i++){
		strFeatures.push(objToString(data.features[i].properties));
		//alert(objToString(data.features[i].properties));
	}
	alert(strFeatures);
	*/
	var startPnt = 0;
	
	for(var db = 0; db < features.length; db++){
		for(var pnt = startPnt; pnt < features.length; pnt++) {
			feature = features[pnt];
			//alert(objToString(feature.properties));
			//alert(feature.properties.db_aemp);
			 if(feature.properties.db_aemp == db) {
				//don't draw on arctic proj if lat is too far from pole
				if(type == "arctic"){
					if(feature.geometry.coordinates[0]<50){
						c=[];
						break;
					}
				}else if(type == "antarctic"){
					if(feature.geometry.coordinates[0]>-50){
						c=[];
						break;
					}
				}
				//push point into an array
				c.push(feature.geometry.coordinates);
				//here only drawing points between two lines since line in between must be unique
				if(c.length >= 2){
					if(getDistance(c[0][0],c[0][1],c[1][0],c[1][1])<10){
					lines.push(L.polyline(c,{color: color,weight: 3,opacity: 0.5,smoothFactor: 1}).bindTooltip(makeTooltip(feature)));
					c[0][1]=c[0][1]-360;
					c[1][1]=c[1][1]-360;
					lines.push(L.polyline(c,{color: color,weight: 3,opacity: 0.5,smoothFactor: 1}).bindTooltip(makeTooltip(feature)));
					c[0][1]=c[0][1]+720;
					c[1][1]=c[1][1]+720;
					lines.push(L.polyline(c,{color: color,weight: 3,opacity: 0.5,smoothFactor: 1}).bindTooltip(makeTooltip(feature)));
					c[0][1]=c[0][1]-360;
					c[1][1]=c[1][1]-360;
					}
					c.shift();
				}
				
			}else if(feature.properties.db_aemp > db){
				//once we are beyond current database
				c=[];
				startPnt = pnt;
				break;
			}else{
				//if we are not yet on db
				continue;
			}
		}
	}
	return lines;
	
}

//temp to draw surface ones
function connectDots2(data, map, type, color) {
	var features = data.features,
		feature;
		c = [];
		lines = [];

	/*
	var strFeatures = [];
	for(var i=0; i<data.features.length; i++){
		strFeatures.push(objToString(data.features[i].properties));
		//alert(objToString(data.features[i].properties));
	}
	alert(strFeatures);
	*/
	var startPnt = 0;
	
	for(var db = 0; db < features.length; db++){
		for(var pnt = startPnt; pnt < features.length; pnt++) {
			feature = features[pnt];
			if(feature.properties.db_surface == db) {
				//don't draw on arctic proj if lat is too far from pole
				if(type == "arctic"){
					if(feature.geometry.coordinates[0]<50){
						c=[];
						break;
					}
				}else if(type == "antarctic"){
					if(feature.geometry.coordinates[0]>-50){
						c=[];
						break;
					}
				}
				//push point into an array
				c.push(feature.geometry.coordinates);
				//here only drawing points between two lines since line in between must be unique
				if(c.length >= 2){
					if(getDistance(c[0][0],c[0][1],c[1][0],c[1][1])<10){
					lines.push(L.polyline(c,{color: color,weight: 3,opacity: 0.5,smoothFactor: 1}).bindTooltip(makeTooltip(feature)));
					c[0][1]=c[0][1]-360;
					c[1][1]=c[1][1]-360;
					lines.push(L.polyline(c,{color: color,weight: 3,opacity: 0.5,smoothFactor: 1}).bindTooltip(makeTooltip(feature)));
					c[0][1]=c[0][1]+720;
					c[1][1]=c[1][1]+720;
					lines.push(L.polyline(c,{color: color,weight: 3,opacity: 0.5,smoothFactor: 1}).bindTooltip(makeTooltip(feature)));
					c[0][1]=c[0][1]-360;
					c[1][1]=c[1][1]-360;
					}
					c.shift();
				}
				
			}else if(feature.properties.db_surface > db){
				//once we are beyond current database
				c=[];
				startPnt = pnt;
				break;
			}else{
				//if we are not yet on db
				continue;
			}
		}
	}
	return lines;
	
}

//Draw points for aerial and CUS
function drawPoints(data, map, type, color) {
	var features = data.features,
		feature;
		circles = [];

		/*
		var strFeatures = [];
		for(var i=0; i<data.features.length; i++){
			strFeatures.push(objToString(data.features[i].properties));
			//alert(objToString(data.features[i].properties));
		}
		alert(strFeatures);
		*/
	
	for(var db = 0; db < features.length; db++){
		feature = features[db];
		//don't draw on arctic proj if lat is too far from pole
		if(type == "arctic"){
			if(feature.geometry.coordinates[0]<50){
				continue;
			}
		}else if(type == "antarctic"){
			if(feature.geometry.coordinates[0]>-50){
				continue;
				}
		}
		circles.push(L.circleMarker(feature.geometry.coordinates,{color: color,weight: 3,opacity: 1, radius: 5}).bindTooltip(objToString(feature.properties)));		
	}
	return circles;
	
}

//created more points on polygon, used for artic projection
function getDistance(x1, y1, x2, y2) {
	var dist = Math.sqrt(((y2-y1)*(y2-y1))+((x2-x1)*(x2-x1)));
	return parseFloat(dist.toFixed(5));
}

function getMid(x1, y1, x2, y2) {
	var x = (x2+x1)/2;
	var y = (y2+y1)/2;
	var point = L.latLng(y, x);
	return point;
}

function morePoints (latLngs, pos, done){
	//returns if empty array
	if(latLngs.length == 0){
		return;
	}
	if(pos >= latLngs.length - 1){
		//after handleing start loop
		if(done){
			return
		}

		//appends first element to end of array to fix the loop
		var temp = latLngs.shift();
		latLngs.push(temp);
		pos--;
		done = true;
	}

	var maxDist = 10;
	var i;
	for(i= pos; i < latLngs.length ;i++){
		var x1 = parseFloat(latLngs[i].lng.toFixed(5));
		var y1 = parseFloat(latLngs[i].lat.toFixed(5));
		var x2 = parseFloat(latLngs[i-1].lng.toFixed(5));
		var y2 = parseFloat(latLngs[i-1].lat.toFixed(5));
		//points are too far apart
		if(getDistance(x1, y1, x2, y2) > maxDist){
			latLngs.splice(i, 0, getMid(x1, y1, x2, y2));
			break;
		}
	}
	//alert("during: i="+ i+ ", length=" + latLngs.length + ", full: " + latLngs);
	morePoints(latLngs, i-1, done);
}

function objToString (obj) {
	var str = '';
	for (var p in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, p)) {

			str += p + '::' + obj[p] + '<br>';
		}
	}
	return str;
}

function SetToString(set, delim){
	let str = '';
	set.forEach(function(elem){
		str += elem + delim
	});
	return str.slice(0, -1);
}

function nodeToString ( node ) {
	var tmpNode = document.createElement( "div" );
	tmpNode.appendChild( node.cloneNode( true ) );
	var str = tmpNode.innerHTML;
	tmpNode = node = null; // prevent memory leaks in IE
	return str;
 }

//code for mouse lat/lon position
L.Control.MousePosition = L.Control.extend({
	options: {
	  position: 'bottomleft',
	  separator: ' : ',
	  emptyString: 'Unavailable',
	  lngFirst: false,
	  numDigits: 5,
	  lngFormatter: undefined,
	  latFormatter: undefined,
	  prefix: ""
	},
  
	onAdd: function (map) {
	  this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
	  L.DomEvent.disableClickPropagation(this._container);
	  map.on('mousemove', this._onMouseMove, this);
	  this._container.innerHTML=this.options.emptyString;
	  return this._container;
	},
  
	onRemove: function (map) {
	  map.off('mousemove', this._onMouseMove)
	},
  
	_onMouseMove: function (e) {
	  var lng = this.options.lngFormatter ? this.options.lngFormatter(e.latlng.lng) : L.Util.formatNum(e.latlng.lng, this.options.numDigits);
	  var lat = this.options.latFormatter ? this.options.latFormatter(e.latlng.lat) : L.Util.formatNum(e.latlng.lat, this.options.numDigits);
	  var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
	  var prefixAndValue = this.options.prefix + ' ' + value;
	  this._container.innerHTML = prefixAndValue;
	}
  
  });
  
  L.Map.mergeOptions({
	  positionControl: false
  });
  
  L.Map.addInitHook(function () {
	  if (this.options.positionControl) {
		  this.positionControl = new L.Control.MousePosition();
		  this.addControl(this.positionControl);
	  }
  });
  
  L.control.mousePosition = function (options) {
	  return new L.Control.MousePosition(options);
  };

//originally				map type/projection type  lat origin? lat zoom   lon rotate
//const crs = new L.Proj.CRS('EPSG:3575', '+proj=stere +lat_0=90 +lat_ts=-6 +lon_0=-45 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs', {
const arcticCrs = new L.Proj.CRS('EPSG:5936', '+proj=stere +lat_0=90 +lat_ts=227.3 +lon_0=210 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs', {
	resolutions: [32768, 16384, 8192, 4096, 2048, 1024, 512, 256],
	origin: [-4194304, 4194304],
	bounds: L.bounds (
	  [-4194304, -4194304],
	  [4194304, 4194304]
	)
});

const antarcticCrs = new L.Proj.CRS("EPSG:3031", "+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs", {
    origin: [-3.369955099203E7, 3.369955101703E7],
    resolutions: [238810.81335399998, 119405.40667699999, 59702.70333849987, 29851.351669250063, 14925.675834625032, 7462.837917312516, 3731.4189586563907, 1865.709479328063,
        932.8547396640315, 466.42736983214803, 233.21368491607402, 116.60684245803701, 58.30342122888621, 29.151710614575396, 14.5758553072877, 7.28792765351156, 3.64396382688807,
        1.82198191331174]
});

//const overlay=L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 7, attribution:'World Ocean Base: ArcGIS' });
const overlay=L.tileLayer('static/img/bathometricData/{z}/{y}/{x}.png', { maxZoom: 7, attribution:'World Ocean Reference: ArcGIS' });
const arcOverlay=L.tileLayer('static/img/arcticOceanReference/{z}/{y}/{x}.png', {layers:'PolarviewCoastArctic10Grat',format:'image/png', transparent:"true", attribution:'Arctic Ocean Reference: ArcGIS'});
//const antarcOverlay=L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Polar/Antarctic_Ocean_Reference/MapServer/tile/{z}/{y}/{x}', {layers:'PolarviewCoastArctic10Grat',format:'image/png', transparent:"true", attribution:'Polarview'});

//Map
function drawMap(elemStr, type, m1, m2, m3){
var map;

if(type == "arctic"){
	map = L.map(elemStr, {
        crs: arcticCrs,
        maxZoom: 7,
		minZoom: 3,
		center: new L.LatLng(90, 0),
		zoom: 4,
    });
}else if(type == "antarctic"){
	map = L.map(elemStr, {
        crs: antarcticCrs,
        maxZoom: 7,
		minZoom: 3,
		center: new L.LatLng(-90, 0),
		zoom: 4,
		worldCopyJump:false
    });
}else{
	map = new L.Map(elemStr, { 
		center: new L.LatLng(0, 0), 
		zoom: 2
	});
}
// Draw Controls
var drawnItems = L.featureGroup().addTo(map);

//Bathometric Overlay
if(type == "mercator"){overlay.addTo(map);}
else if(type == "arctic"){arcOverlay.addTo(map);}
//else{antarcOverlay.addTo(map);}

//Draw Graticule
var grat;
if(type=="arctic"){
	 grat = L.graticule({
		showLabel: true,
  		color: '#000000',
  		dashArray: [5, 5],
		intervalLat: 10,
        intervalLng: 30,
		latBounds:[45,90],
		zoomInterval: [
			{start: 2, end: 3, interval: 30},
			{start: 4, end: 4, interval: 10},
			{start: 5, end: 7, interval: 5},
			{start: 8, end: 10, interval: 1}
		]
		// centerLonLabels: true
    }).addTo(map);
}else if(type=="antarctic"){
	grat = L.graticule({
		showLabel: true,
  		color: '#000000',
  		dashArray: [5, 5],
		intervalLat: 10,
        intervalLng: 30,
		latBounds: [-90,-45],
		zoomInterval: [
			{start: 2, end: 3, interval: 30},
			{start: 4, end: 4, interval: 10},
			{start: 5, end: 7, interval: 5},
			{start: 8, end: 10, interval: 1}
		]
		// centerLonLabels: true
    }).addTo(map);
}else{
	grat = L.latlngGraticule({
	showLabel: true,
	color: '#000000',
	dashArray: [5, 5],
	zoomInterval: [
		{start: 2, end: 3, interval: 30},
		{start: 4, end: 4, interval: 10},
		{start: 5, end: 7, interval: 5},
		{start: 8, end: 10, interval: 1}
	]
	}).addTo(map);
}

//drawing markers
aemp = L.layerGroup(connectDots(markers, map, type, 'Blue')).addTo(map);
surface = L.layerGroup(connectDots2(markers, map, type, 'Yellow')).addTo(map);
aerial_markers = L.layerGroup(drawPoints(aerial, map, type, 'Green')).addTo(map);
cus_markers = L.layerGroup(drawPoints(cus, map, type, 'Red')).addTo(map);

//control layer to toggle each element
var controlLayer;
var tiles;
var lit;
if(type == "arctic"){
	lit = { 'Draw Layer': drawnItems, 
	'Overlay': arcOverlay, 
	'Graticule': grat, 
	'AEMP': aemp, 
	'Surface': surface, 
	'Aerial': aerial_markers, 
	'CUS': cus_markers};

	tiles = {
		"ArcGIS Map" : m1.addTo(map),
		"Imagery" : m2
	};
}else if(type == "antarctic"){
	lit = { 'Draw Layer': drawnItems,
	'Graticule': grat, 
	'AEMP': aemp,
	'Surface': surface,
	'Aerial': aerial_markers,
	'CUS': cus_markers};

	tiles = {
		"Imagery" : m1.addTo(map)
	};
}else{
	lit = { 'Draw Layer': drawnItems,
	'Overlay': overlay, 
	'Graticule': grat, 
	'AEMP': aemp, 
	'Surface': surface, 
	'Aerial': aerial_markers, 
	'CUS': cus_markers};

	tiles = {
		"ArcGIS Map" : m2.addTo(map),
		"USGS Map" : m1
	};
}

if(aemp.getLayers().length == 0){
	delete lit["AEMP"];
}
if(surface.getLayers().length == 0){
	delete lit["Surface"];
}
if(aerial_markers.getLayers().length == 0){
	delete lit["Aerial"];
}
if(cus_markers.getLayers().length == 0){
	delete lit["CUS"];
}

controlLayer = L.control.layers(tiles, lit, { position: 'topleft', collapsed: true }).addTo(map);

//alert(nodeToString(controlLayer._container));
//document.getElementsByClassName("leaflet-control-layers-selector")[0].style.color = 'red';

//adds lasso control to map
const lassoControl = L.control.lasso({position: 'topleft', id: 'lasso'}).addTo(map);
//alert(nodeToString(lassoControl._container));
//lasso button HTML
//NEEDS FIX, ONLY DISABLES LASSO ON MERCATOR PROJECTION
var lassoBtn = document.getElementsByClassName("leaflet-control-lasso")[0];

//Create polygon after lasso creation
map.on('lasso.finished', function (event) {
	//alert(Object.getOwnPropertyNames(event));
	var latLngs = [];
	var len = event.latLngs.length;
	//reduce number of vertices to reduce lag
	var step = 2;
	for(var i=0; i < len ;i++){
		if(i % step == 0){
			latLngs.push(event.latLngs[i]);
		}
	}
	//drawnItems.addLayer(L.polygon(latLngs));

	//dealing with jump
	/*
	if(type == "arctic"){
		morePoints(latLngs, 1, false);
		var side1 = [latLngs[0]];
		var side2 = [];
		var flip = false;
		for(var i=1; i < latLngs.length ;i++){
			//if jump occurs
			if(latLngs[i].lng >= 0 && latLngs[i-1].lng < 0 || latLngs[i].lng <= 0 && latLngs[i-1].lng > 0 ){
				if(Math.abs(latLngs[i].lng - latLngs[i-1].lng)>100){
				flip = !flip;
				}
			}
			
			if(flip){
				side2.push(latLngs[i]);
			}else{
				side1.push(latLngs[i]);
			}
		}
		//morePoints(side1, 1, false);
		//morePoints(side2, 1, false);

		drawnItems.addLayer(L.polygon(side1));
		if(side2.length != 0){
			drawnItems.addLayer(L.polygon(side2));
		}

	}else{
		*/
		drawnItems.addLayer(L.polygon(latLngs));
	//}
});

map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: true
        }
    },
    draw: {
        polygon: {
            allowIntersection: true,
            showArea: true,
			//shapeOptions: {color: 'green'}
        }
    }
}));

map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
});

//adds lat/lon for mouse
L.control.mousePosition({
	lngFormatter: function(num) {
		var direction = (num < 0) ? 'W' : 'E';
		var formatted = Math.abs(L.Util.formatNum(num, 3)) + 'º ' + direction;
		return formatted; 
	  },
	  latFormatter: function(num) {
		var direction = (num < 0) ? 'S' : 'N';
		var formatted = Math.abs(L.Util.formatNum(num, 3)) + 'º ' + direction;
		return formatted;
	  }
}).addTo(map);

var arcticLine = [[90, 0],[50, 180]]
var arcticLine2 = [[0, 90],[180, 50]]
if(type=="arctic"){
var arcticJump = L.polyline(arcticLine,{color: 'yellow',weight: 3,opacity: 0.7,smoothFactor: 1}).bindTooltip("Arctic Jump").addTo(map);
}

//c = [[-90, 0],[-50, 180]]
//L.polyline(c,{color: 'orange',weight: 3,opacity: 0.7,smoothFactor: 1}).bindTooltip("Antarctic Jump").addTo(map);
			
//Code for getting lat long data
//markers.features[i].geometry.coordinates
//Code for getting the db name
//markers.features[i].properties.db_aemp

// Filter by polygon
//create an object clone so reverse doesn't change markers
const markersClone = structuredClone(markers);
const aerialClone = structuredClone(aerial);
const seabedClone = structuredClone(cus);
// create an array of points for the turf algorithms
var turf_pnts = [];
var aerial_pnts = [];
var seabed_pnts = [];
var pnt;
for (i=0; i<markers.features.length;i++){
	pnt = markersClone.features[i].geometry.coordinates;
	turf_pnts.push(pnt);
	//reverse turf points to make it work with algorithm
	turf_pnts[i].reverse();
}
for (i=0; i<aerial.features.length;i++){
	pnt = aerialClone.features[i].geometry.coordinates;
	aerial_pnts.push(pnt);
	//reverse turf points to make it work with algorithm
	aerial_pnts[i].reverse();
}

for (i=0; i<cus.features.length;i++){
	pnt = seabedClone.features[i].geometry.coordinates;
	seabed_pnts.push(pnt);
	//reverse turf points to make it work with algorithm
	seabed_pnts[i].reverse();
}
			
var hash = {}
var hash2 = {}
var hash3 = {}
var hash4 = {}
for(var i=0; i<turf_pnts.length; i++){
	hash[turf_pnts[i]] = markersClone.features[i].properties.db_aemp;
	hash2[turf_pnts[i]] = markersClone.features[i].properties.db_surface;
}
for(var i=0; i<aerial_pnts.length; i++){
	hash3[aerial_pnts[i]] = aerialClone.features[i].properties.pk;
}
for(var i=0; i<seabed_pnts.length; i++){
	hash4[seabed_pnts[i]] = seabedClone.features[i].properties.pk;
}

var db_ids = [];
var db_ids2 = [];
var db_ids3 = [];
var db_ids4 = [];

var checkAllLayers = function(){
	var db_ids = [];
	var db_ids2 = [];
	var db_ids3 = [];
	var db_ids4 = [];
	drawnItems.eachLayer(function (layer) {
		var geojson = layer.toGeoJSON();
		var result, result3, result4;
		// Find Points in Polygon
		if (geojson.geometry.type == "Polygon"){
			result = turf.within(turf.points(turf_pnts), turf.polygon([geojson.geometry.coordinates[0]]));
			result3 = turf.within(turf.points(aerial_pnts), turf.polygon([geojson.geometry.coordinates[0]]));
			result4 = turf.within(turf.points(seabed_pnts), turf.polygon([geojson.geometry.coordinates[0]]));
		}else{
			//create proxy polygon for calculationg points
			var center = geojson.geometry.coordinates;
			var options = {steps: 25,units: 'kilometers', options: {}};
			var radius = layer.getRadius()/1000;
			var polygon = turf.circle(center, radius, options);
			result = turf.within(turf.points(turf_pnts), polygon);
			result3 = turf.within(turf.points(aerial_pnts), polygon);
			result4 = turf.within(turf.points(seabed_pnts), polygon);
		}
		for (i=0;i<result.features.length;i++){
			if(hash[result.features[i].geometry.coordinates] != null){
				db_ids.push(hash[result.features[i].geometry.coordinates]);
			}
			if(hash2[result.features[i].geometry.coordinates] != null){
				db_ids2.push(hash2[result.features[i].geometry.coordinates]);
			}
		}
		for (i=0;i<result3.features.length;i++){
			if(hash3[result3.features[i].geometry.coordinates] != null){
				db_ids3.push(hash3[result3.features[i].geometry.coordinates]);
			}
		}
		for (i=0;i<result4.features.length;i++){
			if(hash4[result4.features[i].geometry.coordinates] != null){
				db_ids4.push(hash4[result4.features[i].geometry.coordinates]);
			}
		}
	});
	var set_dbs = new Set(db_ids);	
	if(document.getElementById('id_id')){
		document.getElementById('id_id').value = '';		
		document.getElementById('id_id').value = SetToString(set_dbs,',');
	}
	set_dbs = new Set(db_ids2);	
	if(document.getElementById('id_id2')){
		document.getElementById('id_id2').value = '';		
		document.getElementById('id_id2').value = SetToString(set_dbs,',');
	}
	set_dbs = new Set(db_ids3);	
	if(document.getElementById('id_id3')){
		document.getElementById('id_id3').value = SetToString(set_dbs,',');
	}
	set_dbs = new Set(db_ids4);	
	if(document.getElementById('id_id4')){
		document.getElementById('id_id4').value = SetToString(set_dbs,',');
	}
}
// Capture and Find Points in Polygon
map.on('draw:created', function (e) {
    checkAllLayers();
});
// Capture and Find Points in Polygon for lasso
map.on('lasso.finished', function () {
    checkAllLayers();
});
// Change when shapes are edited
map.on('draw:edited', function () {
	checkAllLayers();
});
// Change when shapes are deleted
map.on('draw:deleted', function () {
	checkAllLayers();
});

//disable lasso while using other tools
map.on('draw:editstart', function () {
	lassoControl.disable();
	lassoBtn.style.pointerEvents = "none";
});
map.on('draw:drawstart', function () {
	lassoControl.disable();
	lassoBtn.style.pointerEvents = "none";
});
map.on('draw:deletestart', function () {
	lassoControl.disable();
	lassoBtn.style.pointerEvents = "none";
});

//enable lasso once complete
map.on('draw:drawstop', function () {
	lassoBtn.style.pointerEvents = "auto";
});
map.on('draw:editstop', function () {
	lassoBtn.style.pointerEvents = "auto";
});
map.on('draw:deletestop', function () {
	lassoBtn.style.pointerEvents = "auto";
});

//https://stackoverflow.com/questions/11569967/insert-a-variable-from-js-to-django-form-input-field
}

var m1=L.tileLayer('static/img/mapTiles/{z}/{x}/{y}.jpg', { maxZoom: 7, attribution:'USGS Nation Map Satellite: Mobile Atlas Creator' });
var m2=L.tileLayer('static/img/oceanMap/{z}/{y}/{x}.png', { maxZoom: 7, attribution:'World Ocean Base: ArcGIS' });
var m3=L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 7, attribution: 'Need sourcing info', attribution:'USGS Nation Map Satellite: Mobile Atlas Creator' });
drawMap('map', 'mercator', m1, m2, m3);

//m1=L.tileLayer.wms('http://geos.polarview.aq/geoserver/wms', {layers:'PolarviewCoastArctic10Grat',format:'image/png',transparent:true, attribution:'Polarview'});
//m1=L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/Polar/Arctic_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {layers:'PolarviewCoastArctic10Grat',format:'image/png', transparent:'true', attribution:'Artic Ocean Base: ArcGIS'});
m1=L.tileLayer('static/img/arcticOceanMap/{z}/{y}/{x}.png', {layers:'PolarviewCoastArctic10Grat',format:'image/png', transparent:'true', attribution:'Artic Ocean Base: ArcGIS'});
m2=L.tileLayer('static/img/arcticImagery/{z}/{y}/{x}.png', {layers:'PolarviewCoastArctic10Grat',format:'image/png', transparent:'true', attribution:'Artic Ocean Imagery: ArcGIS'});
m3=L.tileLayer('https://tile.gbif.org/3575/omt/{z}/{x}/{y}@4x.png', {attribution: 'Need sourcing info'});
drawMap('map2', 'arctic', m1, m2, m3);

//m1=L.tileLayer.wms('http://geos.polarview.aq/geoserver/wms', {layers:'polarview:coastS10',format:'image/png',transparent:true, attribution:'Polarview'});
m1=L.tileLayer('static/img/antarcticImagery/{z}/{y}/{x}.png', {layers:'PolarviewCoastArctic10Grat',format:'image/png', transparent:'true', attribution:'Artic Ocean Imagery: ArcGIS'});
m2=L.tileLayer.wms('http://geos.polarview.aq/geoserver/wms', {layers:'polarview:coastS10',format:'image/png',transparent:true, attribution:'Polarview'});
m3=L.tileLayer('https://tile.gbif.org/3031/omt/{z}/{x}/{y}@4x.png', {attribution: 'Need sourcing info'});
drawMap('map3', 'antarctic', m1, m2, m3);
