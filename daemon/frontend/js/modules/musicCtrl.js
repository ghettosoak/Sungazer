
module.exports = function(
	$controller,
	$rootScope, 
	$scope,
	music,
	googleService
) {

	console.log('yeah!');

	music().$bindTo($scope, 'music')
		.then(function(unbinder) {
			console.log(typeof $scope.music.youtube.singletons)
		})

	$scope.grabVideo = function(incoming){

		var param;

		if (incoming.indexOf('http://') < 0)
			param = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + incoming + '&key=AIzaSyAinPCEBofRTOyszgdXi9G6vGuRf7XQYVY';
		else
			param = incoming;

		$.ajax({
			dataType:'JSONP',
			url: param
		}).done( function(theTitle){

			console.log(theTitle)

			// $scope
		})
	}

	$scope.inputKeyup = function(e){
		console.log(e, e.keyCode)

		if (e.keyCode === 13){
			$scope.grabVideo($scope.singleton.input);
		}
	}



};
