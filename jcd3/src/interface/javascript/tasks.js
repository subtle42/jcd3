function taskPageLoad() {
	var pageLoad = $('#topLevelTasks');
	var myValue = pageLoad.val();
	if(myValue == "False"){
		pageLoad.value = 'True';
		var input = Object();
		input.findAttr = "";
		Request('get_top_level_tasks', input, getTopLevelTaskSuccess);
	}
}

function getTopLevelTaskSuccess(response){
    var myData = createTaskSectionHtml(response);
    $('#taskList').html(myData.html);
}

function getSubTasks(id){
	var input = Object();
	input.taskId = id;
	Request('get_sub_tasks', input, onGetSubTasksSuccess);
}

function onGetSubTasksSuccess(response){
    var myData = createTaskSectionHtml(response);
    $('#sub_'+myData.parent).html(myData.html);
}

function showHideGetSubTasks(id){
	var formattedId = id.replace(/\./g, "");
	var hiddenField = $('#hid_'+formattedId);

	//Check is the hidden field exists
	if(hiddenField.length != 0){
		var currentField = $('#sub_'+formattedId);
		//Runs if field is not visible
		if(currentField.is(':visible')){
			currentField.hide();
		}
		//Runs if field is visible
		else{
			currentField.show();
		}
	}
	else{
		getSubTasks(id);
	}
}

function createTaskSectionHtml(response){
	var myData = Object();
	var myHtml = "";
	var parentId = ""
    
	for(i=0; i<response.length; i++){
		var item = response[i];
		parentId = item['parent_id'].replace(/\./g, "");

		switch(item['task_level']){
		case 1:
		case 2:
		case 3:
			var mySection = Object();
			mySection.class = "cstl";
			mySection.id = item["task_id"];
			mySection.onclick = "showHideGetSubTasks(id)";
			var innerText = item["task_id"] + " " + item["name"];
			myHtml += createHtmlElement("section", mySection, innerText);
			
			var myInput = Object();
			myInput.type = "hidden";
			myInput.id = "hid_" + parentId;
			myHtml += createHtmlElement("input", myInput, "");
			
			var myDiv = Object();
			myDiv.class = "cstl_sub";
			myDiv.id = "sub_" + item["task_id"].replace(/\./g, "");
			myHtml += createHtmlElement("div", myDiv, "");
			break;
		case 4:
			var mySection = Object();
			mySection.class = "cstl";
			mySection.id = item["task_id"];
			var innerText = item["task_id"] + " " + item["description"];
			myHtml += createHtmlElement("section", mySection, innerText);
			
			var myInput = Object();
			myInput.type = "hidden";
			myInput.id = "hid_" + parentId;
			myHtml += createHtmlElement("input", myInput, "");
			break;
		}
	}
	myData.html = myHtml;
	myData.parent = parentId.replace(/\./g, "");
	return myData
}
