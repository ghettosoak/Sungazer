// Vendor files
var $ = window.jQuery = window.$ = require('./vendor/jquery-1.11.1.min');
var $ = window._ = require('./vendor/underscore-min');

var $$_ = window.$$_ = require('./shared/core'); 

// require('./vendor/jquery.ui.touch-punch.min'); 

require('./vendor/chosen.jquery.min'); 
require('./vendor/firebase'); 
require('./vendor/conic-gradient'); 
require('./vendor/clndr'); 
window.moment = require('./vendor/moment'); 

// include your scripts here
require('./modules/background'); 
require('./modules/linker'); 
require('./modules/clock'); 
require('./modules/weather'); 
require('./modules/news'); 
require('./modules/stats'); 
require('./modules/quote'); 
require('./modules/calendar'); 
require('./modules/music'); 

require('./modules/init');

window._Firebase = new Firebase('https://sungazer.firebaseIO.com/');

// app.initialize();

window.transitionTime = 200;

window.isApp = false;

document.addEventListener('deviceReady', deviceReady, false);

document.addEventListener("touchstart", function() {},false);

function deviceReady(){
	App.initialize();
	console.log(Media);
	screen.lockOrientation('landscape');
	window.isApp = true;
}

window.fix = function()
{
    var el = this;
    var par = el.parentNode;
    var next = el.nextSibling;
    par.removeChild(el);
    setTimeout(function() {par.insertBefore(el, next);}, 0)
}



// template for new JS files, a la browserify
$(function($){
	
});







