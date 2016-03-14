var itunes = require('playback'),
	loudness = require('loudness'),
	Firebase = require('firebase'),
	firebaseRef = new Firebase('https://sungazer.firebaseIO.com/'),
	exec = require('child_process').exec,

	_volume,

	_toggles = {
		dimScreens:{
			local: false,
			remote: false
		},
		mute: false,
		music: {
			playing: false,
			source_itunes: false,
			source_youtube: false
		}
	};

firebaseRef.child('mute').on('value', function(data){
	if (data.A.B && !_toggles.mute){

		loudness.getVolume(function(err, vol){
			_volume = vol;

			loudness.setVolume(_volume * 0.25, function (err) {
				_toggles.mute = true;
				console.log('MUTING', _volume)
			});
		});
	}else{
		loudness.setVolume(_volume, function (err) {
		    _toggles.mute = false;
			console.log('UNMUTING', _volume)
		})
	}
});

firebaseRef.child('music/playing').on('value', function(data){
	console.log(data.A.B, _toggles.music.source_itunes)
	if (data.A.B && _toggles.music.source_itunes){
		itunes.play();
		console.log('PLAY')
		_toggles.music.playing = true;
	}else{
		itunes.pause();
		console.log('PAUSE')
		_toggles.music.playing = false;
	}
});

firebaseRef.child('music/source_itunes').on('value', function(data){
	if (!data.A.B){
		itunes.pause();
		_toggles.music.playing = false;
		_toggles.music.source_itunes = false;
	}
});

firebaseRef.child('music/source_youtube').on('value', function(data){
	if (data.A.B){
		itunes.pause();
		_toggles.music.playing = false;
		_toggles.music.source_youtube = true;
	}
});

firebaseRef.child('music/next').on('value', function(data){
	if (data.A.B && _toggles.music.source_itunes){
		itunes.next(function(name, artist, album){
			console.log(arguments[0].artist)
			firebaseRef.child('music').update({ 
				next: false,
				nowPlaying: arguments[0].artist + ' – ' + arguments[0].name,
				openMusic: arguments[0].artist
			});
		});		
	}
});


itunes.on('playing', function(data){
	console.log('PLAYING', data)

	_toggles.music.source_itunes = true;
	_toggles.music.playing = true;

	if (data !== null){
		firebaseRef.child('music').update({
			playing: true,
			source_itunes: true,
			source_youtube: false,
			nowPlaying: data.artist + ' – ' + data.name,
			openMusic: data.artist
		});
	}
});

itunes.on('paused', function(data){
	console.log('PAUSING')
	firebaseRef.child('music').update({ playing: false });
});




firebaseRef.child('shareMouse').on('value', function(data){
	if (data.A.B){
		exec('killall ShareMouse');

		setTimeout(function(){
			exec('open -a ShareMouse');
			firebaseRef.update({ shareMouse: false });
		}, 1500);
	}
});



firebaseRef.child('dimScreens').on('value', function(data){
	if (data.A.B){
		exec(
			'/System/Library/Frameworks/ScreenSaver.framework/Resources/ScreenSaverEngine.app/Contents/MacOS/ScreenSaverEngine',
			function(error, stdout, stderr) {
				firebaseRef.update({ dimScreens: false });
			}
		);
	}
});











