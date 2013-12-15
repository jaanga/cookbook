unFlatland Read Me
==================

Live demo R4: http://jaanga.github.io/cookbook/un-flatland/r4/index.html  

## Concept
The fastest, smallest, sweetest 3D Map code you ever did see.

## Features

* Covers every part of the world that [OSM]( http://www.openstreetmap.org/ ) covers - matches [Slippy Map]( http://wiki.openstreetmap.org/wiki/Slippy_Map )
* Works in your browser  - no plugin required
* Runs locally or from static file server
* Supports real-time zoom, pan and rotate
* Generic 3D library - can be used with other apps and libraries
* FOSS, built with less than 500 lines of code
* Very small file size ~ you can easily open up and start hacking
* Fast enough to be usable
* Easy to build your own place lists
* Supports large user-defined gazette
* Supports many 2D map overlays


## Issues Bugs

Works only in Chrome (for now)
Dropdown list items only update when you change city
* First person controller: Mouse actions only work when initiated from top of screen. Should work from anywhere
* Trackball controller: after you return from first person controller drop downs no longer work. Must reload page to make changes.

## Road Map

* 3D placards that show place names
* FGx edition: showing Crossfeed aircraft in 3D
* FGx edition: First person controller displays selected aircraft in front of camera
* FGX edition: places dropdown lists the airports. 
* FGx edition: cameras can be located at ATC position of current airport

## Terrain Elevation Bitmaps.

unFlatland uses bitmaps to store terrain elevation data. The color of the pixel is linked to a table that list the altitude indicated for each color.
The X and Y position of the pixel correspond to the longitude and latitude of the indicated location.
The intention is that unFlatland follows all [Slippy Map tile convections]( http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames).
Wherever Slippy Map has a tile with its 2D data, unFlatland should supply a corresponding tile with elevation data.
Of course, neither the Slippy Map providers nor the terrain bitmaps can supply data for ever square nanometer of the world, so interpolation is required.
Given that unFlatland is new, it has to more interpolating.
Thus, for Revision 1 there are only 64 bitmaps corresponding to Slippy Map zoom level 4.  
To make matters even worse, there is so much data on each of these bitmaps that, if you attempt to display zoom level 4 (or 5 or 6) that you will bring your computer to a halt.
Currently, unFlatland is set to interpolate elevation data between zoom levels 7 to 12.
Learning how to reprocess the zoom level 4 bitmaps so they cover levels 1 through 6 should take not much more than a few days.
Sourcing the data so that elevations work well between zoom levels, say, 10 to 14 or higher is going to take some research, collaboration and scheming.
Obtaining and making available to the world terrain elevation bitmaps that work well down to zoom level 14 or so is very doable even by a group of amateurs.
Such data, if readily available in locations such as GitHub, will change cartography forever.


## Links

_See also history of the word '[flatland](http://en.wikipedia.org/wiki/Flatland)'_

Question: Can we get this down to 50 metre detail?  

Live demo R2: http://jaanga.github.io/cookbook/un-flatland/r2/index.html  

Live demo  R1: http://jaanga.github.io/cookbook/un-flatland/r1/index.html  

See also: http://jaanga.github.io/events/sf-webgl-2013-06-26/  


## System Requirements

The code on this site makes extensive use of the latest and most demanding Internet technologies - including HTML 5 and WebGL and HTML.

In order to view the files or run the apps on this web site you will need a device and browser that provides good support for [WebGL](http://get.webgl.org/).
WebGL is the JavaScript API for rendering interactive 3D graphics and 2D graphics within any compatible web browser without the use of plug-ins. 

Hardware: Generally WebGL support requires a computer with an Intel Core i5 processor or better with an external GPU such as one made by Nvidia or AMD. 
Successful use of the apps on a phone or tablet is highly unlikely. A computer that is good for heavy gaming is a likely to be satisfactory.
A mouse or other pointing device with a scroll wheel is also highly recommended so that you can zoom, pant and rotate in 3D.

Browser Support: The apps here may work with the FireFox or Opera browsers, but most likely will not work with Safari or Internet Explorer. 
The apps here are currently being and tested with the Google Chrome browser. 
Bugs on browsers other than Chrome need not be reported until such as the work settles down and an effort to support more browsers is initiated.

## Copyright and License
copyright &copy; 2013 Jaanga authors ~ All work herein is under the [MIT License](http://jaanga.github.io/libs/jaanga-copyright-and-mit-license.md)

## Change Log

2013-12-14 ~ Theo

* Code clean up
* Help info added to
* Read me file added to


2013-12-13 ~ Theo

* R4 Added
* Name space added
* place names from external file
* More overlay map choices
* Code clean up
* Select zoom levels
* Help screen added

