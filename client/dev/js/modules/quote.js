$(function($){
	var $quote = $('.quote'),
		$quoteInterior = $quote.find('.quote_interior'),
		quoteGetter = function(){
			$.ajax({
				url: 'http://quotesondesign.com/api/3.0/api-3.0.json',
				dataType: 'jsonp',
			}).done(function(data) {

				$quoteInterior.addClass('leaving');

				setTimeout(function(){
					$quoteInterior.removeClass('leaving')
						.addClass('entering')
						.attr('data-href', 'https://www.google.com/search?q=' + data.author)
						.removeClass('smallish')
						.empty()
						.html(
							'<p>' + data.quote + '</p>'+
							// '<p>For me, design is like choosing what I\'m going to wear for the day - only much more complicated and not really the same at all.  </p>'+
							'<span>— ' + data.author + '</span>'+ 
							'<div class="flasher">'+
								'<p><span class="searcher"></span>' + data.author + '</p>'+
							'</div>'
						);

						setTimeout(function(){
							$quoteInterior.removeClass('entering');

							setTimeout(function(){
								console.log(
									$('.quote').find('p').outerHeight(true) + $('.quote').find('span').outerHeight(true),
									229,
									(
										$('.quote').find('p').outerHeight(true) + 
										$('.quote').find('span').outerHeight(true)
									) > 229
								)
								if (
									(
										$('.quote').find('p').outerHeight(true) + 
										$('.quote').find('span').outerHeight(true)
									) > 229
								){
									$quote.addClass('smallish')
								}
								else{
									$quote.removeClass('smallish')
								}

							}, window.transitionTime * 5);
						}, window.transitionTime)

				}, window.transitionTime);

			}).fail(function(error){
				console.log(error);
			});
		};


	window.quoting = function(){
		setInterval(quoteGetter, 300000);
		quoteGetter();
	}

});
