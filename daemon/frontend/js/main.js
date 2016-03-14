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
