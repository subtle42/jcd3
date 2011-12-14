
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