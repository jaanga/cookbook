
var loader = new THREE.JSONLoader();
loader.load( './seymour.js' , callbackSeymour );

function callbackSeymour( geometry) {
	// console.log( 'seymour', geometry );
	
	material = new THREE.MeshNormalMaterial( { } );

	goodies = new THREE.Object3D();
	
	var seymour = new THREE.Mesh( geometry, material );
	seymour.position.set( 100, 100, 0 );
	seymour.scale.set( 5, 5, 5 );
	seymour.castShadow = true;
	goodies.add( seymour );
	
	goodies.position.set( 0, 100, 0 );
	scene.add( goodies );
}

function doStuff() {
		goodies.rotation.x = Date.now() * 0.0005;
		goodies.rotation.y = Date.now() * 0.001;

}