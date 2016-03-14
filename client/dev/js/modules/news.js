$(function($){

	var newsCount = 3,
		$news = $('.news'),
		_List = {
			google: [],
			hackernews: []
		},

	organizeToList = function(target, incomingURL, incomingTitle, index){
		_List[target].push({
			url: incomingURL,
			title: incomingTitle
		});

		if (index === (newsCount - 1)) processToList(target);
	},

	processToList = function(target){

		var googleTransition = window.transitionTime;

		$news.find('.' + target + ' a').each(function(e){

			if (typeof _List[target][e] === 'object'){
				var $that = $(this);

				setTimeout(function(){
					$that.addClass('leaving');

					setTimeout(function(){
						$that.removeClass('leaving')
							.addClass('entering')
							.attr( 'href', _List[target][e].url )
							.html( _List[target][e].title );

							setTimeout(function(){
								$that.removeClass('entering')

							}, window.transitionTime * 2)
					}, window.transitionTime)
				}, googleTransition)

				googleTransition += window.transitionTime;
			}
			// else if ($.isEmptyObject(_List[target][e])){
			// 	$that.parent().addClass('')
			// }
		});
	},

	google_getList = function(){

		$.ajax({
			url: 'https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=*',
			dataType: 'jsonp',
		}).done(function(data) {
			for (var i = 0; i < newsCount; i++){
				organizeToList(
					'google', 
					data.responseData.results[i].unescapedUrl,
					data.responseData.results[i].title,
					i
				);
			}

		}).fail(function(error){
			console.log(error);
		});
	},

	// nyt_getList = function(){

	// 	$.ajax({
	// 		url: 'http://api.nytimes.com/svc/news/v3/content/all/all.json?limit=3&api-key=ab5764065b0805b80af2253d2dc1ca50:1:73658691',
	// 		// dataType: 'jsonp',
	// 	}).done(function(data) {
	// 		console.log(data)
	// 		$news.find('.nyt').empty();
	// 		for (var i = 0; i < newsCount; i++){
	// 			$news.find('.nyt').append(
	// 				'<a href="' + data.results[i].url + '">' + 
	// 					data.results[i].title + 
	// 				'</a>'
	// 			)
	// 		}

	// 	}).fail(function(error){
	// 		console.log(error);
	// 	});
	// },

	HN_getList = function(){

		$.ajax({
			url: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
		}).done(function(data) {
			for (var i = 0; i < newsCount; i++){
				HN_getArticle(data[i], i)
			}

		}).fail(function(error){
			console.log(error);
		});
	},

	HN_getArticle = function(ID, index){
		$.ajax({
			url: 'https://hacker-news.firebaseio.com/v0/item/' + ID + '.json?print=pretty',
		}).done(function(data) {
			organizeToList(
				'hackernews', 
				data.url,
				data.title,
				index
			);
		}).fail(function(error){
			console.log(error);
		});
	};

	sources = function(){
		// nyt_getList();
		google_getList();
		HN_getList();
	};



	window.newsing = function(){
		setInterval(sources, 600000);
		sources();
	}

});
