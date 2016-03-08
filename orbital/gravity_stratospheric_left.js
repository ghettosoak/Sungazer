var itunes = require('playback'),
	loudness = require('loudness'),
	Firebase = require('firebase'),
	firebaseRef = new Firebase('https://sungazer.firebaseIO.com/'),

	volumeFirst = true,
	itunesFirst = true;

firebaseRef.child('mute').on('value', function(data){
	if (!volumeFirst){

		loudness.setVolume(data.A.B, function (err) {
		    console.log('VOLUME AT ' + data.A.B)
		})
	}
	volumeFirst = false;
});

firebaseRef.child('playing').on('value', function(data){
	if (!itunesFirst){
		if (data.A.B){
			itunes.play()
			console.log('PLAY')
		}
		else{
			itunes.pause()
			console.log('PAUSE')
		}
	}
	itunesFirst = false;
});

firebaseRef.child('shareMouse').on('value', function(data){
	if (data.A.B){
		exec('killall ShareMouse');

		setTimeout(function(){
			exec('open -a ShareMouse');
		}, 1500);
	}
});

firebaseRef.child('dimScreens').on('value', function(data){
	if (data.A.B)
		exec( '/System/Library/Frameworks/ScreenSaver.framework/Resources/ScreenSaverEngine.app/Contents/MacOS/ScreenSaverEngine' );
});

firebaseRef.child('musicNext').on('value', function(data){

});

itunes.on('playing', function(data){
	firebaseRef.update({ playing: true });
});


itunes.on('paused', function(data){
	firebaseRef.update({ playing: false });
});












