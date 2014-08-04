/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.RollerCoasterLifters = function ( curve, size ) {

	THREE.BufferGeometry.call( this );

	var vertices = [];
	var normals = [];

	var quaternion = new THREE.Quaternion();

	var up = new THREE.Vector3( 0, 1, 0 );

	var point = new THREE.Vector3();
	var tangent = new THREE.Vector3();

	// shapes

	var tube1 = [
		new THREE.Vector3(  0,  0.5, -0.5 ),
		new THREE.Vector3(  0,  0.5,  0.5 ),
		new THREE.Vector3(  0, -0.5,  0 )
	];

	var tube2 = [
		new THREE.Vector3( -0.5, 0,  0.5 ),
		new THREE.Vector3( -0.5, 0, -0.5 ),
		new THREE.Vector3(  0.5, 0,  0 )
	];

	var tube3 = [
		new THREE.Vector3(  0.5, 0, -0.5 ),
		new THREE.Vector3(  0.5, 0,  0.5 ),
		new THREE.Vector3( -0.5, 0,  0 )
	];

	var vector1 = new THREE.Vector3();
	var vector2 = new THREE.Vector3();
	var vector3 = new THREE.Vector3();
	var vector4 = new THREE.Vector3();

	var normal1 = new THREE.Vector3();
	var normal2 = new THREE.Vector3();
	var normal3 = new THREE.Vector3();
	var normal4 = new THREE.Vector3();

	var extrudeShape = function ( shape, fromPoint, toPoint ) {

		for ( var j = 0, jl = shape.length; j < jl; j ++ ) {

			var point1 = shape[ j ];
			var point2 = shape[ ( j + 1 ) % jl ];

			vector1.copy( point1 )
			vector1.applyQuaternion( quaternion );
			vector1.add( fromPoint );

			vector2.copy( point2 )
			vector2.applyQuaternion( quaternion );
			vector2.add( fromPoint );

			vector3.copy( point2 )
			vector3.applyQuaternion( quaternion );
			vector3.add( toPoint );

			vector4.copy( point1 )
			vector4.applyQuaternion( quaternion );
			vector4.add( toPoint );

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
			normal3.applyQuaternion( quaternion );
			normal3.normalize();

			normal4.copy( point1 );
			normal4.applyQuaternion( quaternion );
			normal4.normalize();

			normals.push( normal1.x, normal1.y, normal1.z );
			normals.push( normal2.x, normal2.y, normal2.z );
			normals.push( normal4.x, normal4.y, normal4.z );

			normals.push( normal2.x, normal2.y, normal2.z );
			normals.push( normal3.x, normal3.y, normal3.z );
			normals.push( normal4.x, normal4.y, normal4.z );

		}

	};

	var fromPoint = new THREE.Vector3();
	var toPoint = new THREE.Vector3();
	var offset = new THREE.Vector3();

	for ( var i = 1; i <= size; i ++ ) {

		point.copy( curve.getPointAt( i / size ) );
		tangent.copy( curve.getTangentAt( i / size ) );

		var angle = Math.atan2( tangent.x, tangent.z );

		quaternion.setFromAxisAngle( up, angle );

		//

		if ( point.y > 100 ) {

			fromPoint.set( -7.5, -3.5, 0 );
			fromPoint.applyQuaternion( quaternion );
			fromPoint.add( point );

			toPoint.set( 7.5, -3.5, 0 );
			toPoint.applyQuaternion( quaternion );
			toPoint.add( point );

			extrudeShape( tube1, fromPoint, toPoint );
			
			fromPoint.set( -7, -3, 0 );
			fromPoint.applyQuaternion( quaternion );
			fromPoint.add( point );

			toPoint.set( -7, -point.y, 0 );
			toPoint.applyQuaternion( quaternion );
			toPoint.add( point );

			extrudeShape( tube2, fromPoint, toPoint );

			fromPoint.set( 7, -3, 0 );
			fromPoint.applyQuaternion( quaternion );
			fromPoint.add( point );

			toPoint.set( 7, -point.y, 0 );
			toPoint.applyQuaternion( quaternion );
			toPoint.add( point );

			extrudeShape( tube3, fromPoint, toPoint );

		} else {

			fromPoint.set( 0, -2, 0 );
			fromPoint.applyQuaternion( quaternion );
			fromPoint.add( point );

			toPoint.set( 0, -point.y, 0 );
			toPoint.applyQuaternion( quaternion );
			toPoint.add( point );

			extrudeShape( tube3, fromPoint, toPoint );

		}

	}

	this.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
	this.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( normals ), 3 ) );

};

THREE.RollerCoasterLifters.prototype = Object.create( THREE.BufferGeometry.prototype );
