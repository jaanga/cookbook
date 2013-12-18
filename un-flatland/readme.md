unFlatland Read Me
==================

Live demo: [UnFlatland]( http://jaanga.github.io/cookbook/un-flatland/latest.html )

For an amusing applied use of this technology see: [FGx Plane Spotter]( http://fgx.github.io/fgx-plane-spotter/latest.html )

For Leap Motion device enabled and earlier versions see: [Flying Leap 3D]( https://github.com/jaanga/gestification/tree/gh-pages/projects/flying-leap-3d )

## Concept
The fastest, smallest, sweetest 3D Map code you ever did see.

## Project Links

You have two ways of viewing the FGx Plane Spotter files:

* Code hosted on GitHub: [jaanga.github.io]( http://jaanga.github.io/un-flatland/ "view the files as apps." ) <input value="<< You are now probably here." size=28 style="font:bold 12pt monospace;border-width:0;" >  
* Source code on GitHub: [github.com/jaanga]( https://github.com/jaanga/cookbook/tree/gh-pages/un-flatland/ "View the files as source code." ) <scan style=display:none ><< You are now probably here.</scan>


## Features

* Covers every part of the world that [OSM]( http://www.openstreetmap.org/ ) covers - matches [Slippy Map]( http://wiki.openstreetmap.org/wiki/Slippy_Map )
* Works in your browser  - no plugin required
* Runs files locally or sourced from a static file server - such as [GitHub Pages]( http://pages.github.com/ )
* Supports real-time zoom, pan and rotate
* Toggle between two types of camera controllers: first person or trackball
* Easy to build your own place lists
* Supports large user-defined gazette
* Toggle 3D placards that show place names
* Supports many 2D map overlays
* Generic 3D library - can be used with other apps and libraries
* FOSS, built with less than 500 lines of code
* Very small file size ~ you can easily open up and start hacking
* Fast enough to be usable


## Issues Bugs

* <s>~~Works only in Chrome~~</s> fixed
* <s>~~Dropdown list items only update when you change city~~</s> fixed
* <s>~~First person controller: Mouse actions only work when initiated from top of screen. Should work from anywhere.~~</s> Fixed
* <s>~~Trackball controller: after you return from first person controller drop downs no longer work. Must reload page to make changes.~~</s> Fixed stupidly: reload page
* Elevation drops to naught on one side
* Go to lat/long then change scale: goes to previous location


## Road Map

* Add and remove tiles as needed
* Can we get this down to 50 metre detail?  


## Terrain Elevation Bitmaps

unFlatland uses bitmaps to store terrain vertical elevation data. The color of the pixel is linked to a table that list the altitude indicated for each color.
The X and Y position of the pixel in the bitmap corresponds to the longitude and latitude of the indicated location.
Further background on this technique may be found at Jaume Sánchez's  "[Blocky Earth](http://www.clicktorelease.com/code/blocky_earth/)" and Bjørn Sandvik's tutorial at [Textural terrains with three.js](http://blog.thematicmapping.org/2013/10/textural-terrains-with-threejs.html).

This techniques creates actual 3D geometry that can cast shadows and things can bump into. 
It should nor be confused with [bump mapping]( http://en.wikipedia.org/wiki/Bump_mapping ) - a process that simulates 3D user shaders.

Apart from the 3D data is is useful to overlay the terrain with geographical features such as road maps and satellite photos.
The intention is that unFlatland follows all [Slippy Map tile conventions]( http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames).
Wherever Slippy Map has a tile with its 2D data, unFlatland should supply a corresponding tile with terrain elevation data.
Of course, neither the Slippy Map providers nor the terrain bitmaps can supply data for ever square nanometer of the world, so interpolation is required.

Given that unFlatland is new and the dataset is very rudimentary, it has to much interpolating.
For Revision 1 there are only 64 bitmaps corresponding to Slippy Map zoom level 4.
To make matters even worse, there is so much data on each of these bitmaps that, if you attempt to display zoom level 4 (or 5 or 6) that you will bring your computer to a halt.
Currently, unFlatland is set to interpolate elevation data between zoom levels 7 to 12.

Learning how to reprocess the zoom level 4 bitmaps so they cover levels 1 through 6 should take not much more than a few days.
Sourcing the data so that elevations work well between zoom levels, say, 10 to 14 or higher is going to take some research, collaboration and scheming.
Obtaining and making available to the world terrain elevation bitmaps that work well down to zoom level 14 or so is very doable even by a group of amateurs.

Even such moderately detailed terrain elevation bitmap data, if readily available in locations such as GitHub, will change cartography forever - because it will make it easier than ever before for even beginning programmers to create 3D mapping apps.


## Links

_See also the very interesting history of the word '[flatland](http://en.wikipedia.org/wiki/Flatland)'._

Older unFlatland versions:

[Live demo R3](http://jaanga.github.io/cookbook/un-flatland/r2/index.html )

[Live demo R2]( http://jaanga.github.io/cookbook/un-flatland/r3/index.html)

See also the post on Jaanga.com: <http://jaanga.github.io/events/sf-webgl-2013-06-26/>


## System Requirements

The code on this site makes extensive use of the latest and most demanding Internet technologies - including HTML 5 and WebGL and HTML.

In order to view the files or run the apps on this web site you will need a device and browser that provides good support for [WebGL](http://get.webgl.org/).
WebGL is the JavaScript API for rendering interactive 3D graphics and 2D graphics within any compatible web browser without the use of plug-ins. 

Hardware: Generally WebGL support requires a computer with an Intel Core i5 processor or better with an external GPU such as one made by Nvidia or AMD. 
Successful use of the apps on a phone or tablet is highly unlikely. A computer that is good for heavy gaming is a likely to be satisfactory.
A mouse or other pointing device with a scroll wheel is also highly recommended so that you can zoom, pant and rotate in 3D.

Browser Support: The apps here are currently being and tested with the Google Chrome browser.
The apps here may work with the FireFox or Opera browsers, but most likely will not work with Safari or Internet Explorer.
Bugs on browsers other than Chrome need not be reported until such as the work settles down and an effort to support more browsers is initiated.


## Copyright and License
copyright &copy; 2013 Jaanga authors ~ All work herein is under the [MIT License](http://jaanga.github.io/libs/jaanga-copyright-and-mit-license.md)


## Credits
This app is at an early and volatile stage. Not all licensing requirements may have been fully met let alone identified. It is the intension of the authors to play fair and all such requirements will either be met or the feature in question will turned off.

[
GTOPO30 Topography - On-Line Map Construction Tool](http://www.serg.unicam.it/Gtopo30.htm )


<p><a href="http://openstreetmap.org/copyright" target="_blank">Open Street Map</a><br />copyright &copy; OpenStreetMap contributors</p>

<!--
<p><a href="http://jquery.org/license" target="_blank">jQuery<br /></a>copyright &copy; The jQuery Foundation</p>
<p><a href="https://github.com/jquery/jquery-ui/blob/master/MIT-LICENSE.txt" target="_blank">jQuery UI</a><br />Copyright &copy; 2013 jQuery Foundation and other contributors</p>
-->

<p><a href="http://mrdoob.github.io" target='_blank'>Three.js</a><br>Copyright &copy; 2010-2013 three.js authors</p>
<p>In the course of preparing this app, data has been obtained via several servers including:</p>

<p><a href="http://www.earthtools.org/" target="_blank">earthtools.org/</a></p>

<p><a href="http://www.usgs.gov/" target="_blank">usgs.gov</a></p>

<p><a href="http://www.gpsvisualizer.com/elevation.html" target="_blank">gpsvisualizer.com</a></p>

<p><a href="https://developers.google.com/maps/" target="_blank">developers.google.com/maps/</a></p>

And many thanks to:

<p><a href='http://github.com' target='_blank'>GitHub</a></p>

<p><a href="http://stackoverflow.com" target='_blank'>Stack Overflow</a></p>

The JavaScript DOM

Jaume Sánchez and his "[Blocky Earth](http://www.clicktorelease.com/code/blocky_earth/)" for giving me the idea that elevations are obtainable and you can do reverse Mercator projections.

And also to Bjørn Sandvik and his tutorial at [Textural terrains with three.js](http://blog.thematicmapping.org/2013/10/textural-terrains-with-threejs.html).

See also and in particular <a href="http://fgx.github.io" target="_blank">FGx on GitHub</a> which has been the cause and the impetus for this work.


## Change Log

2013-12-17 ~ Theo

* Expanding Read Me
* Added index.html and latest.html

2013-12-15 ~ Theo

* R4.1
* Adds toggle to display placards with nearby place names

2013-12-14 ~ Theo

* Code clean up
* Help info added to
* Read me file added to
* Numerous bug fixes: works in FF. Mouse OK


2013-12-13 ~ Theo

* R4 Added
* Name space added
* place names from external file
* More overlay map choices
* Code clean up
* Select zoom levels
* Help screen added

