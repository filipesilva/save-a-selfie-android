save-a-selfie-android
=====================

Android app for [Save-a-Selfie](http://iculture.info/saveaselfie/). Save
a Selfie is an interactive mobile application that has been designed and
developed to help members of the public pinpoint the location of
emergency equipment in their local community.

Architecture
------------

The app is done in [Ionic](http://ionicframework.com/), which is a
framework for mobile applications using
[AngularJS](https://angularjs.org/) and
[Cordova](http://cordova.apache.org/). [Phonegap
Build](https://build.phonegap.com/) is also used for creating the builds
(WIP).

On the Angular side, [John Papa's style
guide](https://github.com/johnpapa/angularjs-styleguide) is overall
used. It's important to note that the code is organized in modules,
mostly to keep it somewhat organized and make it easier to add new parts
of the app. The main modules are the photo, locate. Their folders will
be mostly self-contained, with all files for that feature in there. The
common folder contains code that will be used by more than one feature.

Cordova plugins will be interfaced via
[ngCordova](http://ngcordova.com/) for easy of use.

Also before pushing code, a
[Plato](https://github.com/es-analysis/plato) report should be ran, to
make sure everything is ok enough.

Development setup
-----------------

This project uses a couple of global npm packages. You can install all
of them at once by running the following command:

    npm install -g cordova ionic bower plato

Now you have to add js dependencies and restore cordova plugins:

    bower install
    cordova restore plugins --experimental

Finally, you can run ionic in the browser by doing `ionic serve --labs`,
which will open a browser window showing side by side comparison of how
the app looks like in Android and iOS.

To generate a Plato report do `plato -r -d report www/js`, and then open
up `report/index.hml` to see it.

Building for each platform locally is a bit harder, and to understand it
better there's really no other option than to read the [platform
guides](http://cordova.apache.org/docs/en/4.0.0/guide_platforms_index.md.html#Platform%20Guides).
Basically, you need to install the sdk for the platform prior to
building it, and then you can build the app for emulator or real device.
