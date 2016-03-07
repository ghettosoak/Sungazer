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