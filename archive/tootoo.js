// Copyright © 2017 Jaanga authors. MIT license.

	var TOO = {};
	var b = '<br>';

	TOO.init = function( user ) {

		TOO.user    = user.user;
		TOO.repo    = user.repo;
		TOO.branch  = user.branch;
		TOO.folder  = user.folder
		TOO.noIndex = user.noIndex,
		TOO.rawgit  = user.rawgit

		TOO.path = null;
		TOO.file = null;

		TOO.contents = contents;
		TOO.breadcrumbs = menuBreadcrumbs;
		TOO.menu = menu;
		TOO.menuItems = menuItems;
		TOO.menuInfo = menuInfo;

		if ( location.hash ) {

			params = (window.location.hash.substr(1)).split("&");

console.log( 'params', params );

			for ( var i = 0; i < params.length; i++ ) {

				var a = params[ i ].split( '=' );

console.log( 'a', a );

				TOO.user    = a[ 0 ] === 'user'    ? a[ 1 ] : TOO.user;
				TOO.repo    = a[ 0 ] === 'repo'    ? a[ 1 ] : TOO.repo;
				TOO.branch  = a[ 0 ] === 'branch'  ? a[ 1 ] : TOO.branch;
				TOO.folder  = a[ 0 ] === 'folder'  ? a[ 1 ] : TOO.folder;
				TOO.noIndex = a[ 0 ] === 'noindex' ? a[ 1 ] : TOO.noIndex;
				TOO.rawgit  = a[ 0 ] === 'rawgit'  ? a[ 1 ] : TOO.rawgit;

				TOO.path    = a[ 0 ] === 'path'    ? a[ 1 ] : TOO.path;
				TOO.file    = a[ 0 ] === 'file'    ? a[ 1 ] : TOO.file;

			}
		}

//	console.log( 'path', TOO.path );
//	console.log( 'file', TOO.file );

		TOO.url = 'https://api.github.com/repos/' + TOO.user + '/' + TOO.repo + '/git/trees/' + TOO.branch + '?recursive=1';

		if ( TOO.rawgit ) {

			TOO.urlGHPages = 'https://rawgit.com/' + TOO.user + '/' + TOO.repo + '/' + TOO.branch + '/' + TOO.folder + ( TOO.folder ? '/' : '' );

		} else {

			TOO.urlGHPages = 'https://' + TOO.user + '.github.io/' + TOO.repo + '/' + TOO.folder + ( TOO.folder ? '/' : '' );

		}

		TOO.getButtons();

		TOO.requestAPIContents();

	}


	TOO.getButtons = function() {

		button = document.body.appendChild( document.createElement( 'div' ) );
		button.id = 'button';
		button.innerHTML = 'Edit';
		TOO.button = button;

		nextFile = document.body.appendChild( document.createElement( 'div' ) );
		nextFile.id = 'nextFile';
		nextFile.innerHTML = '&gt;';
		TOO.nextFile = nextFile;

		previousFile = container.appendChild( document.createElement( 'div' ) );
		previousFile.id = 'previousFile';
		previousFile.innerHTML = '&lt;';
		TOO.previousFile = previousFile;

	}


	TOO.requestAPIContents = function() {

		var xhr, obj, treeNode;

		TOO.requestFile( TOO.url, callbackRequestFile );

		function callbackRequestFile( xhr ) {

			var response, paths, path;

			response = JSON.parse( xhr.target.response );

			paths = [];

			for ( var i = 0; i < response.tree.length; i++ ) {

				path = response.tree[ i ].path;

				if ( path.startsWith( '.' ) ) { continue; } // .gitignore, gitattributes etc

				if ( !path.includes( TOO.folder ) && TOO.folder !== '' ) { continue; } // 'wanted folder not in path and not in root folder

				paths.push( path );

			}

			TOO.length = paths.length;

			if ( TOO.folder === '' ) { // we are in top folder

				TOO.data = { 'children' : {} };
				obj = TOO.data.children;

			} else {

				TOO.data = {};
				obj = TOO.data

			}

			paths.map( function( path ) { return buildTree( path.split( '/' ), obj ) } );

// http://stackoverflow.com/questions/17140711/how-to-show-a-list-or-array-into-a-tree-structure-in-javascript
// https://jsfiddle.net/z07q8omt/

			function buildTree( parts, treeNode ) {

				var keys, newNode;

				if ( parts.length === 0 ) { return; }

				keys = Object.keys( treeNode );

				for ( var i = 0 ; i < keys.length; i++ ) {

					if ( parts[ 0 ] === treeNode[ keys[ i ] ].text ) {

						buildTree( parts.splice( 1, parts.length ), treeNode[ keys[ i ] ].children );

						return;

					}

				}

				newNode = { 'text' : parts[ 0 ], 'children' : {} };

				treeNode[ newNode.text ] = newNode;

				buildTree( parts.splice( 1, parts.length ), newNode.children );

			}

			if ( location.hash ) {

				params = (window.location.hash.substr(1)).split("&");

//console.log( 'params', params );

				for ( var i = 0; i < params.length; i++ ) {

					var a = params[ i ].split( '=' );

//console.log( 'a', a );

					TOO.user = a[ 0 ] === 'user' ? a[ 1 ] : TOO.user;
					TOO.repo = a[ 0 ] === 'repo' ? a[ 1 ] : TOO.repo;
					TOO.branch = a[ 0 ] === 'branch' ? a[ 1 ] : TOO.branch;
					TOO.folder = a[ 0 ] === 'folder' ? a[ 1 ] : TOO.folder;

					TOO.path = a[ 0 ] === 'path' ? a[ 1 ] : TOO.path;

					TOO.file = a[ 0 ] === 'file' ? a[ 1 ] : TOO.file;

				}

//console.log( 'path', TOO.path );
//console.log( 'file', TOO.file );

				TOO.setMenu( TOO.path, TOO.file );

			} else {

				TOO.setMenu();

			}

		}

	}


	TOO.setMenu = function( path, file ) {

//console.log( 'path', path );

		var folders, obj;
		var foldersText, filesText;
		var count, pathString;
		TOO.files = [];

		folders = path ? path.split( '/' ) : [] ;

		obj = TOO.folder ? TOO.data[ TOO.folder ] : TOO.data;

// I don't really understand what is happening here, but it works...
// without the loop, the menu re-displays the current menu
// with the loop the menu displays the items in the just-selected folder

		for ( var i = 0; i < folders.length; i++ ) {

			obj = obj.children[ folders[ i ] ];

		}

		TOO.keys = Object.keys( obj.children );
		foldersText = '';
		filesText = ''; // '<small> Use tag and shift-tab to browse files quickly </small>' + b;
		count = 0;

		pathString = path ? path + '/': '';

		for ( var i = 0; i < TOO.keys.length; i++ ) {

			key = TOO.keys[ i ];

			if ( Object.keys( obj.children[ key ].children ).length > 0 ) {

				foldersText += ' &#x1f4c1; <a href=JavaScript:TOO.setMenu("' + pathString + encodeURI( key ) + '"); >' + key + '</a>'+ b; // it's a folder

			} else {

				filesText += '<div id=file' + ( count++ ) + ' style=width:100%; ><a href=JavaScript:TOO.getFileSetContents("' + pathString + '","' + encodeURI( key ) + '"); >' +
					key +
				'</a></div>';

				TOO.files.push( key );
			}

		}

		TOO.setBreadcrumbs( path );

		TOO.menuItems.innerHTML = foldersText + filesText;

		TOO.menuInfo.innerHTML = '<div> Number of files found: ' + TOO.length + b + b +

			'<a href="https://github.com/' + TOO.user + '/' + TOO.repo + '" target="_blank"> View repository on GitHub </a>' +

		'</div>';

		if ( file ){

			TOO.getFileSetContents( pathString, file );

		} else {

			TOO.setDefaultContents( pathString, filesText );

		}

//		history.replaceState( '', document.title, window.location.pathname );

	}


	TOO.setBreadcrumbs = function( path ) {

		var name, txt, folders, str;

		name = TOO.folder ? TOO.folder : TOO.repo;

		txt = '<h2><a href=JavaScript:TOO.setMenu(); >' + name + '</a> &raquo; </h2>';
		folders = path ?  path.split( '/' ) : [] ;
		str = '';

		for ( var i = 0; i < folders.length; i++ ) {

			str += folders[ i ] + '/';

			txt += '<h3><a href=JavaScript:TOO.setMenu("' + str.slice( 0, -1 ) + '"); >' + folders[ i ] + '</a> &raquo; </h3>';

		}

		TOO.breadcrumbs.innerHTML = txt;

	}


	TOO.setDefaultContents = function( path, filesText ) {

		var txt, start, file;

		txt = filesText.toLowerCase();

		if ( location.hash ) { return; }

		if ( txt.includes( 'index.html' ) && TOO.noIndex !== 'true' ) {

			start = txt.indexOf( 'index.html' );

			file =  filesText.slice( start, start + 10 );

			TOO.getFileHTML( TOO.urlGHPages + path + file );

		} else if ( txt.includes( 'readme.md' ) ) {

			start = txt.indexOf( 'readme.md' );

			file =  filesText.slice( start, start + 9 );

			TOO.getFileMD( TOO.urlGHPages + path + file );

			file1.focus();

		} else if ( txt.includes( 'toogallery') ) {

			TOO.createPageOfImages( TOO.urlGHPages + path , TOO.keys );

		} else {

			file =  TOO.files[ 0 ];
			TOO.getFileSetContents( path, file  );

		}

		TOO.setButtons( path, file );

	}


// formats to consider adding: PDF, STL & 3D formats
// https://mozilla.github.io/pdf.js/

	TOO.getFileSetContents = function( path, file ){

		url = TOO.urlGHPages + path + encodeURI( file );

		var u = url.toLowerCase();

		if ( u.endsWith( '.md' ) ){

			TOO.getFileMD( url );

		} else if ( u.endsWith( '.html' ) || u.endsWith( '.htm' ) ) {

			TOO.getFileHTML( url );

		} else if ( u.endsWith( '.gif' ) || u.endsWith( '.ico' ) || u.endsWith( '.jpg' ) || u.endsWith( '.png' ) ||  u.endsWith( '.svg' ) ) {

			TOO.getFileImage( url );

		} else {

			TOO.getFileCode( url );

		}

		TOO.setButtons( path, file );

	};


	TOO.setButtons = function( path, file ) {

		if ( TOO.button ) {

			TOO.button.innerHTML = '<a href="https://github.com/' + TOO.user + '/' + TOO.repo + '/blob/' + TOO.branch + '/' + path + file + '" target="_blank"> Edit </a>';
		}

		index = TOO.files.indexOf( file );
// console.log( 'index', index );
		for ( var i = 0; i < TOO.files.length; i++ ) {

			el = document.getElementById( 'file' + i );

			col = ( i === index )  ? '#ccc' : '';

			el.style.backgroundColor = col;

		}

		indexNext = index + 1;

		if ( index >= TOO.files.length - 1 ) { indexNext = 0; }

		indexPrevious = index - 1;

		if ( index <= 0 ) { indexPrevious = TOO.files.length - 1; }

		if ( TOO.nextFile ) {

			TOO.nextFile.innerHTML = '<a href=JavaScript:TOO.getFileSetContents("' + path + '","' + encodeURI( TOO.files[indexNext] ) + '"); > &gt; </a>';

			TOO.previousFile.innerHTML = '<a href=JavaScript:TOO.getFileSetContents("' + path + '","' + encodeURI( TOO.files[indexPrevious] ) + '"); > &lt; </a>';

		}

	}


	TOO.getFileMD = function( url ) {

// https://github.com/showdownjs/showdown

		showdown.setFlavor('github');

		var converter = new showdown.Converter();

		TOO.requestFile( url, callbackMD );

		function callbackMD( xhr ) {

			TOO.contents.innerHTML =

			'<div style="border: 0px red solid; margin: 0 auto; width: 800px; position: relative;" >' +
				converter.makeHtml( xhr.target.response ) +
			'</div>';

			TOO.getFileDataXHR( xhr );

		}

	}


	 TOO.getFileHTML = function( url ){

		TOO.contents.innerHTML =
			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=' + ( window.innerHeight - 5 ) +
			' style="border:0px solid red"; >' +
		'<iframe>';

// how to catch and display errors loading iframes?

// improve this...

		menuFileData.innerHTML =
			'URL: ' + url.slice( 8 ).link( url ) + b +
		b;

	};


	 TOO.getFileImage = function( url ){

		TOO.contents.innerHTML =
			'<img id=image src="' + url +
			'" style="border:2px solid gray; margin: 25px 0 0 50px; max-width: 800px; " >';

		menuFileData.innerHTML =
			'URL: ' + url.slice( 8 ).link( url ) + b +
		b;

	};


	 TOO.getFileCode = function( url ) {

		TOO.contents.innerHTML =
			'<div id=contentsCode style="border: 0px red solid; height: 100%; margin: 0 auto; width: 900px; position: relative;" >' +
			' item will appear here ' +
		'</div>';

		if ( TOO.editor ) {

			setEditContents();

		} else {

// check here for latest: https://cdnjs.com/libraries/ace/
// Anyway to get latest automatically?

			TOO.editor = document.body.appendChild( document.createElement( 'script' ) );
			TOO.editor.onload = setEditContents;
			TOO.editor.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js';

		}

		function setEditContents() {

			TOO.editor = ace.edit( 'contentsCode' );
			TOO.editor.$blockScrolling = Infinity;
			TOO.editor.getSession().setMode( 'ace/mode/markdown' );

			TOO.requestFile( url, callback );

			function callback( xhr ) {

				TOO.getFileDataXHR( xhr );
				TOO.editor.setValue( xhr.target.response.slice( 0, 10000 ), -1 );

			}

		}

	};


	 TOO.createPageOfImages = function( path, photos ) {

		var page, item, item2, fileName;

		page = '';

		for ( var i = 0; i < photos.length; i++ ) {

			item = photos[ i ];
//			item2 = item.split( '/' )

//			fileName = item2.pop();
			fileName = item.replace( /[-_]/g, ' ' );
//console.log( 'item', item );

			page += '<div style=display:inline-block;margin:10px; >' +
				'<a href=JavaScript:TOO.getFileSetContents("' + path + item +'"); ><img src=' + path + encodeURI( item ) + ' height=200; title="' + fileName.slice( 0, -4 ) + '" ></a>' +
			'</div>';

		}

//console.log( 'page', page  );

		TOO.contents.innerHTML = page;

	}


	 TOO.getFileDataXHR = function( xhr ) {

		var lastMod = xhr.target.getResponseHeader ( "Last-Modified" );

		menuFileData.innerHTML =
			'<small><i>Loaded maximum first 10,000 characters.<br></i></small>' + b +
			'URL: ' + b + xhr.target.responseURL.slice( 8 ).link( xhr.target.responseURL ) + b +
			'Size: ' + xhr.total.toLocaleString() + ' bytes' + b +
			'Last modified: ' + b + lastMod + b +
		'';

	}


// test: requestFile( 'http://http://jaanga.github.io/readme.md' , function( xhr ){ console.log( 'xhr', xhr.target.response ); } );

	 TOO.requestFile = function( url, callback ) {

		var xhr;
		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onload = callback;
		xhr.send( null );

	}


	TOO.menuSettings =

		'<details>' +

		'<summary><h3>Settings</h3></summary>' +

		'<div><button onclick=TOO.cssColorsDark();  >Dark</button>' +
			' <button onclick=TOO.cssColorsLight(); >Light</button>' +
			' <button onclick=TOO.cssColorsSepia(); >Sepia</button>' +
		'</div>' + b +

		'<div><button onclick=TOO.cssFontOpenSans(); >Open Sans</button>' +
			' <button onclick=TOO.cssFontInconsolata(); >Inconsolata</button>' +
			' <button onclick=TOO.cssFontMonospace(); >Monospace</button>' +
		'</div>' + b +

		'<div><button onclick=TOO.cssFontSizeNormal(); >Normal</button>' +
			' <button onclick=TOO.cssFontSizeLarger(); >Larger</button>' +
			' <button onclick=TOO.cssFontSizeLargest(); >Largest</button>' +
		'</div>' + b +

		'</details>' +
	'';


	TOO.cssColorsDark = function() {

		document.body.style.backgroundColor = '#222';
		document.body.style.color = '#ddd';
		TOO.menu.style.backgroundColor = '#555';

	};

	TOO.cssColorsLight = function() {

		document.body.style.backgroundColor = '#fff';
		document.body.style.color = '#000';
		TOO.menu.style.backgroundColor = '#eee';

	};

	TOO.cssColorsSepia = function() {

		document.body.style.backgroundColor = '#f3eacb';
		document.body.style.color = '#704214';
		TOO.menu.style.backgroundColor = '#704214';

	};

	TOO.cssFontOpenSans = function() {

		let fontID = 'Open+Sans';

		let font = document.body.appendChild( document.createElement( 'link' ) );
		font.id = fontID;
		font.rel = 'stylesheet';
		font.href = 'http://fonts.googleapis.com/css?family=' + fontID;

		document.body.style.fontFamily = 'Open Sans';

	};

	TOO.cssFontInconsolata = function() {

		let fontID = 'Inconsolata';

		let font = document.body.appendChild( document.createElement( 'link' ) );
		font.id = fontID;
		font.rel = 'stylesheet';
		font.href = 'http://fonts.googleapis.com/css?family=' + fontID;

		document.body.style.fontFamily = 'Inconsolata';

	};

	TOO.cssFontMonospace = function() {

		document.body.style.fontFamily = 'monospace';

	};

	TOO.cssFontSizeNormal = function() {

		document.body.style.fontSize = '12pt';

	};

	TOO.cssFontSizeLarger = function() {

		document.body.style.fontSize = '14pt';

	};

	TOO.cssFontSizeLargest = function() {

		document.body.style.fontSize = '18pt';

	}