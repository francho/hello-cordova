hello-cordova
=============

Experiments with http://cordova.apache.org


Initial setup
-------------

After clone the repository you must run this script to install dependencies (install cordova and bower before)

```
#!/bin/sh

[ -d ./platforms ] || mkdir ./platforms

cordova platform add android;

cordova plugin add org.apache.cordova.file;
cordova plugin add org.apache.cordova.media-capture;
cordova plugin add org.apache.cordova.media;
cordova plugin add org.apache.cordova.geolocation;
cordova plugin add org.apache.cordova.device;
cordova plugin add org.apache.cordova.camera;
cordova plugin add org.apache.cordova.vibration;
cordova plugin add org.apache.cordova.dialogs;

bower install 
```
