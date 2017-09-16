var path = require('path');
var express = require('express');
var nrc = require('node-run-cmd');
var zipFolder = require('zip-folder');
var bodyParser = require('body-parser');
var rimraf = require('rimraf');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'public')));



app.post('/passdata', function (req, res) {

	console.log(`printing ${JSON.stringify(req.body, null, 2)}`);
	
	const groupId = req.body.groupId;
	const artifactId = req.body.artifactId;
	const version = req.body.version;
	const packageName = req.body.packageName;
	const flowNameFolder = req.body.flowNameFolder;
	const fuid = req.body.fuid;
	const sbpVersion = req.body.sbpVersion;
	const action1 = req.body.action1;
	const action1Composite = req.body.action1Composite;
	const servicio1Version = req.body.servicio1Version;


	if (groupId != '') {
		console.log('groupId dataOk - call-[runCommand]:' + groupId);
		runCommand(res, {
			groupId,
			artifactId,
			version,
			packageName,
			flowNameFolder,
			fuid,
			sbpVersion,
			action1,
			action1Composite,
			servicio1Version
		});
	} else {
		console.log('groupId dataKO:' + groupId);
	}
});



function runCommand(res, params){

	nrc.run(`mvn.cmd archetype:generate -DgroupId=${params.groupId} -DartifactId=${params.artifactId} -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false`)
	.then((exitCodes) => {
		console.log(`exitcodes: ${exitCodes}`);
		if (exitCodes == 0) {
			compressAndSend(res, params);
		}
	}, (err) => {
		console.log('error', err);
	});
}



function compressAndSend(res, params) {
	console.info('compressAndSend');
	console.info(params);

	zipFolder(path.join(__dirname, `/${params.artifactId}`), path.join(__dirname, `/${params.artifactId}.zip`), function(err){
		if(err) {
			console.log('oh no!', err);
		} else {
			sendToClient(res, params);
			console.log('EXCELLENT');
			
		}
	});
}


function sendToClient(res, params) {
	console.info('sending...');
	const filename = `${params.artifactId}.zip`;

	// res.download(path.join(__dirname, './', '${params.artifactId}.zip'));
	res.download(path.join(__dirname, './', filename));

	deleteFilesAfterDownload(res, params);
}



function deleteFilesAfterDownload(res, params){

	const folder = `${params.artifactId}`;
	const zipFolder = `${params.artifactId}.zip`;

	rimraf(path.join(__dirname, './', folder), function () { console.log('Folder was deleted successfully!!'); });	

	rimraf(path.join(__dirname, './', zipFolder), function () { console.log('Zip Folder was deleted successfully!!'); });

}




app.listen(3000, function () {
	console.log('bnk-Builder app listening on port 3000!');
});


