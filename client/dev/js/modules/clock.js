$(function($){

	var $clock = $('.clock');

	if (window.isApp){
		var tick = new Media('assets/sound/tick.wav');
	}

	var theClock = function(){
		var now = window.moment(),
			hours = now.hour(),
			minutes = now.minute(),
			seconds = now.second();

		$clock.find('.hours').css('transform',   'rotate(' + ( ( .5 * ( 60 * hours + minutes ) ) - 180 ) + 'deg)')
		$clock.find('.minutes').css('transform', 'rotate(' + ( ( minutes * 6 ) - 180 ) + 'deg)')
		$clock.find('.seconds').css('transform', 'rotate(' + ( ( seconds * 6 ) - 180 ) + 'deg)')

		if (window.isApp){
			tick.play();
		}else{
			$('#clock_tick')[0].play()
		}
	};


	window.clocking = function(){
		setInterval(theClock, 1000);
		theClock();
	}

	$clock.on('touchend', window.backgroundToggler);
});
