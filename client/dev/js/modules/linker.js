$(function($){

	$('body').on('touchstart', 'a', function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log('yeah!')
		$(this).addClass('pressing');
		window._Firebase.update({ link: $(this).attr('href') });
	});

	$('body').on('touchend', 'a', function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log($(this))
		$(this).removeClass('pressing');
		$('#link')[0].play();
	});

	$('body').on('touchstart', '.press', function(e) {
		var $that = $(this);
		e.preventDefault();
		e.stopPropagation();
		$that.addClass('pressing');
		!$that.hasClass('noLink') && window._Firebase.update({ link: $that.attr('data-href') });
	});

	$('body').on('touchend', '.press', function(e) {
		var $that = $(this);
		e.preventDefault();
		e.stopPropagation();
		$that.removeClass('pressing');
		$('#link')[0].play();
	});
});
