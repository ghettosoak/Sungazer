$(function($){

	var $music = $('.music'),
		volume = 5,
		increment = 1,
		isPlaying = false;

	window._Firebase.child('volume').on('value', function(snapshot) {
		volume = snapshot.val();
	});

	window._Firebase.child('playing').on('value', function(snapshot) {
		isPlaying = snapshot.val();
		$music.find('.playpause').data('playing', isPlaying)
	});

	$music.find('.up').on('click', function(){
		window._Firebase.update({ volume: (volume + increment) });
	})

	$music.find('.down').on('click', function(){
		window._Firebase.update({ volume: (volume - increment) });
	})

	$music.find('.playpause').on('click', function(){
		isPlaying = !isPlaying;
		$(this).attr('data-playing', isPlaying)
		window._Firebase.update({ playing: isPlaying });

		console.log(isPlaying)
	})

});
