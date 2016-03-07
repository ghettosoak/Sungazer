$(function($){
	var $stats = $('.stats'),
	statsTransition = window.transitionTime;

		getStats = function(){
			$.ajax({
				url: 'http://re.ject.ch/sungazer/api/stats',
				method: 'GET',
			}).done(function(data) {

				pieGenerator('.1min', data.loadavg[0])
				pieGenerator('.5min', data.loadavg[1])
				pieGenerator('.15min', data.loadavg[2])
				pieGenerator('.memory', data.freemem / data.totalmem)

				$stats.find('.uptime').html(function(){
					return timeParser(data.uptime);
				});

			}).fail(function(error){
				console.log(error);
			});
		},

		pieGenerator = function(target, percentage){

			setTimeout(function(){

				$stats.find(target)
					.addClass('leaving')

				setTimeout(function(){

					$stats.find(target)
						.removeClass('leaving')
						.addClass('entering')
						.find('.pie').html(function(){
							return new ConicGradient({
								stops: 'white ' + percentage * 100 + '%, transparent 0'
							}).svg
						})

						setTimeout(function(){
							$stats.find(target)
								.removeClass('entering')

						}, window.transitionTime * 2)
				}, window.transitionTime)

			}, statsTransition)

			statsTransition += window.transitionTime;
		}


		timeParser = function(time){
			var numdays = Math.floor(time / 86400),
				numhours = Math.floor((time % 86400) / 3600),
				numminutes = Math.floor(((time % 86400) % 3600) / 60),
				numseconds = ((time % 86400) % 3600) % 60;

			return numdays + ".d " + numhours + ".h " + numminutes + ".m " + numseconds + ".s";
		}



	window.statsing = function(){
		setInterval(getStats, 120000);
		getStats();
	}

});











