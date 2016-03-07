var Chrome = require('chrome-remote-interface');
Chrome.New(
	{
		// host: '192.168.2.3',
		// port: Remote Debugging Protocol port. Defaults to 9222.
		url: 'http://google.com'
	}, 
	function (err, tab) {
	    if (!err) {
	        console.log(tab);
	    }
	}
);

