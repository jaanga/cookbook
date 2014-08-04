/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Sky = function () {

	THREE.BufferGeometry.call( this );

	var vertices = [];

	for ( var i = 0; i < 100; i ++ ) {

		var x = Math.random() * 8000 - 4000;
		var y = Math.random() * 500 + 500;
		var z = Math.random() * 8000 - 4000;

		var size = Math.random() * 400 + 200;

		vertices.push( x - size, y, z - size );
		vertices.push( x + size, y, z - size );
		vertices.push( x - size, y, z + size );

		vertices.push( x + size, y, z - size );
		vertices.push( x + size, y, z + size );
		vertices.push( x - size, y, z + size );

	}


	this.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );

};

THREE.Sky.prototype = Object.create( THREE.BufferGeometry.prototype );
