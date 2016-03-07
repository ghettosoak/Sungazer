$(function($){
	window._Firebase.child('background').on('value', function(data){
		console.log('yeah!', data.A.B)

		win = window.open(data.A.B, '_blank');
		win.focus();
	})
});