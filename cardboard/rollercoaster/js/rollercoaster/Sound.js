/**
 * @author mrdoob / http://mrdoob.com/
 */

var Sound = function ( context ) {

	var buffer;
	var source = context.createBufferSource();

	var gain = context.createGain();
    gain.connect( context.destination );

	this.load = function ( file ) {

		var request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.responseType = 'arraybuffer';
		request.onload = function ( e ) {

			context.decodeAudioData( this.response, function ( buffer ) {

				source.buffer = buffer;

			} );

		};
		request.send();

		return this;

	};

	this.setPlayBackRate = function ( value ) {

		source.playbackRate.value = value;

		return this;

	};

	this.setLoop = function ( boolean ) {

		source.loop = boolean;

		return this;

	};

	this.setVolume = function ( value ) {

		gain.gain.value = value;
		return this;

	};

	this.play = function () {

		source.connect( gain );
		source.start();

		return this;

	};

	this.play3D = function ( position ) {

		var panner = context.createPanner();
		panner.rolloffFactor = 0.01;
		panner.setPosition( position.x, position.y, position.z );
		panner.connect( gain );

		source.connect( panner );
		source.start();

		return this;

	};

};