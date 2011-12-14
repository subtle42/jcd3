function resumePageLoad(){
	getResumeXML();
	$('.p-content').hide();		
}

function getResumeXML(){
	var input = new Object();
	input.findattr = "";
	Request('XmlMethods', input, onGetResumeXMLSuccess);
}
function onGetResumeXMLSuccess(response){
	var xml_obj = $(response).find("DistributionGuidelines");
	getDistributionGuidelines(xml_obj);
	xml_obj = $(response).find("ExecutiveSummary");
	getExecutiveSumm(xml_obj);
	xml_obj = $(response).find("Objective");
	getObjective(xml_obj);
	xml_obj = $(response).find("RevisionDate");
	getLastUpdated(xml_obj);
	xml_obj = $(response).find("ContactInfo");
	getContactInfo(xml_obj);
	xml_obj = $(response).find("ResumeId");
	getResumeId(xml_obj);
	xml_obj = $(response).find("EmploymentHistory");
	getEmploymentHistory(xml_obj);
	xml_obj = $(response).find("EducationHistory");
	getEducationHistory(xml_obj);
	xml_obj = $(response).find("LicensesAndCertifications");
	getLicensesAndCertifications(xml_obj);
}

function getResumeId(xml_obj){
	var myText = xml_obj.text(); 
	$("#resumeId").html(myText);
}
function getLastUpdated(xml_obj){
	var myText = xml_obj.text();
	$("#lastUpdated-resume").html(myText);
}
function getExecutiveSumm(xml_obj){
	var myText = xml_obj.text();
	$("#gc-ExecutiveSummary").html(myText);
}
function getObjective(xml_obj){
	var myText = xml_obj.text();
	$("#gc-Objective").html(myText);
}
function getDistributionGuidelines(xml_obj){
	return;
}
function getContactInfo(xml_obj){
	var myText = "";
	var name = ""

	name += $(xml_obj)
			.find("PersonName")
			.find("FormattedName").text();
	$('#name-resume').html(name);

	myText += "Phone: ";
	myText += $(xml_obj)
			.find("ContactMethod")
			.find("Telephone")
			.find("FormattedNumber").text();
	myText += "<br/>";
	myText += "Email: ";
	myText += $(xml_obj)
			.find("ContactMethod")
			.find("InternetEmailAddress").text();
	
	$("#gc-ContactInfo").html(myText);
}
function getEmploymentHistory(xml_obj){
	var myText = "";
	
	$(xml_obj).find("EmployerOrg").each(function(){
		myText += $(this).find("EmployerOrgName").text();
		myText += " - ";
		myText += $(this)
				.find("PositionHistory")
				.find("OrgName")
				.find("OrganizationName").text();
		myText += "<br/>";
		myText += $(this)
				.find("StartDate")
				.find("YearMonth").text();
		myText += " to " + $(this)
				.find("EndDate")
				.find("YearMonth").text();
		myText += "<br/><br/>";
		myText += $(this)
				.find("PositionHistory")
				.find("Description").text();
		myText += "<br/><br/>";
	});
	$("#gc-EmploymentHistory").html(myText);
}
function getEducationHistory(xml_obj){
	var myText = ""; 
	
	$(xml_obj).find("SchoolOrInstitution").each(function(){
		myText += $(this)
				.find("Degree")
				.find("DegreeName").text();
		myText += ", " + $(this)
				.find("Degree")
				.find("DegreeMajor")
				.find("Name").text();
		myText += " - " + $(this)
				.find("Degree")
				.find("DegreeDate")
				.find("YearMonth").text()
		myText += '<br/><a href="http://';
		myText += $(this)
				.find("School")
				.find("InternetDomainName").text();
		myText += '">';
		myText += $(this)
				.find("School")
				.find("SchoolName").text();
		myText += "</a><br/><br/>";
	});
	$("#gc-EducationHistory").html(myText);
}
function getLicensesAndCertifications(xml_obj){
	var myText = "";
	
	$(xml_obj).find("LicenseOrCertification").each(function(){
		myText += $(this)
				.find("Name").text();
		myText += " - " + $(this)
				.find("IssuingAuthority").text();
		myText += "<br/>" + $(this)
				.find("EffectiveDate")
				.find("ValidFrom")
				.find("AnyDate").text();
		myText += " to " + $(this)
				.find("EffectiveDate")
				.find("ValidTo")
				.find("AnyDate").text();
		myText += "<br/>" + $(this)
				.find("Description").text();
	});
			
	$("#gc-LicensesAndCertifications").html(myText);
}

function resumeShowHide(event){
	var obj_id = "gc-" + event.target.id;
	var visible = $('#'+obj_id).is(":visible");
	if(visible == false){
		$('#'+obj_id).show('slow');
	}
	else{
		$('#'+obj_id).hide('slow');
	}
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