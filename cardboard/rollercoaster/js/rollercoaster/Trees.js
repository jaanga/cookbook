/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Trees = function ( landscape ) {

	THREE.BufferGeometry.call( this );

	var vertices = [];

	var raycaster = new THREE.Raycaster();
	raycaster.ray.direction.set( 0, -1, 0 );

	for ( var i = 0; i < 2000; i ++ ) {

		var x = Math.random() * 5000 - 2500;
		var z = Math.random() * 5000 - 2500;

		raycaster.ray.origin.set( x, 500, z );

		var intersections = raycaster.intersectObject( landscape );

		if ( intersections.length === 0 ) continue;

		var y = intersections[ 0 ].point.y;

		var height = Math.random() * 50 + 5;

		var angle = Math.random() * Math.PI * 2;

		vertices.push( x + Math.sin( angle ) * 10, y, z + Math.cos( angle ) * 10 );
		vertices.push( x, y + height, z );
		vertices.push( x + Math.sin( angle + Math.PI ) * 10, y, z + Math.cos( angle + Math.PI ) * 10 );

		angle += Math.PI / 2;

		vertices.push( x + Math.sin( angle ) * 10, y, z + Math.cos( angle ) * 10 );
		vertices.push( x, y + height, z );
		vertices.push( x + Math.sin( angle + Math.PI ) * 10, y, z + Math.cos( angle + Math.PI ) * 10 );

	}

	this.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );

};

THREE.Trees.prototype = Object.create( THREE.BufferGeometry.prototype );
