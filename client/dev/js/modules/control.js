$(function($){

	var $control = $('.control'),

		$songtitle = $control.find('.songtitle'),

		$shareMouse = $control.find('.shareMouse'),
		$dimScreens = $control.find('.dimScreens'),
		$openMusic = $control.find('.openMusic'),
		$mute = $control.find('.mute'),
		$playpause = $control.find('.playpause'),
		$next = $control.find('.next'),

		_toggles = {
			mute: {
				local: false,
				remote: false
			},
			playing: {
				local: false,
				remote: false
			}
		};

	window._Firebase.child('music/playing').on('value', function(snapshot) {

		_toggles.playing.remote = snapshot.val();

		if (_toggles.playing.remote)
			$playpause.addClass('active');	
		else
			$playpause.removeClass('active');
		
		if (_toggles.playing.local !== _toggles.playing.remote){
			_toggles.playing.local = _toggles.playing.remote;

			window._Firebase.child('music').update({ playing: _toggles.playing.local });
		}
	});

	$playpause.on('touchend', function(){
		$(this).toggleClass('active');
		_toggles.playing.local = !_toggles.playing.local;
		window._Firebase.child('music').update({ playing: _toggles.playing.local });
	});

	window._Firebase.child('mute').on('value', function(snapshot) {

		_toggles.mute.remote = snapshot.val();

		if (_toggles.mute.remote)
			$mute.addClass('active');	
		else
			$mute.removeClass('active');
		
		if (_toggles.mute.local !== _toggles.mute.remote){
			_toggles.mute.local = _toggles.mute.remote;

			window._Firebase.update({ mute: _toggles.mute.local });
		}
	});

	$mute.on('touchend', function(){
		$(this).toggleClass('active');
		_toggles.mute.local = !_toggles.mute.local;
		window._Firebase.update({ mute: _toggles.mute.local });
	});



	window._Firebase.child('music/nowPlaying').on('value', function(snapshot) {
		var currentPlaying = snapshot.val();
		$songtitle.html(currentPlaying);
	});

	window._Firebase.child('music/openMusic').on('value', function(snapshot) {
		var openMusic = snapshot.val();
		$songtitle.attr('data-href', 'https://www.google.com/search?q=' + openMusic);
	});

	// $songtitle.on('touchend', function(){
	// 	window._Firebase.update({ openMusic: true });
	// });



	$shareMouse.on('touchend', function(){
		window._Firebase.update({ shareMouse: true });
	});

	$dimScreens.on('touchend', function(){
		window._Firebase.update({ dimScreens: true });
	});

	$next.on('touchend', function(){
		window._Firebase.child('music').update({ next: true });
	});

});












