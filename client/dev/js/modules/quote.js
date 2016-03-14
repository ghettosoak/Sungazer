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
						.html(
							'<p>' + data.quote + '</p>'+
							'<span>— ' + data.author + '</span>'+
							'<div class="flasher">'+
								'<p><span class="searcher"></span>' + data.author + '</p>'+
							'</div>'
						);

						setTimeout(function(){
							if ($('.quote').find('p').outerHeight(true) > $quote.height())
								$quote.addClass('smallish')
							else
								$quote.removeClass('smallish')

							setTimeout(function(){
								$quoteInterior.removeClass('entering');

							}, window.transitionTime * 3);
						}, window.transitionTime * 2)

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
