Jaanga BVH Reader
=================

Live demo - Saqoosha's format: <http://jaanga.github.io/cookbook/bvh-reader/r1/bvh-reader-saqoosha.html>  
Live demo - CMU Daz format: <http://jaanga.github.io/cookbook/bvh-reader/r1/bvh-reader-saqoosha-cmu-daz.html>  
Live demo - Truebones format: <http://jaanga.github.io/cookbook/bvh-reader/r1/bvh-reader-saqoosha-truebones.html>  
Live demo - Procedure generated bot: <http://jaanga.github.io/cookbook/bvh-reader/r1/procedure-bots.html>  

Blog post: <http://www.jaanga.com/2013/09/bvh-format-to-capture-motion-simply.html>  

###About
The [BVH](http://en.wikipedia.org/wiki/Biovision_Hierarchy) format is probably the most popular free, 
open source method for capturing, saving and replaying human motion data. The Jaanga BVH reader enables you 
to open BVH files either from a server or from a local computer and to replay these files in 3D. 
The app is written with the help of the Three.js library. 
This means that the source code of this app can be used to replay BVH files as part of any Three.js app.

There are issues. The organization that created the BVH format is no longer in existence. 
And no other organization has stepped up to take charge. Thus numerous 'dialects' of BVH exist. 
As you see above there are three apps in the demo. Each app reads a different BVH dialect.

* bvh-reader-saqoosha.html reads the files that Saqoosh uses in his demoas
* bvh-reader-saqoosha-cmu-daz.html reads riles prepareb at Carnagie Mellon University and updated by Bruce Hahne
* bvh-reader-saqoosha-truebones.html reads Truebones files

###Road Map
* Priority: Save and replay data from [Leap Motion](http://leapmotion.com) devices in BVH format
* Identify cusus of gimbal locking, occasional jumps and other display issues 
* Adding skins to the animations
* Ability to view animations frame by frame
* Ability to add and remove frames 


### Copyright, License and Credits
copyright &copy; 2013 Jaanga authors ~ MIT License

See also [Copyright, License and Credits](https://github.com/jaanga/cookbook/blob/gh-pages/bvh-reader/copyright-license-credits.md)  

The Jaanga BVH Reader would not exist without the extraordinary work by [Saqoosha](http://saqoo.sh/a/) 
and this [demo](http://saqoo.sh/a/labs/perfume/3/).  

Have a look at the [source code](http://saqoo.sh/a/labs/perfume/3/scripts/parser.js).
Saqoosha's methods for parsing the data using array.shift and his intricate for loops are coding gems.
His use of jQuery means zero HTML and CSS and 100% JavaScript and DOM 
and turns a complex series of operations into a trivial linear shopping list.

Having said that, Saqoosha's coding skills are way above the level of a normal coder. 
So in order to maintain sanity a good deal of the code in the Jaanga app is in old-school JavaScript function style.

###Links

Papers  
[Skeleton API Considerations for Leap Motion Devices](https://docs.google.com/document/d/1jVB3RP0Xnhp_py0hhbbZ8jZtHW-MSkxbGKEUPWwtMos/edit#heading=h.2cmd03se8bwk)  

BVH Reader Code Samples
It is amusing to compare the elegance of Saqoosha's code with these efforts:  
<https://code.google.com/p/papervision3d/source/browse/trunk/as3/trunk/src/org/papervision3d/objects/parsers/mocap/BVH.as?spec=svn938&r=938>  
<https://github.com/sinisterchipmunk/bvh>


Apps  
http://www.cgspeed.com/  
http://www.bvhacker.com/  

Sources  
http://www.animstreet.com/animations/7106  
http://www.mixamo.com/  
http://freemocap.com/  
http://www.truebones.com/store.html
http://www.turbosquid.com/Search/Motion-Capture/hand/bvh  


###Change Log

2013-09-05 ~ Theo
* Folders and files added to Cookbook repo