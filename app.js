var path = require('path');
var express = require('express');
var nrc = require('node-run-cmd');
var zipFolder = require('zip-folder');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'public')));



app.post('/passdata', function (req, res) {

	console.log(`printing ${JSON.stringify(req.body, null, 2)}`);
	const groupId = req.body.groupId;
	const artifactId = req.body.artifactId;

	if (groupId != '') {
		console.log('groupId dataOk - call-[runCommand]:' + groupId);
		runCommand(res, {
			groupId,
			artifactId
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
}


app.listen(3000, function () {
	console.log('bnk-Builder app listening on port 3000!');
});