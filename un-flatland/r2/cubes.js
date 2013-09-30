	console.log( new Date() );
	
	geometry = new THREE.IcosahedronGeometry( 10, 1 );
	material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 2 } );

	goodies = new THREE.Mesh( geometry, material );
	goodies.position.set( -45, 20, -75);
	scene.add( goodies );
	
	function doStuff() {
		goodies.rotation.x = Date.now() * 0.0002;
		goodies.rotation.y = Date.now() * 0.0005;
	}