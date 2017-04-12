    var elevator;
    var Data = [];
    var map;
    var xmlhttp = new XMLHttpRequest();
    //json format data resource url 
    var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();




function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: {lat: 41.870800, lng:  -87.650500},
    zoom: 12
  };


  map = new google.maps.Map(mapCanvas, mapOptions);

}


 xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var myArr = xmlhttp.responseText;
            var text = myArr;
            json = JSON.parse(text);
       
            for (var i = 0; i<263; i++) {
                var dataRental = [];
                //latitude - 0
                dataRental.push(json.data[i][19]);
                //longitude - 1
                dataRental.push(json.data[i][20]);
                //adress
                dataRental.push(json.data[i][12]);
                //number
                dataRental.push(json.data[i][14]);
                //community area name 
                dataRental.push(json.data[i][8]);
                //property name
                dataRental.push(json.data[i][11]);
                //management company
                dataRental.push(json.data[i][15]);

                Data.push(dataRental);
            };
            //alert(Data);
            //number of the markets
            var numberOfMarkets = Data.length;

            //add markers on the map
            var markers = [];
            google.maps.event.addListener(map, 'idle', function() {
            // Create an ElevationService
            elevator = new google.maps.ElevationService();
            $.each(markers, function(key, value)
            {
                value.setMap(null);
            });
            // getting bounds of current location
            var boundBox = map.getBounds();
            var southWest = boundBox.getSouthWest();
            var northEast = boundBox.getNorthEast();
            var lngSpan = northEast.lng() - southWest.lng();
            var latSpan = northEast.lat() - southWest.lat();
            // adding 20 markers to the map at random locations
            var locations = [];
            for (var j = 0; j < numberOfMarkets; j++)
            {
                var location = new google.maps.LatLng(
                        southWest.lat() + latSpan * Math.random(),
                        southWest.lng() + lngSpan * Math.random()
                        );
                locations.push(location);
            }

            // Create a LocationElevationRequest object using the array's one value
            var positionalRequest = {
                'locations': locations
            };

            elevator.getElevationForLocations(positionalRequest, function(results, status)
            {
                if (status === google.maps.ElevationStatus.OK)
                {
                    //if the infowindow is open
                    var prev_infowindow =false;

                    $.each(results, function(key, value) {

                        //alert(key);
                        markers[key] = new google.maps.Marker({
                            position: {lat: Number(Data[key][0]), lng: Number(Data[key][1])},
                            map: map,
                            //icon: 'http://google-maps-icons.googlecode.com/files/red' + ('0' + key.toString()).slice(-2) + '.png'
                        });
                     
                    });
                }
            });
        
        });

        }
    };