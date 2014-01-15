hello-cordova
=============

Experiments with http://cordova.apache.org


Initial setup
-------------

After clone the repository you must run this script to install dependencies (you must have installed cordova and bower before)

```
#!/bin/sh

[ -d ./platforms ] || mkdir ./platforms

cordova platform add android;

cordova plugins install org.apache.cordova.file;
cordova plugins install org.apache.cordova.media-capture;
cordova plugins install org.apache.cordova.media;
cordova plugins install org.apache.cordova.geolocation;
cordova plugins install org.apache.cordova.device;
cordova plugins install org.apache.cordova.camera;
cordova plugins install org.apache.cordova.vibration;
cordova plugins install org.apache.cordova.dialogs;

bower install
```
