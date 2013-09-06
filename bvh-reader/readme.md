Jaanga BVH Reader
=================

Live demo - Saqoo's format: http://jaanga.github.io/cookbook/bvh-reader/r1/bvh-reader-saqoosha.html
Live Demo - CMU Daz format: http://jaanga.github.io/cookbook/bvh-reader/r1/bvh-reader-saqoosha-cmu-daz.html
Live demo - Truebones format: http://jaanga.github.io/cookbook/bvh-reader/r1/bvh-reader-saqoosha-truebones.html

###About
The [BVH](http://en.wikipedia.org/wiki/Biovision_Hierarchy) format is probably the most popular free, 
open source method for capturing, saving and replaying human motion data. The Jaanga BVH reader enables you 
to open BVH files either from a server or from a local computer and to replay these files in 3D. 
The app is written with the help of the Three.js library. 
This means that the source code of this app can be used to replay BVH files as part of any Three.js app.

There are issues. The organization that created the BVH format is no longer in existence. 
And no other organization has stepped up to take charge. Thus numerous 'dialects' of BVH exist. 
As you see above there are three apps in the demo. Each app can read a different BVH dialect.



### Copyright, License and Credits
copyright &copy; 2013 Jaanga authors ~ MIT License

See also [Copyright, License and Credits]()

The Jaanga BVH Reader would not exist without the extraordinary work by [Saqoosha](http://saqoo.sh/a/) 
and this [demo](http://saqoo.sh/a/labs/perfume/3/).  
Have a look at the [source code](http://saqoo.sh/a/labs/perfume/3/scripts/parser.js).
Saqoosha's methods for parsing the data using array.shift and his intricate for loops are coding gems.
His use of jQuery means zero HTML and CSS and 100% JavaScript and DOM 
and turns a complex series of operations into a trivial linear shopping list.

Having said that, Saqoosha's coding skills are way above the level of a normal coder. 
So in order to maintain sanity a good deal of the code in the Jaanga app is in old-school JavaScript function style.

###Links


###Change Log

2013-09-05 ~ Theo
* Folders and files added to Cookbook repo