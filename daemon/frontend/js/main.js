// Vendor files
var $ = window.jQuery = window.$ = require('./vendor/jquery-1.11.1.min');

var $$_ = window.$$_ = require('./shared/core'); 

require('./vendor/chosen.jquery.min'); 
require('./vendor/firebase'); 

// include your scripts here
require('./modules/opener'); 
// require('./modules/backgrounder'); 

// init some things
$(function($){

});

window._Firebase = new Firebase('https://sungazer.firebaseIO.com/');
// usersRef now refers to the 'users' database location

// template for new JS files, a la browserify
$(function($){

});
