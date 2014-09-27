Video Folding Polygons
===
[Web page version]( http://jaanga.github.io/cookbook/video-folding-polygons/)
[Source code version]( https://github.com/jaanga/cookbook/tree/gh-pages/video-folding-polygons/ )


See also blog post: <http://www.jaanga.com/2013/09/folding-polygons-naughty-way-in-3d-with.html>

The following demos arise from a conversation with ArtS, a resident of Menlo Park, CA, held over a lunch on 2013-09-01. 
We talked of displaying video on folding polygons - which are things that look like the images in the link provide by Art to this book: <http://graphics.berkeley.edu/papers/Iben-RPP-2006-06/>.
Basically, if you like origami then you like folding polygons. 

Many of the discussions on folding polygons relate to morphing the polygons on a 2D plane 
such that no vertex is 'naughty' and crosses over or intersects anybody else's line.

This is certainly fun stuff. But even more fun - or fun in a different way - is the exploration of 'naughty' folding and 3D folding. 
The following demos begin to explore the naughty bits.

Demo:  
<http://jaanga.github.io/cookbook/video-folding-polygons/r1/video-folding-polygons-5x5.html>

A version of the Three.js demo:  
<http://mrdoob.github.io/three.js/examples/#webgl_materials_video>  
The code is greatly simplified, and made suitable for being used as boilerplate for further apps/  

Demo: <http://jaanga.github.io/cookbook/video-folding-polygons/r1/video-folding-polygons-pixelated.html>  

Question: can you make a video with holes in it? This app shows the answer is 'yes!'  

The fun thing here is the array that is used to layout the position of the holes. See below - if you look carefuly you can see the word 'Art' spelled out. 
Now is that the Art I had lunch with or is it that thing that people do with chemicals and brushes? Who knows.

You can see that the array is laid out as 20 x10 grid - just as  the cubes in the grid are laid out. A 1 indicates inserting the cube. A 0 indicates leaving the cube out. 
I enjoyed this cute, ever so simple 'Art'istic method for creating a 'pixelated' video.

		var pixels = [
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
			1,1,1,1,0,1,1,1,0,0,0,1,1,0,0,0,0,0,1,1,
			1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,0,1,1,1,1,
			1,1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,1,1,
			1,1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,1,1,
			1,1,0,0,0,0,0,1,0,0,0,1,1,1,1,0,1,1,1,1,
			1,1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,1,1,
			1,1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,1,1,
			1,1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1,1,1,1,
			1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
		];

Demo: <http://jaanga.github.io/cookbook/video-folding-polygons/r1/video-folding-polygons-deformed-planes.html>  

This is the actual 'naughty' folded polygon demo. You will note that the 'teeth are splayed out in 3D 
but if they were laid out flat the teeth would intersect.
You could not cut this thing out of a single sheet of paper. 
And then again, even if you could, you might also have some trouble displaying video on the impossibly cut sheet of paper.

###Copyright and License
Copyright &copy; 2013 Jaanga authors

MIT License

###Change Log


* Folders and files created





