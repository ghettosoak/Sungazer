(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Vendor files
// var $ = window.jQuery = window.$ = require('./vendor/jquery-1.11.1.min');

// var $$_ = window.$$_ = require('./shared/core'); 

// require('./vendor/firebase'); 

// include your scripts here
require('./modules/opener'); 
// require('./modules/music'); 

// init some things
// $(function($){

// });

window._Firebase = new Firebase('https://sungazer.firebaseIO.com/');

var musicCtrl = require('./modules/musicCtrl');
// usersRef now refers to the 'users' database location

// template for new JS files, a la browserify
// $(function($){

// });

window.init = function() {
    window.initGapi(); // Calls the init function defined on the window
}

var app = angular.module(
	'sungazer', 
	[
		'firebase',
		'ui.sortable',
		'cfp.hotkeys',
		'ngSanitize'
	]
);

app.factory('music', ['$firebaseObject',
	function($firebaseObject) {
		return function() {
			var ref = window._Firebase.child('music');
			return $firebaseObject(ref);
		};
	}
]);

app.controller('musicCtrl', 
	[
		'$controller',
		'$rootScope', 
		'$scope',
		'music',
		musicCtrl
	]
);

app.service('googleService', ['$http', '$q', function ($http, $q) {

    var deferred = $q.defer();
    this.googleApiClientReady = function () {
        gapi.client.setApiKey('YOU API KEY');
        gapi.client.load('youtube', 'v3', function() {
            var request = gapi.client.youtube.playlistItems.list({
                part: 'snippet',
                playlistId: 'PLila01eYiSBjOtR8oqXkY0i5c1QS6k2Mu',
                maxResults: 8
            });
            request.execute(function(response) {
                deferred.resolve(response.result);
            });
        });
        return deferred.promise;
    };
}])

},{"./modules/musicCtrl":2,"./modules/opener":3}],2:[function(require,module,exports){

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

},{}],3:[function(require,module,exports){
$(function($){

	var first = true;

	window._Firebase.child('link').on('value', function(data){
		if (!first){
			console.log('yeah!', data)

			win = window.open(data.A.B, '_blank');
			win.focus();
		}
		first = false;
	})

});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9qcy9tYWluLmpzIiwiLi4vanMvbW9kdWxlcy9tdXNpY0N0cmwuanMiLCIuLi9qcy9tb2R1bGVzL29wZW5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gVmVuZG9yIGZpbGVzXG4vLyB2YXIgJCA9IHdpbmRvdy5qUXVlcnkgPSB3aW5kb3cuJCA9IHJlcXVpcmUoJy4vdmVuZG9yL2pxdWVyeS0xLjExLjEubWluJyk7XG5cbi8vIHZhciAkJF8gPSB3aW5kb3cuJCRfID0gcmVxdWlyZSgnLi9zaGFyZWQvY29yZScpOyBcblxuLy8gcmVxdWlyZSgnLi92ZW5kb3IvZmlyZWJhc2UnKTsgXG5cbi8vIGluY2x1ZGUgeW91ciBzY3JpcHRzIGhlcmVcbnJlcXVpcmUoJy4vbW9kdWxlcy9vcGVuZXInKTsgXG4vLyByZXF1aXJlKCcuL21vZHVsZXMvbXVzaWMnKTsgXG5cbi8vIGluaXQgc29tZSB0aGluZ3Ncbi8vICQoZnVuY3Rpb24oJCl7XG5cbi8vIH0pO1xuXG53aW5kb3cuX0ZpcmViYXNlID0gbmV3IEZpcmViYXNlKCdodHRwczovL3N1bmdhemVyLmZpcmViYXNlSU8uY29tLycpO1xuXG52YXIgbXVzaWNDdHJsID0gcmVxdWlyZSgnLi9tb2R1bGVzL211c2ljQ3RybCcpO1xuLy8gdXNlcnNSZWYgbm93IHJlZmVycyB0byB0aGUgJ3VzZXJzJyBkYXRhYmFzZSBsb2NhdGlvblxuXG4vLyB0ZW1wbGF0ZSBmb3IgbmV3IEpTIGZpbGVzLCBhIGxhIGJyb3dzZXJpZnlcbi8vICQoZnVuY3Rpb24oJCl7XG5cbi8vIH0pO1xuXG53aW5kb3cuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHdpbmRvdy5pbml0R2FwaSgpOyAvLyBDYWxscyB0aGUgaW5pdCBmdW5jdGlvbiBkZWZpbmVkIG9uIHRoZSB3aW5kb3dcbn1cblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFxuXHQnc3VuZ2F6ZXInLCBcblx0W1xuXHRcdCdmaXJlYmFzZScsXG5cdFx0J3VpLnNvcnRhYmxlJyxcblx0XHQnY2ZwLmhvdGtleXMnLFxuXHRcdCduZ1Nhbml0aXplJ1xuXHRdXG4pO1xuXG5hcHAuZmFjdG9yeSgnbXVzaWMnLCBbJyRmaXJlYmFzZU9iamVjdCcsXG5cdGZ1bmN0aW9uKCRmaXJlYmFzZU9iamVjdCkge1xuXHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciByZWYgPSB3aW5kb3cuX0ZpcmViYXNlLmNoaWxkKCdtdXNpYycpO1xuXHRcdFx0cmV0dXJuICRmaXJlYmFzZU9iamVjdChyZWYpO1xuXHRcdH07XG5cdH1cbl0pO1xuXG5hcHAuY29udHJvbGxlcignbXVzaWNDdHJsJywgXG5cdFtcblx0XHQnJGNvbnRyb2xsZXInLFxuXHRcdCckcm9vdFNjb3BlJywgXG5cdFx0JyRzY29wZScsXG5cdFx0J211c2ljJyxcblx0XHRtdXNpY0N0cmxcblx0XVxuKTtcblxuYXBwLnNlcnZpY2UoJ2dvb2dsZVNlcnZpY2UnLCBbJyRodHRwJywgJyRxJywgZnVuY3Rpb24gKCRodHRwLCAkcSkge1xuXG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICB0aGlzLmdvb2dsZUFwaUNsaWVudFJlYWR5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBnYXBpLmNsaWVudC5zZXRBcGlLZXkoJ1lPVSBBUEkgS0VZJyk7XG4gICAgICAgIGdhcGkuY2xpZW50LmxvYWQoJ3lvdXR1YmUnLCAndjMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gZ2FwaS5jbGllbnQueW91dHViZS5wbGF5bGlzdEl0ZW1zLmxpc3Qoe1xuICAgICAgICAgICAgICAgIHBhcnQ6ICdzbmlwcGV0JyxcbiAgICAgICAgICAgICAgICBwbGF5bGlzdElkOiAnUExpbGEwMWVZaVNCak90UjhvcVhrWTBpNWMxUVM2azJNdScsXG4gICAgICAgICAgICAgICAgbWF4UmVzdWx0czogOFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXF1ZXN0LmV4ZWN1dGUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlLnJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH07XG59XSlcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihcblx0JGNvbnRyb2xsZXIsXG5cdCRyb290U2NvcGUsIFxuXHQkc2NvcGUsXG5cdG11c2ljLFxuXHRnb29nbGVTZXJ2aWNlXG4pIHtcblxuXHRjb25zb2xlLmxvZygneWVhaCEnKTtcblxuXHRtdXNpYygpLiRiaW5kVG8oJHNjb3BlLCAnbXVzaWMnKVxuXHRcdC50aGVuKGZ1bmN0aW9uKHVuYmluZGVyKSB7XG5cdFx0XHRjb25zb2xlLmxvZyh0eXBlb2YgJHNjb3BlLm11c2ljLnlvdXR1YmUuc2luZ2xldG9ucylcblx0XHR9KVxuXG5cdCRzY29wZS5ncmFiVmlkZW8gPSBmdW5jdGlvbihpbmNvbWluZyl7XG5cblx0XHR2YXIgcGFyYW07XG5cblx0XHRpZiAoaW5jb21pbmcuaW5kZXhPZignaHR0cDovLycpIDwgMClcblx0XHRcdHBhcmFtID0gJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3lvdXR1YmUvdjMvdmlkZW9zP3BhcnQ9c25pcHBldCZpZD0nICsgaW5jb21pbmcgKyAnJmtleT1BSXphU3lBaW5QQ0VCb2ZSVE95c3pnZFhpOUc2dkd1UmY3WFFZVlknO1xuXHRcdGVsc2Vcblx0XHRcdHBhcmFtID0gaW5jb21pbmc7XG5cblx0XHQkLmFqYXgoe1xuXHRcdFx0ZGF0YVR5cGU6J0pTT05QJyxcblx0XHRcdHVybDogcGFyYW1cblx0XHR9KS5kb25lKCBmdW5jdGlvbih0aGVUaXRsZSl7XG5cblx0XHRcdGNvbnNvbGUubG9nKHRoZVRpdGxlKVxuXG5cdFx0XHQvLyAkc2NvcGVcblx0XHR9KVxuXHR9XG5cblx0JHNjb3BlLmlucHV0S2V5dXAgPSBmdW5jdGlvbihlKXtcblx0XHRjb25zb2xlLmxvZyhlLCBlLmtleUNvZGUpXG5cblx0XHRpZiAoZS5rZXlDb2RlID09PSAxMyl7XG5cdFx0XHQkc2NvcGUuZ3JhYlZpZGVvKCRzY29wZS5zaW5nbGV0b24uaW5wdXQpO1xuXHRcdH1cblx0fVxuXG5cblxufTtcbiIsIiQoZnVuY3Rpb24oJCl7XG5cblx0dmFyIGZpcnN0ID0gdHJ1ZTtcblxuXHR3aW5kb3cuX0ZpcmViYXNlLmNoaWxkKCdsaW5rJykub24oJ3ZhbHVlJywgZnVuY3Rpb24oZGF0YSl7XG5cdFx0aWYgKCFmaXJzdCl7XG5cdFx0XHRjb25zb2xlLmxvZygneWVhaCEnLCBkYXRhKVxuXG5cdFx0XHR3aW4gPSB3aW5kb3cub3BlbihkYXRhLkEuQiwgJ19ibGFuaycpO1xuXHRcdFx0d2luLmZvY3VzKCk7XG5cdFx0fVxuXHRcdGZpcnN0ID0gZmFsc2U7XG5cdH0pXG5cbn0pOyJdfQ==
