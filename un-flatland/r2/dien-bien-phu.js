	console.log( new Date() );
	
	geometry = new THREE.TorusKnotGeometry( 30, 10);
	// material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 2 } );
	material = new THREE.MeshNormalMaterial( );
	
	goodies = new THREE.Mesh( geometry, material );
	goodies.position.set( 0, 50, 0);
	scene.add( goodies );
	
	function doStuff() {
		goodies.rotation.x = Date.now() * 0.0002;
		goodies.rotation.y = Date.now() * 0.0005;
	}