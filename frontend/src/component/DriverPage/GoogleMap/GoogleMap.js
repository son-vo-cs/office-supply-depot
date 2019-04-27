import React, {Component} from 'react';
import './GoogleMap.css'


export default class GoogleMap extends Component{

    state = {
        center: { lat: 37.335141, lng: -121.881093 },
        addresses: this.props.addresses,
        warehouse: null,
        warehouse1: "1 Washington Sq, San Jose, CA 95192",
        warehouse2: "500 El Camino Real, Santa Clara, CA 95053"

    };

    componentDidMount() {
        this.renderMap();
    }

    renderMap = () => {
        loadScript(
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDc74IQbxDTgM54Dnk8SLb3Cr5yty2xz-c&callback=initMap"
        );

        window.initMap = this.initMap;

    };

    initMap = () => {
        //let init_pos = { lat: 37.335141, lng: -121.881093 };
        const directionsService = new window.google.maps.DirectionsService();
        const directionsDisplay = new window.google.maps.DirectionsRenderer();
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: this.state.center,
        });

        var test = null;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var new_pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                // test = new_pos;
                //
                console.log("inner new pos", new_pos);
                // console.log("inner test", test);
                let myposwindow = new window.google.maps.InfoWindow();
                myposwindow.setContent("You are here");
                myposwindow.setPosition(new_pos);
                myposwindow.open(map, this);
                map.setCenter(new_pos);

            });
        }
        else {
            alert("Browser does not support geolocation");
        }
        // console.log("outter test", test);

        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
        window.google.maps.event.trigger(map, 'resize');
    };



    calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
        var address = this.state.addresses;
        var ware = this.state.warehouse;
        console.log(address);
        navigator.geolocation.getCurrentPosition(function(position) {
            var new_pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var currentLocation = new_pos;
            address.unshift(currentLocation);

            const request = {
                waypoints: [],
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
            };


            // Assume warehouse only contain: warehouse1 or warehouse2 

            if(ware == 1)  // stop by warehouse 1
            {
                request.origin = this.state.warehouse1;
                request.destination = this.state.warehouse1;
            }
            else if(ware == 2) // stop by warehouse 2
            {
                request.destination = this.state.warehouse2;
                request.destination = this.state.warehouse2;
            }
           
            /*
            console.log("passed addresses",address);
            // process array of addresses
            for(var i = 0; i < address.length; i++)
            {
                // set origin = current location
                if (i === 0) request.origin = address[i];
                // set destination
                else if (i === address.length - 1) request.destination = address[i];
                // set waypoint addresses
                else {
                    request.waypoints.push({
                        location: address[i],
                        stopover: true
                    });
                }
            }
            console.log("waypoints",request.origin);
            */


            console.log("passed addresses",address);
            for(var i = 0; i < address.length; i++)
            {
                request.waypoints.push({
                location: address[i],
                stopover: true
                });
            }
            console.log("waypoints",request);

            var a = [];

            // takes request.waypoints[origin ... destination] returns result.routes[0].waypoint_order[...]
            directionsService.route(request, function(result, status) {
                if (status === window.google.maps.DirectionsStatus.OK)
                {
                    a = result.routes[0].waypoint_order;
                    console.log(a);
                    //directionsDisplay.setDirections(result);
                }
                else
                {
                    window.alert('Request failed due to ' + status);
                }
            });})

            

            

    };


    render() {
        return (
            <div>
                <div id="map" />
                <div id="right-panel" />

            </div>
        );
    }
}

function loadScript(url) {
    let index = window.document.getElementsByTagName("script")[0];
    console.log(index);
    let script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
    console.log(window.document.getElementsByTagName("script")[0]);
    console.log(window.document.getElementsByTagName("script")[1]);
}

