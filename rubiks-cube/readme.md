Rubik's Cube
===

## Mission

To present methods for manipulating positions and orientations of multiple objects in Three.js using a colorful and easily identifiable context

## Rubik's Cube R1

[Web page view]( http://jaanga.github.io/cookbook/rubiks-cube/rubiks-cube-r1.html "View as live web page" ) &mdash; 
[Source code view]( https://github.com/jaanga/cookbook/tree/gh-pages/rubiks-cube/rubiks-cube-r1.html "View as source code" )

Cubelets are manipulated by adding them as children to a parent object which is then rotated. This approach automatically updates cubelet positions. After each rotation cubelets are removed from the parent and added back to the scene, which requires an explict update of cubelet materials with the `recolor()` function.

## Rubik's Cube R2

[Web page view]( http://jaanga.github.io/cookbook/rubiks-cube/rubiks-cube-r2.html "View as live web page" ) &mdash; 
[Source code view]( https://github.com/jaanga/cookbook/tree/gh-pages/rubiks-cube/rubiks-cube-r2.html "View as source code" )

Cubelets are manipulatd directly by changing orientation and position simultaneously. Rotations are handled with the `applyMatrix` method of `Object3D` rather than altering Euler angles. This ensures that the rotations are always with respect to world axes, not the internal axes of the cubelets. Positions are updated with vector addition. This is a simpler method for manipulating objects both conceptually and codewise.
