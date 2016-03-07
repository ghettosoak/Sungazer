$(function($){
	var appID = '0506d7fa7a100f05a8aeb2fcfbd81f73',
		getWeather = function(target, zip, city){

			console.log('http://api.openweathermap.org/data/2.5/weather?q=' + zip + '&appid=' + appID)
		
		$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather?q=' + zip + '&appid=' + appID,
		}).done(function(current_data) {

			console.log(current_data)

			var $city = $('.city.' + target)

			$city;

			$city.children('.temp, .icon').addClass('leaving');

			setTimeout(function(){
				// $city

					$city.children('.temp')
						.removeClass('leaving')
						.html( Math.round(current_data.main.temp - 273.15) )
						.addClass('entering');

					if (current_data.dt > current_data.sys.sunrise && current_data.dt < current_data.sys.sunset) timeOfDay = 'day'
						else timeOfDay = 'night';

					$city.children('.icon')
						.removeClass('leaving')
						.attr({
							'data-weather': current_data.weather[0].id,
							'data-planetary': timeOfDay
						})
						.addClass('entering');

					setTimeout(function(){
						$city.children('.temp, .icon').removeClass('entering');

						$.ajax({
							url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&mode=json&appid=' + appID,
						}).done(function(threeDay_data) {

							$('.city.' + target + ' .threeday').empty()

							var now = window.moment(),
								plus1 = window.moment().add(1, 'days'),
								plus2 = window.moment().add(2, 'days'),
								plus3 = window.moment().add(3, 'days'),
								plus4 = window.moment().add(4, 'days');

							for (var i = 0; i < threeDay_data.list.length; i ++){
								var entry = window.moment(threeDay_data.list[i].dt_txt);

								if (entry.isBetween(plus1, plus2) && entry.hour() === 15)
									threedayer( target, plus1, threeDay_data.list[i], 0 );

								if (entry.isBetween(plus2, plus3) && entry.hour() === 15)
									threedayer( target, plus2, threeDay_data.list[i], 1 );

								if (entry.isBetween(plus3, plus4) && entry.hour() === 15)
									threedayer( target, plus3, threeDay_data.list[i], 2 );
							}
						}).fail(function(error){
							console.log(error);
						});
					}, window.transitionTime * 2);
			}, window.transitionTime);
		}).fail(function(error){
			console.log(error)
		});

	},

	threedayer = function(target, day, data, index){

		var $oneDay = $(
			'<li class="movingAbout entering">' +
				'<p class="day">' + day.format('dddd').substring(0, 2) + '</p>' +
				'<p class="icon" data-weather="' + data.weather[0].id + '" data-planetary="day"></p>' +
				'<p class="threeday_temp">'+
					'<span>' + Math.round(273.15 - data.main.temp_max) + '</span>/'+
					'<span>' + Math.round(273.15 - data.main.temp_min) + '</span>'+
				'</p>' +
			'</li>'
		).appendTo('.city.' + target + ' .threeday');

		setTimeout(function(){
			$oneDay.removeClass('entering')
		}, index * window.transitionTime);
	}

	cities = function(){
		setTimeout(function(){

			getWeather('brn', '3007,ch', 'Bern,ch');
			getWeather('chi', '60187,us', 'Chicago,us');
		}, 2000)
	};

	window.weathering = function(){
		setInterval(cities, 600000);
		cities();
	}
});
