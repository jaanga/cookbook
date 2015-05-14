[Drawing on Heightmap Read Me]( index.html )
===
![Drawing on HeightMap]( https://pbs.twimg.com/media/CE4Y4vgWoAAGywa.png )  
[Image from Lindsay Kay's tweet]( https://twitter.com/xeolabs/status/598443164677099520/photo/1?cn=ZmF2b3JpdGVfbWVudGlvbmVkX3VzZXI%3D )

Built in response to Lindsay Kay's question on WebGL Dev at Google Groups:

[Techniques for drawing lines, with mouse, on 3D objects in WebGL or OpenGL?]( https://groups.google.com/forum/#!topic/webgl-dev-list/PXqD9AdO7og )

### Road Map

In the unlikely event that a further revision is built, the following two items indicate good places to start: 

1. With every update, the current face mesh is deleted from the scene and an entire new face mesh is created and added to the scene.
This is OK when you are using height maps for terrain - the normal usage for heightmaps - because terrain does no tend to change much. 
But in this instance - where you want real-time updates - the process is too slow and a scheme where only the vertices in play are updated would be preferable.

2 The two lines of code used to position where to draw on the canvas were plucked out of thin air - and it looks like very thin air.
A nice routine - probably with atan2 - needs to be implemented.

		angleYX = 150 - 150 * ( Math.atan( p.y / p.x ) + pi / 2 ) / pi;
		angleXZ = 150 - 150 * ( Math.atan( p.z / p.x ) + pi / 2 ) / pi;

### Change Log

2015-05-14 ~ Theo

* R2 
* Add link to read me
* Minor code clean up
	* onDocumentMouseDown simplified
	* drawHeightmap simplified
* Updates to this read me


2015-05-06 ~ Theo 

* R1

