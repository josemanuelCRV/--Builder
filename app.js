var path = require('path');

var express = require('express');
var nrc = require('node-run-cmd');
var zipFolder = require('zip-folder');

var bodyParser = require('body-parser');


const folder = 'dateUtils';
const zipFile = folder + '.zip';

//const groupId = 'com.ejemplo';

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'public')));
// app.use('/', express.static(__dirname + '/public'));

app.post('/passdata', function (req, res) {

	console.log(`printing ${JSON.stringify(req.body, null, 2)}`);

	const groupId = req.body.groupId;

    if (groupId != '') {
    	console.log('groupId dataOk - call-[runCommand]:' + groupId);
    	runCommand(res, {
    		groupId
    	});
    } else {
    	console.log('groupId dataKO:' + groupId);
    }
    //res.send('Got a POST request');
});

// app.put('/user', function (req, res) {
// 	res.send('Got a PUT request at /user');
// });

// app.delete('/user', function (req, res) {
// 	res.send('Got a DELETE request at /user');
// });

// app.use(express.static('public'));



function runCommand(res, params){
	// nrc.run('mkdir foo');

	nrc.run(`mvn.cmd archetype:generate -DgroupId=${params.groupId} -DartifactId=dateUtils -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false`)
	.then((exitCodes) => {
		console.log(`exitcodes: ${exitCodes}`);
		console.log('groupId: ' + groupId)
		if (exitCodes == 0) {
			compressAndSend(res);
		}
	}, (err) => {
		console.log('error', err);
	});
}



function compressAndSend(res) {
	console.info('compressAndSend');

	zipFolder(path.join(__dirname, '/dateUtils'), path.join(__dirname, '/dateUtils.zip'), function(err) {
		if(err) {
			console.log('oh no!', err);
		} else {
			sendToClient(res);
		}
	});

}


function sendToClient(res) {
	console.info('sending...');
	res.download(path.join(__dirname, './', 'dateUtils.zip'));
}


app.listen(3000, function () {
	console.log('bnk-Builder app listening on port 3000!');
});