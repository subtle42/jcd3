//As mentioned at http://en.wikipedia.org/wiki/XMLHttpRequest

if( !window.XMLHttpRequest ) XMLHttpRequest = function()
{
	try{ return new ActiveXObject("Msxml2.XMLHTTP.6.0") }catch(e){}
	try{ return new ActiveXObject("Msxml2.XMLHTTP.3.0") }catch(e){}
	try{ return new ActiveXObject("Msxml2.XMLHTTP") }catch(e){}
	try{ return new ActiveXObject("Microsoft.XMLHTTP") }catch(e){}
	throw new Error("Could not find an XMLHttpRequest alternative.")
};


//Makes an AJAX request to a local server function w/ optional arguments

//functionName: the name of the server's AJAX function to call
//opt_argv: an Array of arguments for the AJAX function


function Request(function_name, opt_argv, callback) {
	//var callback = null;
	var async = true;
	
	var body = "action=" + function_name;
	for(var key in opt_argv){
		body += "&" + key + "=" + opt_argv[key];
	}

	// Create an XMLHttpRequest 'POST' request w/ an optional callback handler
	var req = new XMLHttpRequest();
	req.open('POST', '/rpc', true);

	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", body.length);
	req.setRequestHeader("Connection", "close");

	if (async) {
		req.onreadystatechange = function() {
			if(req.readyState == 4 && req.status == 200) {
				var response = null;
				try {
					response = JSON.parse(req.responseText);
				} catch (e) {
					response = req.responseText;
				}
				callback(response);
			}
		}
	}
	// Make the actual request
	req.send(body);
}

function doAdd(){
	var input = new Object();
	input.num1 = $('#num1').val();
	input.num2 = $('#num2').val();	

	Request('Add', input, onAddSuccess);
}

function onAddSuccess(response){
	$('#result').val(response);
}

