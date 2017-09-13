

function generatePackageName() {
	var groupId = document.forms['form']['groupId'].value;
	var artifactId = document.forms['form']['artifactId'].value;

	if (groupId != "" || artifactId != "") {
		document.forms['form']['packageName'].value = groupId + "."	+ artifactId;
	} else if (groupId === "" || artifactId === "") {
		document.forms['form']['packageName'].value = "";
	}

}

