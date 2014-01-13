/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    onError: function (error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    },

    myAlert: function () {
        var phoneModel = device.model;
        alert(phoneModel);
    },

    myNotification: function () {

        function callback() {
            console.log('alert dimissed');
        }

        navigator.notification.alert(
            'It works!',  // message
            callback,         // callback
            '3...2...1',            // title
            ':)'                  // buttonName
        );

        var milliseconds = 1000;
        navigator.notification.vibrate(milliseconds);
    },

    myTakePhoto: function () {
        function captureSuccess(mediaFiles) {
            var canvasDiv = document.getElementById('canvas');

            for (var i = 0, len = mediaFiles.length; i < len; i += 1) {
                var img = new Image();
                img.className = 'thumb';
                img.src = mediaFiles[i].fullPath;

                img.onclick = function () {
                    alert('show photo');
                    window.location = img.src;
                }

                canvasDiv.appendChild(img);
            }
        }

        var options = { limit: 1 };
        navigator.device.capture.captureImage(captureSuccess, this.onError, options);
    },

    locationWatchId: null,
    myLocation: function () {
        function onLocationSuccess(position) {
            var element = document.getElementById('geolocation');
            element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                'Longitude: ' + position.coords.longitude + '<br />' +
                '<hr />' + element.innerHTML;
        }

        function startWatchLocation() {
            document.getElementById('geolocation').style.display='block';
            var options = { timeout: 30000 };
            this.locationWatchId = navigator.geolocation.watchPosition(onLocationSuccess, this.onError, options);
            console.log("locationWatchId=" + this.locationWatchId);
        }

        function stopWatchLocation() {
            document.getElementById('geolocation').style.display='none';
            navigator.geolocation.clearWatch(this.locationWatchId);
            this.locationWatchId = null;
        }


        console.log('current locationWatchId = ' + this.locationWatchId );
        if(this.locationWatchId==null) {
            startWatchLocation.call(this);
        } else {
            stopWatchLocation.call(this);
        }

    }
};
