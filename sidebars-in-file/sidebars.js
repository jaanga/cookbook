
	var sidebarLeft;
	var statusBar;
	var sidebarRight;

	var sbr = function(){
		var css = document.createElement('style');
		css.innerHTML += 'h1 { margin: 0; min-width: 200px; }' +

			'#sbl {background-color: #eee; border: 1px solid; left: 30px; margin: 10px; opacity: 0.8; padding: 10px; position: absolute; ' +
				'text-align: left; top: 50px; max-width: 350px;}' +

			'#stbHeader {background-color: #eee; border: 1px solid; margin: 10px auto; opacity: 0.8; padding: 10px; ' +
				'text-align: left; top: 20px; width: 500px;}' +

			'#sbr {background-color: #eee; border: 1px solid; margin: 10px; opacity: 0.8; padding: 10px; position: absolute; ' +
				'right: 20px; text-align: left; top: 30px; max-width: 350px;}' +

			'#sbr-body {  height: 95%; overflow-y: scroll; }' +
			'div.control { color: #aaa; cursor: hand; cursor: pointer; float: right; }' ;
		document.body.appendChild( css );

		sidebarLeft = document.createElement( 'div' );
		sidebarLeft.id = 'sbl';
		document.body.appendChild( sidebarLeft );
		sidebarLeft.innerHTML =
			'<div class="control" onclick="toggleBar( sidebarLeft )">[X]</div>' +
			'<h1>App Title</h1 "h1">' +
			'<p><i>Sub text goes here...</i></p>' +
			'<p>This box is where you might tell people about the app.</p>' +
			'<p>It\'s also where the copyright and license information should appear.</p>' +
			'<p>This is also where you might help the people understand what the app does and how to get started using the app.</p>' +
			'<p>Another use might be to give credit or thanks.</p>' +
			'<p>A useful link ot two might be nice to include here as well: <a href="http://example.com" target="_blank">example.com</a></p>';

		statusBarHeader = document.createElement( 'div' );
		statusBarHeader.id = 'stbHeader';
		document.body.appendChild( statusBarHeader );
		statusBarHeader.innerHTML =
			'<div id="toggle" class="control" onclick="toggleStatusBar()">[-]</div>' +
			'<div class="control" onclick="toggleBar( sidebarLeft ); toggleBar( sidebarRight );">[<span style="font-size: small; vertical-align: text-top; ">[]</span>] &nbsp;</div>' +
			'<h1>App Status</h1 "h1">';

		statusBarBody = document.createElement( 'div' );
		statusBarBody.id = 'stbBody';
		statusBarHeader.appendChild( statusBarBody );
		statusBarBody.innerHTML =
			'<p>Numeric and other data that is updating in real-time goes here...</p>';

		sidebarRight = document.createElement( 'div' );
		sidebarRight.id = 'sbr';
		document.body.appendChild( sidebarRight );
		sidebarRight.innerHTML =
			'<div class="control" onclick="toggleBar( sidebarRight )">[X]</div>' +
			'<h1>Control Panel</h1>';

		var sidebarRightBody = document.createElement( 'div' );
		sidebarRightBody.style.height = (window.innerHeight - 120) + 'px';
		sidebarRightBody.id = 'sbr-body';
		sidebarRight.appendChild( sidebarRightBody );
		sidebarRightBody.innerHTML =
			'<p>This sidebar is for: </p>' +
			'<ul>' +
			'<li>Text entry</li>' +
			'<li>Radio buttons</li>' +
			'<li>Checkboxes</li>' +
			'<li>Dropdown lists</li>' +
			'<li>And all the other widgets you use to control an app</li>' +
			'</ul>' +
			'<h2>This is a demo</h2>' +
			'</p>The purpose of this demo is to focus on the disposition of different typs in information in an app as well as its behavior. </p>' +
			'<p>This demo is <b>*not*</b> about content, appearance or style. So issues of fonts, sizes, styles, colors, exact placement, alignmnts are not the issue here.</p> ' +
			'<p>The important things are: </p>' +
			'<ul>' +
			'<li>the three boxes</li>' +
			'<li>The kind or type of information they display</li>' +
			'<li>The ease with which the boxes may be manipulated</li>' +
			'</ul>' +
			'<p>Please imagine some complicated 3D thing is happening under these three boxes.</p>' +
			'<p>Do the boxes open and close as they should? Might there be a better way?</p> ' +
			'<p>Does this box scroll properly? What happends hen you resize the window or reload the app? </p>' +
			'<h2>BTW</h2>' +
			'<p>If you look at the code you will see that it\'s nearly 100% JavaScript. There\'s no separate style sheet and just the minimum HTML to load the page.</p>' +
			'<p>Writing text as if it were code helps remind you that it\'s all code/objects/strings just waiting to be manipulated.</p>' +
			'<p>The layout of the code is generous horizontally and greedy vertically. One day monitors will be easier to rotate and it will be logical to be generous in both directions.</p>' +
			'<p>All this to say, apart from the disposition and the behavios, the code itself is open for discssion in a demo like this...</p>' +

		'' ;
	}();

	function toggleBar( sidebar ) {
		if ( sidebar.style.display == 'none' ) {
			sidebar.style.display = 'block';
		} else {
			sidebar.style.display = 'none';
		}
	}

	function toggleStatusBar() {
		var tg = document.getElementById("toggle");
		if ( statusBarBody.style.display == 'none' ) {
			statusBarBody.style.display = 'block';
			tg.innerText = '[-]';
		} else {
			statusBarBody.style.display = 'none';
			tg.innerText = '[+]';
		}
	}