Jaanga Star Spotter Read Me
===
 
<span style=display:none; >[View as web page]( http://jaanga.github.io/cookbook/star-spotter/index.html "view the files as apps." ) </span>  

<iframe src=http://jaanga.github.io/cookbook/star-spotter/latest/index.html width=640 height=480 ></iframe>  
Fullscreen latest: [Jaanga Star Spotter]( http://jaanga.github.io/cookbook/star-spotter/latest/index.html )

Dedication: To Paul and David for a delightful dinner and for spurring me to do this 

<input type=button value='Source code on GitHub' onclick=window.location.href='https://github.com/jaanga/cookbook/tree/gh-pages/star-spotter'; />

## Concept

People have been charting heavenly bodies and their attributes since the beginning of humankind. 
But these efforts has been fraught with difficulty, have covered small numbers of bodies and require much learning

### Vision

To show that - using modern technology - creating a real-time 3D [orerry]( http://en.wikipedia.org/wiki/Orrery ) is easy-peasy

### Mission

To create an interactive view of the universe with a small amount of easy to read code i the hopes that people with real knowledge of astronomy will feel like pitching in.  


## Attributions

Star data courtesy of:

* <http://www.astronexus.com/hyg>

* <https://github.com/astronexus/HYG-Database>

Thank you David Nash!

## Road Map

* Link each object to online databases such as: <http://heasarc.gsfc.nasa.gov/W3Browse/star-catalog/sao.html?
* Currently the 'Time travel' slider updates star positions in a mostly arbitrary manner. Future revisions:
	* Tie movements to specific time periods and, for example, display the date of the current positions
	* Also be able to show apparent movement around Sol for any specific date
* Currently, color is tied to an arbitrary element. Future revisions:
	* Tie color, size, alpha and other visual attributes to arbitrary star attributes as selected by the user
	* Needs default value is no data for a star of star data is a huge outlier
	* Needs to know the bell curve of typical values
* Permalink capability to provide ability to zoom to any star
	* target and camera x, y, z
	* sprite type
* Link to and from scrollable/searchable ASCII table with the same data items
* Add Level of Detail and logarithmic zooming capabilities
	* Zoom out to many more distant objects
	* Zoom into many more objects within our solar system 
* Add DSO csv file objects
* Add solar system objects


## Issues

* Time travel freezes after First Persom camera invoked

## Change Log

* 2015-05-17 ~ Theo

* Add First Person Camera
	* With freeze camera checkbox
* Add random frustums / frusta?
	* To demo what frustums indicating the volumes of various constellations


2015-05-10 ~ Theo

* Fixed: Sprite bitmap backgrounds not transparent
	* Thanks to contribution by @paulmasson


2015-05-09 ~ Theo

* [Star Spotter R3]( http://jaanga.github.io/cookbook/star-spotter/r3/star-spotter-r3.html )
	* Moves over to BufferGeometry
		* Enables each particle to have own attributes such as color and size
	* Adds name placards

* [Star Spotter R2]( http://jaanga.github.io/cookbook/star-spotter/r2/star-spotter-r2.html )
	* code clean-up
	* adds choice of sprites


2015-05-06 ~ Theo

* [Star Spotter R1]( http://jaanga.github.io/cookbook/star-spotter/r1/star-spotter.html )
	* First commit
	* Looad 119k+ stars
	* Zoom, pan and rotate
	* Built in a few hours