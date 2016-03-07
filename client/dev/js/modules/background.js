$(function($){
	var $body = $('body'),
		$background = $body.find('.background'),
		$bg0 = $body.find('.bg0'),
		$bg1 = $body.find('.bg1'),
		first = true,
		bgToggle = true,
		counter = 0,
		URL = 'https://source.unsplash.com/random/1024x768',		
		backgroundGetter = function(which){
			$background.find('.bg' + which ).load(function(){
				if (first){
					$body.addClass('ready');
					$background.addClass('first');
				}
				else
					$background.removeClass('first');

				first = false;

				$(this).addClass('active')
					.siblings().removeClass('active')
				
			}).attr('src', URL)
		};

	window.backgroundToggler = function(){
		backgroundGetter(counter++ % 2);
	},

	window.backgrounding = function(){
		setInterval(window.backgroundToggler, 900000);
		window.backgroundToggler();
	}

	window.devBackground = function(){
		$body.addClass('ready');
		$background.css('background-image', 'url(assets/img/waves.jpg)');
	}
});













