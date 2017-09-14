

function generatePackageName() {
	var groupId = document.forms['form']['groupId'].value;
	var artifactId = document.forms['form']['artifactId'].value;

	if (groupId != "" || artifactId != "") {
		document.forms['form']['packageName'].value = groupId + "."	+ artifactId;
	} else if (groupId === "" || artifactId === "") {
		document.forms['form']['packageName'].value = "";
	}

}


/*submitForm = function () {
   // Get the first form with the name
   // Usually the form name is not repeated
   // but duplicate names are possible in HTML
   // Therefore to work around the issue, enforce the correct index
   var frm = document.getElementsByName('form')[0];
   frm.submit(); // Submit the form
   frm.reset();  // Reset all form data
   return false; // Prevent page refresh
}*/

