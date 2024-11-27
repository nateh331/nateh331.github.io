/* global Chart:false */
const markers = JSON.parse(document.getElementById("markers-data").textContent);
for (i=0; i<markers.features.length;i++){
	markers.features[i].geometry.coordinates.reverse();
}
const aerial = JSON.parse(document.getElementById("aerial").textContent);
const cus = JSON.parse(document.getElementById("cus").textContent);

function objToString (obj) {
	var str = '';
	for (var p in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, p)) {

			str += p + '::' + obj[p] + '<br>';
		}
	}
	return str;
}

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

var slices=[{
    size:10,
    type: "circle",
    max: 1,
    attrs: {
        fill: "blue"
    },
    label: "Submarine"
},{
    size:10,
    type: "circle",
    max: 2,
    attrs: {
        fill: "yellow"
    },
    label: "Surface"
},{
    size:10,
    type: "circle",
    max: 3,
    attrs: {
        fill: "green"
    },
    label: "Aerial"
},{
    size:10,
    type: "circle",
    max: 4,
    attrs: {
        fill: "red"
    },
    label: "Seabed"
}
];

function getSlices(zoom){
    return slices=[{
        size:12-zoom,
        type: "circle",
        max: 1,
        attrs: {
            fill: "blue"
        },
        label: "Submarine"
    },{
        size:12-zoom,
        type: "circle",
        max: 2,
        attrs: {
            fill: "yellow"
        },
        label: "Surface"
    },{
        size:12-zoom,
        type: "circle",
        max: 3,
        attrs: {
            fill: "green"
        },
        label: "Aerial"
    },{
        size:12-zoom,
        type: "circle",
        max: 4,
        attrs: {
            fill: "red"
        },
        label: "Seabed"
    }
    ];

}

var plots = {};














//adding subs
var features = markers.features;
var db = 0;
for(var i = 0; i < features.length;i++){
    var str = "subs" + i;
    var feature = features[i];
    if(db <= parseInt(feature.properties.db_aemp) && feature.properties.db_surface == null){
        plots[str] = {
            value: 1,
            latitude: feature.geometry.coordinates[0],
            longitude: feature.geometry.coordinates[1],
            href: "#",
            tooltip: {
                content: makeTooltip(feature)
            }
        };
        db++;
    }
}
db = 0;
for(var i = 0; i < features.length;i++){
    var str = "surface" + i;
    var feature = features[i];
    if(db <= parseInt(feature.properties.db_surface) && feature.properties.db_aemp == null){
        plots[str] = {
            value: 2,
            latitude: feature.geometry.coordinates[0],
            longitude: feature.geometry.coordinates[1],
            href: "#",
            tooltip: {
                content: makeTooltip(feature)
            }
        };
        db++;
    }
}

//adding aerial
features = aerial.features;
for(var i = 0; i < features.length;i++){
    var str = "aerial" + i;
    var feature = features[i];
    plots[str] = {
        value: 3,
        latitude: feature.geometry.coordinates[0],
        longitude: feature.geometry.coordinates[1],
        href: "#",
        tooltip: {
            content: objToString(feature.properties)
        }
    }; 
}

//adding seabed
features = cus.features;
for(var i = 0; i < features.length;i++){
    var str = "cus" + i;
    var feature = features[i];
    plots[str] = {
        value: 4,
        latitude: feature.geometry.coordinates[0],
        longitude: feature.geometry.coordinates[1],
        href: "#",
        tooltip: {
            content: objToString(feature.properties)
        }
    }; 
}


$(function () {
    $('#world-map-markers').mapael({
        map: {
            name: 'world_countries_mercator',
            zoom: {
                enabled: true,
                maxLevel: 10
            }
        },
        legend:{
            plot:{
                cssClass: 'myLegend',
                slices: getSlices(0)
            }
        },
        plots: plots
    })
    $('#world-map-markers').on('zoom', function(){
    var currentZoom = $('#world-map-markers').data("mapael").zoomData.zoomLevel;
    $('#world-map-markers').trigger('update',[{
        mapOptions:{
            legend:{
                plot:{
                    slices: getSlices(currentZoom)
                }
            }
        }
    }]);
    });
})
