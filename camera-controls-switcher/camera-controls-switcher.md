Camera Controls Switcher R1
===

You can switch from Three.js Orbit Controls to FirstPerson controls without a problem. But when you go from First Person to Orbit the display gets stuck in a 'mousedown' mode.

What do you need to do to go back and forth between First Person and Orbit controls seamlessly? 

The jsBin with the demo

<http://jsbin.com/jekebo/2/edit?html,js,output>

The two functions

	function setControlsFirstPerson() {

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.set( -150, 20, 0 );
		controls = new THREE.FirstPersonControls( camera, renderer.domElement );
		controls.lookSpeed = 0.05;
		controls.movementSpeed = 50;

	}


	function setControlsOrbit() {

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.set( 100, 100, 100 );
		controls = new THREE.OrbitControls( camera, renderer.domElement );

	}

Any help appreciated.


Stack Overflow question
<http://stackoverflow.com/questions/30206243/how-to-switch-three-js-camera-controls-from-first-person-to-orbit-and-back>

jsBin demo
<http://jsbin.com/jekebo/2/edit?html,js,output>

### Change Log

2015-05-12 ~ Theo

* R1
