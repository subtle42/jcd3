
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
//opt_argv: an Object of arguments for the AJAX function
//callback: the function that should be called on a successful AJAX call
function Request(function_name, opt_argv, callback) {
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

function mainSwitch(myTarget) {
    switch (myTarget) {
    case 'state':
        break;
    case 'tab2':
        break;
    case 'resume':    	
    	resumePageLoad();
    	break;
    case 'tasks':
    	taskPageLoad();
    	break;
    default:
    	break;
    }
}

function showPage(event) {
	//Remove selected tab
	$('.tab').removeClass("active");
    //Hide all page content
	$('.page-content').hide();
	//Select tab that was clicked
    $('#' + event.target.id).addClass("active");
	$('#loading-page').show();
	//Run main javascript for page to be loaded
    mainSwitch(event.target.id);
    $('#loading-page').hide();
    //Show the page associated with the tab that was clicked
    $('#' + event.target.id + '-page').show();
}

function init() {
	//Sets the start page Id
	var startPage = "resume";
	oneTimePageLoadEvents();
	
	//Hide all pages, by default the are all visble
    $('.page-content').hide();
    //Add onclick function to show page associated with a tab
    $('.tab').click(showPage);
    //Run main javascript for page to be loaded
    mainSwitch(startPage);
    //Show starting tab
    $('#'+startPage).addClass("active");
    //Show starting page
    $('#'+startPage+'-page').show();
}

function oneTimePageLoadEvents(){
	$('.resume-bar').click(resumeShowHide);
}

function populateSelectList(jsonList, selectListId){
	//Must be list of SINGLE key value pairs
	//Ex:  [{key1:val1},{key2:val2},{key3:val3}]
	for(var i in jsonList){
		var myObject = jsonList[i];
		for(var key in myObject){
			var myOption = new Option(myObject[key], key);
			$(myOption).html(myObject[key]);
			$("#"+selectListId).append(myOption);
		}
	}
}