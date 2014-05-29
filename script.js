// Initial Script

		var map = L.map('map', {
			scrollWheelZoom: false
		}).fitBounds([
            [42.461, -56.979],[32.536, -134.4]
            ]);

		var cloudmade = L.tileLayer("http://a.tiles.mapbox.com/v3/energy.map-461t6jk2/{z}/{x}/{y}.png", {
			//attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
			//key: 'BC9A493B41014CAABB98F0471D759707',
			//styleId: 22677
		}).addTo(map);


		// control that shows state info on hover
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML = '<h4>DOE funding in 2012</h4>' +  (props ?
				'<b>' + props.name + ': $' + props.finalpoint
				: 'Click on a state');
		};

		info.addTo(map);




		// get color depending on population density value
		function getColor(d) {
			return d > 1000000000   ? '#A10341' :
			       d > 500000000    ? '#AE275C' :
			       d > 100000000 	 ? '#BB4B77' :
			       d > 50000000 	 ? '#C96F92' :
			       d > 10000000  	 ? '#D693AD' :
			       d > 0	   	 ? '#E4B7C8' :
			                  	   '#F1DBE3' ;
		}

		function style(feature) {
			return {
				weight: 1,
				opacity: 1,
				color: 'white',
				dashArray: '10,5',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.datapoint[0])
			};
		}

		function highlightFeature(e) {
			var layer = e.target;
			
			//If you scroll over active layer, don't highlight
			if (layer != activedom) {
				layer.setStyle({				
					fillOpacity: 0.7,
					weight: 7,
				opacity: 1,
				color: 'white',
				dashArray: '1,12'
				});
			};

			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}

			//info.update(layer.feature.properties);
		}

		var geojson;
		var activeid;
		var activedom;

		function moveState(e) {
			//this if statement resets style unless your thing is selected.
			if (e.target._leaflet_id != activeid) {

				geojson.resetStyle(e.target);

			}

			//info.update();   //Get's rid of update when leave state

		}

		function onClickfirst(geojson) {
			geojson.resetStyle();
		} 

		function onClicky(e) {

			//this clears the current highlighting on click, if there is something already highlighted.
			if (activedom != undefined) {
				activedom.setStyle({
					weight: 1,
					dashArray: '3',
					fillOpacity: '0.7'
				});
			}; 

			var layer = e.target;
			
			activeid = layer._leaflet_id;
			
			//define next active dom to carry through to next loop
			activedom = layer;

			layer.setStyle({
				weight: 7,
				opacity: 1,
				color: 'white',
				dashArray: '1,12'
			});

			info.update(layer.feature.properties);

			map.fitBounds(e.target.getBounds());

		}

		function onEachFeature(feature, layer) {
			layer.on({
				click: onClicky

			});
			

			layer.on({
				mouseover: highlightFeature,
				mouseout: moveState,
				click: onClickyhigh
			});
		}

		geojson = L.geoJson(statesData, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);

		//map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legendz'),
				grades = [0, 10000000, 50000000, 100000000, 500000000, 1000000000],
				grades2 = [0, '10,000,000', '50,000,000', '100,000,000', '500,000,000', '1,000,000,000'],
				labels = [],
				from, from2, to2;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];
				from2 = grades2[i];
				to2 = grades2[i + 1];

				labels.push(
					'<i style="background:' + getColor(from + 0.1) + '"></i> $' +
					from2 + (to2 ? '&ndash; $' + to2 : '+'));
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);

// Highcharts etc
var test1 = [[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012]];

var items = [[1,2],[3,4],[5,6]];

$( document ).ready(function() {


onClickyhigh();

});

$(function () {
        $('#alaska').click(function(e) {
            map.fitBounds([
            [71.3516, -188.90491],[51.3516, -129.986]
            ]);
        });
        $('#hawaii').click(function(e) {
            map.fitBounds([
            [22.2289, -154.8],[18.948, -159.764]
            ]);
            selectstate();

        });
        $('#usa').click(function(e) {
            map.fitBounds([
            [42.461, -56.979],[32.536, -134.4]
            ]);
            var e = null;
            onClickyhigh();
            selectstate();
        });
    });

function selectstate() {
            if (activedom !== undefined) {
                activedom.setStyle({
                    weight: 1,
                    dashArray: '3',
                    fillOpacity: '0.7'
                });
            } 
}

function onClickyhigh(e) {

//why do i do this???
if (e != null) {
    var layer = e.target.feature;
}
else {
    var layer = statesData.features[51];
};

var expend = document.getElementById('expend');
var statename = document.getElementById('statename');
var legend_name = document.getElementById('legend_name');

//add current value to box at lower left.
///expend.innerHTML = '$' + layer.properties.datapoint[12];
statename.innerHTML = layer.properties.name;


//The below places the lab information into the table.


var tbody = document.getElementById('tbody1');    
while (tbody.firstChild) tbody.removeChild(tbody.firstChild)


var placeholderz = layer.properties.numid - 1;


if (raw[placeholderz][0] == undefined) {
        var tr1 = document.createElement('tr');
        var td1 = document.createElement('td');

        td1.innerHTML = "No Labs in this State";
        tbody.appendChild(tr1);
        tr1.appendChild(td1);   
    } else {
        for (var i = 0; i < raw[placeholderz].length; i++) {    
            var tr1 = document.createElement('tr');
            var td1 = document.createElement('td');     
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');

            td1.innerHTML = raw[placeholderz][i].lab;
            td2.innerHTML = raw[placeholderz][i].state;
            td3.innerHTML = raw[placeholderz][i].money;

            tbody.appendChild(tr1);
            tr1.appendChild(td1);   
            tr1.appendChild(td2);
            tr1.appendChild(td3);
        };
    }




    $('#containerz').highcharts({
        chart: {
            type: 'line',
            marginRight: 10,
            marginLeft: 100,
            marginBottom: 50,
            backgroundColor: null,
            borderRadius: 0        
            },
        title: {
            // floating: true,
            text: 'DOE funding allocation in ' + layer.properties.name,
            style: {
                color: '#ffffff'
            }
        },
        subtitle: {
            text: '2000 - 2012',
            floating: true,
            style: {
                color: '#fff'
            }
        },
        xAxis: {
            categories: [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012],
            tickInterval: 1,
            endOnTick: false,
            startOnTick: false,
            tickPosition: 'inside',
            labels: {
                style: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            min: 0,
            title: {
                text: '',
                style: {
                    color: '#ffffff'
                }   
            },labels: {
                style: {
                    color: '#fff'
                },
                formatter: function () {
                return '$' + Highcharts.numberFormat(this.value/1000000,0) + ' million';
            }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: ''
            }]
        },
        tooltip: {
            valueSuffix: ' dollars',
            borderRadius: 0,
            borderColor: '#444444'
        },
        legend: {
            enabled: false
        },
        series: [{
            name: layer.properties.name,
            data: layer.properties.datapoint,
            color: '#A10341', 
        }],
        plotOptions: {
            line: {
                lineWidth: 4,
                marker: {
                    enabled: false
                },
            }
        }
    });
};

// Create the table

	var tess = [];

	// console.log(dummy[1].state)

	for (var i = 0; i < dummy[1].state.length; i++) {
	  // console.log(dummy[1].state[i])
	  tess.push(dummy[1].state[i])

	};

	// console.log(tess[0] + ", " + tess[1])

	var raw = [];

	for (var h = 0; h < statesData.features.length; h++) {
	  raw.push([]);
	  for (var i = 0; i < dummy.length; i++) {
	    
	    
	    for (var j = 0; j < dummy[i].state.length; j++) {
	      // console.log(dummy[i].state[j])
	      if (statesData.features[h].properties.code === dummy[i].state[j]) {
	        raw[h].push(dummy[i])
	      }
	        
	    };


	  };
	};
	for (var i = 0; i < dummy.length; i++) {
	  raw[51].push(dummy[i])
	};

// Add the points to the map

	var marker = new Array();


    for (var i = 0; i < points.length; i++) {
     //create a the "iconic" url for the icon, from the mapbox api.
     
      var iconic



      // Create custom popup content
       
      /*pushing items into array each by each and then add markers*/
      var LamMarker = new L.marker([points[i].geometry.coordinates[1],points[i].geometry.coordinates[0]], {
        icon: L.icon({
            iconUrl: 'img/80s.png',
            iconSize:     [9, 9], // size of the icon
            iconAnchor:   [4, 4], // point of the icon which will correspond to marker's location
            popupAnchor:  [1, -13]  // point from which the popup should open relative to the iconAnchor
            })
        });
          marker.push(LamMarker);
          map.addLayer(marker[i].bindPopup('<p class="labs_text">' + points[i].properties.facility + '</p>').openPopup());

    };
