Rubik's Cube
===

## Mission

To present methods for manipulating positions and orientations of multiple objects in Three.js using a colorful and easily identifiable context

## Rubik's Cube R1

[Web page view]( http://jaanga.github.io/cookbook/rubiks-cube/rubiks-cube-r1.html "View as live web page" ) &mdash; 
[Source code view]( https://github.com/jaanga/cookbook/tree/gh-pages/rubiks-cube/rubiks-cube-r1.html "View as source code" )

First release. Cublets are manipulated by adding them as children to a parent object which is then rotated. This approach automatically updates cublet positions. After each rotation cublets must be removed from the parent and added back to the scene. This requirs an explict update of cublet materials with the 'recolor()' function.
