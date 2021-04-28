var customLabel = {
    campground: {
        label: 'C'
    },
    park: {
        label: 'P'
    }
};

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 32.7766642,
            lng: -96.79698789999999
        },
        zoom: 8
    });
    var infoWindow = new google.maps.InfoWindow;

    $.ajax({
        type: "GET",
        url: "get_parks.php",
        cache: "false",
        dataType: "json",
        success: function (result) {
            createMarker(result);
        },
        error: function (error) {
            alert("Error getting data from PHP")
        }
    })

    function createMarker(data) {
        Array.prototype.forEach.call(data, function (datapoint) {
            var name = datapoint.name;
            var address = datapoint.address;
            var type = datapoint.type;
            var point = new google.maps.LatLng(
                parseFloat(datapoint.lat),
                parseFloat(datapoint.lng));

            var infowincontent = document.createElement('div');
            var strong = document.createElement('strong');
            strong.textContent = name
            infowincontent.appendChild(strong);
            infowincontent.appendChild(document.createElement('br'));

            var text = document.createElement('text');
            text.textContent = address
            infowincontent.appendChild(text);
            var icon = customLabel[type] || {};
            var marker = new google.maps.Marker({
                map: map,
                position: point,
                label: icon.label
            });
            marker.addListener('click', function () {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);
            });
        });
    }
}



