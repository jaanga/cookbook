/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.RollerCoaster = function ( curve, size ) {

	THREE.BufferGeometry.call( this );

	var vertices = [];
	var normals = [];

	var up = new THREE.Vector3( 0, 1, 0 );
	var forward = new THREE.Vector3();
	var right = new THREE.Vector3();

	var quaternion = new THREE.Quaternion();
	var prevQuaternion = new THREE.Quaternion();
	prevQuaternion.setFromAxisAngle( up , Math.PI / 2 );

	var point = new THREE.Vector3();
	var prevPoint = new THREE.Vector3();
	prevPoint.copy( curve.getPointAt( 0 ) );

	// shapes

	var step = [
		new THREE.Vector3( -2.25,  0, 0 ),
		new THREE.Vector3(  0,  -0.5, 0 ),
		new THREE.Vector3(  0, -1.75, 0 ),

		new THREE.Vector3(  0,  -0.5, 0 ),
		new THREE.Vector3(  2.25,  0, 0 ),
		new THREE.Vector3(  0, -1.75, 0 )
	];

	var PI2 = Math.PI * 2;

	var sides = 5;
	var tube1 = [];

	for ( var i = 0; i < sides; i ++ ) {

		var angle = ( i / sides ) * PI2;
		tube1.push( new THREE.Vector3( Math.sin( angle ) * 0.6, Math.cos( angle ) * 0.6, 0 ) );

	}

	var sides = 6;
	var tube2 = [];

	for ( var i = 0; i < sides; i ++ ) {

		var angle = ( i / sides ) * PI2;
		tube2.push( new THREE.Vector3( Math.sin( angle ) * 0.25, Math.cos( angle ) * 0.25, 0 ) );

	}

	var vector = new THREE.Vector3();
	var normal = new THREE.Vector3();

	var drawShape = function ( shape ) {

		normal.set( 0, 0, -1 ).applyQuaternion( quaternion );

		for ( var j = 0; j < shape.length; j ++ ) {

			vector.copy( shape[ j ] );
			vector.applyQuaternion( quaternion );
			vector.add( point );

			vertices.push( vector.x, vector.y, vector.z );
			normals.push( normal.x, normal.y, normal.z );

		}

		normal.set( 0, 0, 1 ).applyQuaternion( quaternion );

		for ( var j = shape.length - 1; j >= 0; j -- ) {

			vector.copy( shape[ j ] );
			vector.applyQuaternion( quaternion );
			vector.add( point );

			vertices.push( vector.x, vector.y, vector.z );
			normals.push( normal.x, normal.y, normal.z );

		}

	};

	var vector1 = new THREE.Vector3();
	var vector2 = new THREE.Vector3();
	var vector3 = new THREE.Vector3();
	var vector4 = new THREE.Vector3();

	var normal1 = new THREE.Vector3();
	var normal2 = new THREE.Vector3();
	var normal3 = new THREE.Vector3();
	var normal4 = new THREE.Vector3();

	var extrudeShape = function ( shape, offset ) {

		for ( var j = 0, jl = shape.length; j < jl; j ++ ) {

			var point1 = shape[ j ];
			var point2 = shape[ ( j + 1 ) % jl ];

			vector1.copy( point1 ).add( offset );
			vector1.applyQuaternion( quaternion );
			vector1.add( point );

			vector2.copy( point2 ).add( offset );
			vector2.applyQuaternion( quaternion );
			vector2.add( point );

			vector3.copy( point2 ).add( offset );
			vector3.applyQuaternion( prevQuaternion );
			vector3.add( prevPoint );

			vector4.copy( point1 ).add( offset );
			vector4.applyQuaternion( prevQuaternion );
			vector4.add( prevPoint );

			vertices.push( vector1.x, vector1.y, vector1.z );
			vertices.push( vector2.x, vector2.y, vector2.z );
			vertices.push( vector4.x, vector4.y, vector4.z );

			vertices.push( vector2.x, vector2.y, vector2.z );
			vertices.push( vector3.x, vector3.y, vector3.z );
			vertices.push( vector4.x, vector4.y, vector4.z );

			//

			normal1.copy( point1 );
			normal1.applyQuaternion( quaternion );
			normal1.normalize();

			normal2.copy( point2 );
			normal2.applyQuaternion( quaternion );
			normal2.normalize();

			normal3.copy( point2 );
			normal3.applyQuaternion( prevQuaternion );
			normal3.normalize();

			normal4.copy( point1 );
			normal4.applyQuaternion( prevQuaternion );
			normal4.normalize();

			normals.push( normal1.x, normal1.y, normal1.z );
			normals.push( normal2.x, normal2.y, normal2.z );
			normals.push( normal4.x, normal4.y, normal4.z );

			normals.push( normal2.x, normal2.y, normal2.z );
			normals.push( normal3.x, normal3.y, normal3.z );
			normals.push( normal4.x, normal4.y, normal4.z );

		}

	};

	var offset = new THREE.Vector3();

	for ( var i = 1; i <= size; i ++ ) {

		point.copy( curve.getPointAt( i / size ) );

		up.set( 0, 1, 0 );

		forward.subVectors( point, prevPoint ).normalize();
		right.crossVectors( up, forward ).normalize();
		up.crossVectors( forward, right );

		var angle = Math.atan2( forward.x, forward.z );

		quaternion.setFromAxisAngle( up, angle );

		if ( i % 2 === 0 ) {

			drawShape( step );

		}

		extrudeShape( tube1, offset.set( 0, -1.25, 0 ) );
		extrudeShape( tube2, offset.set( 2, 0, 0 ) );
		extrudeShape( tube2, offset.set( -2, 0, 0 ) );

		prevPoint.copy( point );
		prevQuaternion.copy( quaternion );

	}

	// console.log( vertices.length );

	this.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
	this.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( normals ), 3 ) );

};

THREE.RollerCoaster.prototype = Object.create( THREE.BufferGeometry.prototype );
