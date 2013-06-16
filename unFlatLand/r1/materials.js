var selectedMaterial = 'normal~transparent*';

function selectMaterial(m) {
	material = materials[m].m;    
	selectedMaterial = m;
	
	plane.material = material;
console.log('sel menu: ', material, m ); 
}  
  
function generateMaterials(basePath) {
	var path = basePath + '../textures/cube/SwedishRoyalCastle/';
	var format = '.jpg';
	var urls = [
		path + 'px' + format, path + 'nx' + format,
		path + 'py' + format, path + 'ny' + format,
		path + 'pz' + format, path + 'nz' + format
	];

	var reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
	reflectionCube.format = THREE.RGBFormat;

	var refractionCube = new THREE.Texture( reflectionCube.image, new THREE.CubeRefractionMapping() );
	reflectionCube.format = THREE.RGBFormat; 

	// toons

	var toonMaterial1 = createShaderMaterial( "toon1", light, ambientLight ),
	toonMaterial2 = createShaderMaterial( "toon2", light, ambientLight ),
	hatchingMaterial = createShaderMaterial( "hatching", light, ambientLight ),
	hatchingMaterial2 = createShaderMaterial( "hatching", light, ambientLight ),
	dottedMaterial = createShaderMaterial( "dotted", light, ambientLight ),
	dottedMaterial2 = createShaderMaterial( "dotted", light, ambientLight );

	hatchingMaterial2.uniforms.uBaseColor.value.setRGB( 0, 0, 0 );
	hatchingMaterial2.uniforms.uLineColor1.value.setHSL( 0, 0.9, 0.9 );
	hatchingMaterial2.uniforms.uLineColor2.value.setHSL( 0, 0.9, 0.9 );
	hatchingMaterial2.uniforms.uLineColor3.value.setHSL( 0, 0.9, 0.9 );
	hatchingMaterial2.uniforms.uLineColor4.value.setHSL( 0.1, 0.9, 0.9 );

	dottedMaterial2.uniforms.uBaseColor.value.setRGB( 0, 0, 0 );
	dottedMaterial2.uniforms.uLineColor1.value.setHSL( 0.05, 1.0, 1.0 );

	texture = THREE.ImageUtils.loadTexture( basePath + '../textures/ash_uvgrid01.jpg' );
	// texture = THREE.ImageUtils.loadTexture( '../../textures/ash_uvgrid01.jpg' );
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      
    var texture1 = new THREE.Texture( generateTexture( 0, 0.5, 1 ), new THREE.UVMapping() );
    var texture2 = new THREE.Texture( generateTexture( 0, 1, 0 ), new THREE.SphericalReflectionMapping() );
    var texture3 = THREE.ImageUtils.loadTexture( basePath + '../textures/land_ocean_ice_cloud_2048.jpg' )

	texture.needsUpdate = true;
    texture1.needsUpdate = true;
    texture2.needsUpdate = true;
    texture3.needsUpdate = true;
	
    materials = {
    
		"chrome" :
		{
			m: new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube, side: THREE.DoubleSide } ),
			d: 'MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } )'
		},    

		"liquid" :
		{
			m: new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: refractionCube, refractionRatio: 0.85, side: THREE.DoubleSide  } ),
			d: 'MeshLambertMaterial( { color: 0xffffff, envMap: refractionCube, refractionRatio: 0.85, side: THREE.DoubleSide  } )'
		},
  
		"plastic" :
		{
			m: new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x888888, ambient: 0x000000, shininess: 250, side: THREE.DoubleSide } ),
			d: 'MeshPhongMaterial( { color: 0x000000, specular: 0x888888, ambient: 0x000000, shininess: 250 } )'
		},
  
		"shiny*"  :
		{
			m: new THREE.MeshPhongMaterial( { color: 0x550000, specular: 0x440000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3, metal: true, side: THREE.DoubleSide } ),
			d: 'MeshPhongMaterial( { color: 0x550000, specular: 0x440000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3, metal: true } )'
		},

		"flat" :
		{
			m: new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x111111, shininess: 1, shading: THREE.FlatShading, side: THREE.DoubleSide  } ),
			h: 0, s: 0, v: 1
		},

		"textured" :
		{
			m: new THREE.MeshBasicMaterial( { color: 0xffffff, specular: 0x111111, shininess: 1, map: texture, side: THREE.DoubleSide  } ),
			h: 0, s: 0, v: 1
		},

		"colors" :
		{
			m: new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 2, vertexColors: THREE.VertexColors, side: THREE.DoubleSide  } ),
			h: 0, s: 0, v: 1
		},

		"plastic" :
		{
			m: new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x888888, ambient: 0x000000, shininess: 250, side: THREE.DoubleSide  } ),
			h: 0.6, s: 0.9, v: 0.2
		},

		"toon1"  :
		{
			m: toonMaterial1,
			h: 0.2, s: 0.5, v: 1
		},

		"toon2" :
		{
			m: toonMaterial2,
			h: 0.4, s: 0.5, v: 1
		},

		"hatching" :
		{
			m: hatchingMaterial,
			h: 0.2, s: 0.2, v: 1
		},

		"hatching2" :
		{
			m: hatchingMaterial2,
			h: 0.0, s: 0.9, v: 0.9
		},
  
		"dotted" :
		{
			m: dottedMaterial,
			h: 0.2, s: 0.2, v: 1
		},

		"dotted2" :
		{
			m: dottedMaterial2,
			h: 0.1, s: 1.0, v: 1
		},
 
		"normal~transparent*" :
		{
		  m: new THREE.MeshNormalMaterial( { opacity: 0.8, shading: THREE.SmoothShading, side: THREE.DoubleSide, transparent: true }),
		  d: '1. MeshNormalMaterial({ opacity: 0.9, side: THREE.DoubleSide, transparent: true })'
		},

		"normal~flat" :
		{
		  m:  new THREE.MeshNormalMaterial( { shading: THREE.FlatShading, side: THREE.DoubleSide }),
		  d: '2. MeshNormalMaterial({ shading: THREE.FlatShading, side: THREE.DoubleSide })'
		},

		"normal~smooth" :
		{
		  m:  new THREE.MeshNormalMaterial( {shading: THREE.SmoothShading, side: THREE.DoubleSide } ),
		  d: '3. MeshNormalMaterial({ shading: THREE.SmoothShading, side: THREE.DoubleSide })'
		},

		"normal~wireframe" :
		{
		  m:  new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, wireframe: true }),
		  d: '4. MeshNormalMaterial({ wireframe: true })'
		},
		
		"basic~texture1" :
		{
		  m: new THREE.MeshBasicMaterial({ map: texture1, fog: false, side: THREE.DoubleSide }),
		  d: '5. MeshBasicMaterial({ map: texture1, fog: false, side: THREE.DoubleSide })'
		},    

		"basic~texture2" :
		{
		  m: new THREE.MeshBasicMaterial( { map: texture2, side: THREE.DoubleSide }),
		  d: '6. MeshBasicMaterial( { map: texture2, side: THREE.DoubleSide } )'
		},
		
		"basic~texture3" :
		{
		  m: new THREE.MeshBasicMaterial( { map: texture3, tansparent: true, side: THREE.DoubleSide }),
		  d: '7. MeshBasicMaterial( { map: texture3, tansparent: true, side: THREE.DoubleSide } )'
		},
		
		"basic~map1" :
		{
		  m: new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basePath + '../textures/land_ocean_ice_cloud_2048.jpg' ), side: THREE.DoubleSide }), 
		  d: "8. MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basePath + '../textures/land_ocean_ice_cloud_2048.jpg' ), side: THREE.DoubleSide } )"
		},
		
		"basic~map2" :
		{
		  m: new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basePath + '../textures/cynthia-draw-lightning.jpg' ), side: THREE.DoubleSide }),
		  d: "9. MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basePath + '../textures/cynthia-draw-lightning.jpg' ), side: THREE.DoubleSide })"
		},

		"phong~flat" :
		{
		  m: new THREE.MeshPhongMaterial( { ambient: 0x888800, color: 0xdd00ff, specular: 0x009900, shininess: 30, shading: THREE.FlatShading, side: THREE.DoubleSide }),
		  d: 'MeshPhongMaterial( { ambient: 0x888800, color: 0xdd00ff, specular: 0x009900, shininess: 30, shading: THREE.FlatShading, side: THREE.DoubleSide })'
		},
		
		"phong~smooth" :
		{
		  m: new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading, side: THREE.DoubleSide }),
		  d: 'MeshPhongMaterial( { ambient: 0x030303, color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.SmoothShading, side: THREE.DoubleSide })'
		}  
	/*
		"" :
		{
		  m: ,
		  d: ''
		},
	*/
    };          
      
 }
 
function generateTexture( r, g, b ) {
	var canvas = document.createElement( 'canvas' );
	canvas.width = 256;
	canvas.height = 256;
	var context = canvas.getContext( '2d' );
	var image = context.getImageData( 0, 0, 256, 256 );
	var x = 0, y = 0, p;
	for ( var i = 0, j = 0, l = image.data.length; i < l; i += 4, j ++ ) {
		x = j % 256;
		y = x == 0 ? y + 1 : y;
		p = Math.floor( x ^ y );

		image.data[ i ] = ~~ p * r;
		image.data[ i + 1 ] = ~~ p * g;
		image.data[ i + 2 ] = ~~ p * b;
		image.data[ i + 3 ] = 255;
	}
	context.putImageData( image, 0, 0 );
	return canvas;
}      

function createShaderMaterial( id, light, ambientLight ) {

	var shader = THREE.ShaderToon[ id ];

	var u = THREE.UniformsUtils.clone( shader.uniforms );

	var vs = shader.vertexShader;
	var fs = shader.fragmentShader;

	var material = new THREE.ShaderMaterial( { uniforms: u, vertexShader: vs, fragmentShader: fs, side: THREE.DoubleSide  } );

	material.uniforms.uDirLightPos.value = light.position;
	material.uniforms.uDirLightColor.value = light.color;

	material.uniforms.uAmbientLightColor.value = ambientLight.color;

	return material;
}