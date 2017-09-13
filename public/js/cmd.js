// var groupId = document.forms['form']['groupId'].value;
// var artifactId = document.forms['form']['groupId'].value;


// function passFormToServer(){

// 	fetch("/passdata").then(()=>console.log("desde cmd.js"))
// 	console.log('groupId: ' + groupId);
// }




function runCommand(){
 fetch("/build").then(()=>console.log("desde cmd.js"))
console.log("hola");
}


function generatePackageName() {
	var groupId = document.forms['form']['groupId'].value;
	var artifactId = document.forms['form']['artifactId'].value;

	if (groupId != "" || artifactId != "") {
		document.forms['form']['packageName'].value = groupId + "."	+ artifactId;
	} else if (groupId === "" || artifactId === "") {
		document.forms['form']['packageName'].value = "";
	}

}



// function generateCommand() {
// 	var groupId = document.forms['form']['groupId'].value;
// 	var artifactId = document.forms['form']['artifactId'].value;
// 	var version = document.forms['form']['version'].value;
// 	var packageName = document.forms['form']['packageName'].value;
	


// 	document.forms['form']['commandResult'].value = 
// 		"mvn archetype:generate " +
// 		"-DarchetypeGroupId=org.apache.maven.archetypes " +
// 		"-DarchetypeArtifactId=maven-archetype-quickstart " +
// 		"-DarchetypeVersion=1.1 " +
// 		"-DgroupId=" + groupId + " " + 
// 		"-DartifactId=" + artifactId + " " + 
// 		"-Dversion=" + version + " " + 
// 		"-Dpackage=" + packageName;
// }