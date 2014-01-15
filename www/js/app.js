'use strict';

var myApp = angular.module('MyApp', ['ngTouch', 'ngRoute']);

myApp.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})
		.otherwise({
			redirectTo: '/'
		});
});

myApp.service('CordovaService', ['$document', '$q',
	function ($document, $q) {

		var d = $q.defer(),
			resolved = false;

		this.ready = d.promise;

		document.addEventListener('deviceready', function () {
			resolved = true;
			d.resolve(window.cordova);
		});

		// Check to make sure we didn't miss the
		// event (just in case)
		setTimeout(function () {
			if (!resolved) {
				if (window.cordova) d.resolve(window.cordova);
			}
		}, 3000);
	}]);

myApp.controller('MainController', function ($scope, CordovaService) {
	$scope.cordovaReady = false;
	$scope.photos = [];
	$scope.locationWatchId = null;
	$scope.positions = [];

	CordovaService.ready.then(function () {
		$scope.cordovaReady = true;
	});

	$scope.myAlert = function () {
		var phoneModel = device.model;
		alert(phoneModel);
	};

	$scope.myNotification = function () {
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
	};

	$scope.myTakePhoto = function () {
		function captureSuccess(mediaFiles) {
			for (var i = 0, len = mediaFiles.length; i < len; i += 1) {
				var fullPath = mediaFiles[i].fullPath;
				$scope.photos.push(fullPath);
			}
			$scope.$digest();
		}

		var options = { limit: 1 };
		navigator.device.capture.captureImage(captureSuccess, onError, options);
	};

	$scope.myLocation = function () {
		function onLocationSuccess(position) {
			$scope.positions.unshift(position.coords);
			$scope.$digest();
		}

		function startWatchLocation() {
			var options = { timeout: 30000 };
			$scope.locationWatchId = navigator.geolocation.watchPosition(onLocationSuccess, onError, options);
		}

		function stopWatchLocation() {
			navigator.geolocation.clearWatch($scope.locationWatchId);
			$scope.locationWatchId = null;
		}

		if (this.locationWatchId == null) {
			startWatchLocation.call(this);
		} else {
			stopWatchLocation.call(this);
		}

	};

	function onError(error) {
		alert('code: ' + error.code + '\n' +
			'message: ' + error.message + '\n');
	}

});