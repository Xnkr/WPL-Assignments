var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {
            lat: 32.7766642,
            lng: -96.79698789999999
        }
    });
    var GeocodeMap = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(GeocodeMap, map);
    });
}

function geocodeAddress(GeocodeMap, resultsMap) {
    var address = document.getElementById('address').value;

    GeocodeMap.geocode({
        'address': address
    }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var placesMark = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
            var placesService = new google.maps.places.PlacesService(resultsMap);
            var geoLocation = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            };

            console.log(geoLocation);
            placesService.nearbySearch({
                location: geoLocation,
                radius: 150000,
                type: ['park']
            }, callback);
        } else
            alert('Geocode throws an error due to: ' + status);
    });
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++)
            marks(results[i]);
    }
}

function marks(place) {
    var placesMark = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    
    google.maps.event.addListener(placesMark, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}