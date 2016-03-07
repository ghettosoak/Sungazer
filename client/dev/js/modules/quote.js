$(function($){
	var $quote = $('.quote_interior'),
		quoteGetter = function(){
			$.ajax({
				url: 'http://quotesondesign.com/api/3.0/api-3.0.json',
				dataType: 'jsonp',
			}).done(function(data) {

				$quote.addClass('leaving');

				setTimeout(function(){
					$quote.removeClass('leaving')
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
							$quote.removeClass('entering');

						}, window.transitionTime * 2);
				}, window.transitionTime);

				setTimeout(function(){
					if ($quote.find('p').outerHeight(true) > $quote.parent().height())
						$quote.parent().addClass('smallish')
				})
			}).fail(function(error){
				console.log(error);
			});
		};


	window.quoting = function(){
		setInterval(quoteGetter, 300000);
		quoteGetter();
	}

});
