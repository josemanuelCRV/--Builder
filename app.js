var path = require('path');
var express = require('express');
var nrc = require('node-run-cmd');
var zipFolder = require('zip-folder');
var bodyParser = require('body-parser');
var rimraf = require('rimraf');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/', express.static(path.join(__dirname, 'public')));


app.post('/passdata', function(req, res) {
    console.log(`printing ${JSON.stringify(req.body, null, 2)}`);

    const archselector = req.body.archetypeSelector;
    console.log(`[POST]: Recived archetype: ` + archselector);

    // Commons fields
    const groupId = req.body.groupId;
    const artifactId = req.body.artifactId;
    const version = req.body.version;
    const packageName = req.body.packageName;

    // Lite fields
    const flowNameFolder = req.body.flowNameFolder;
    const fuid = req.body.fuid;
    const sbpVersion = req.body.sbpVersion;
    const action1 = req.body.action1;
    const action1Composite = req.body.action1Composite;
    const servicio1Name = req.body.servicio1Name;
    const servicio1Version = req.body.servicio1Version;

    // SAP fields
    const type = req.body.type;
    const servicioName = req.body.servicioName;
    const servicioVersion = req.body.servicioVersion;
    const cacheable = req.body.cacheable;
    const din = req.body.in;
    const sapVersion = req.body.sapVersion;
    const sapDescription = req.body.sapDescription;
    const sapFolder = req.body.sapFolder;

    // if (archselector != '') {
    //     console.log('[OK!!]: Archetype selected - ' + archselector);
    // } else {
    //     console.log('[KO - ANY archetype selected] - ' + archselector);
    // 	   Return message error to client
    // }

    switch (archselector) {
        case 'lite':
            console.log("[POST to runCommand]: case LITE")
            runCommand(res, {
                archselector,
                groupId,
                artifactId,
                version,
                packageName,
                flowNameFolder,
                fuid,
                sbpVersion,
                action1,
                action1Composite,
                servicio1Name,
                servicio1Version
            });
            break;

        case 'flow':
            console.log("[POST to runCommand]: case FLOW")
            runCommand(res, {
                archselector,
                groupId,
                artifactId,
                version,
                packageName,
                flowNameFolder,
                fuid,
                sbpVersion,
                action1,
                action1Composite,
                servicio1Name,
                servicio1Version
            });
            break;

        case 'sap':
            console.log("[POST to runCommand]: case SAP")
            runCommand(res, {
                archselector,
                groupId,
                artifactId,
                version,
                packageName,
                type,
                servicioName,
                servicioVersion,
                cacheable,
                din,
                sapVersion,
                sapDescription,
                sapFolder
            });
            break;

        case 'enr':
            console.log("[POST to runCommand]: case ENR")
            runCommand(res, {
                archselector,
                groupId,
                artifactId,
                version,
                packageName,
                type,
                servicioName,
                servicioVersion,
                cacheable,
                din,
                sapVersion,
                sapDescription,
                sapFolder
            });
            break;
    }
});

function runCommand(res, params) {
    console.log(`[runCommand] Recived on runCommand: ${params.archselector}`);

    switch (`${params.archselector}`) {
        case 'lite': // Run maven command LITE ==> [maven-archetype-quickstart]
            console.log("[Processing runCommand]: case Lite")
            nrc.run(`mvn archetype:generate -DgroupId=${params.groupId} -DartifactId=${params.artifactId} -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false`)
                .then((exitCodes) => {
                    console.log(`exitcodes: ${exitCodes}`);
                    if (exitCodes == 0) {
                    	console.log(`[Command processed OK!]\n[Sending to compressAndSend]`);
                        compressAndSend(res, params);
                    }
                }, (err) => {
                    console.log('error', err);
                });
            break;

        case 'flow': // Run maven command FLOW ==> [maven-archetype-j2ee-simple]
            console.log("[Processing runCommand]: case FLOW")
            nrc.run(`mvn archetype:generate -DgroupId=${params.groupId} -DartifactId=${params.artifactId} -DarchetypeArtifactId=maven-archetype-j2ee-simple -DinteractiveMode=false`)
                .then((exitCodes) => {
                    console.log(`exitcodes: ${exitCodes}`);
                    if (exitCodes == 0) {
                    	console.log(`[Command processed OK!]\n[Sending to compressAndSend]`);
                        compressAndSend(res, params);
                    }
                }, (err) => {
                    console.log('error', err);
                });
            break;

        case 'sap': // Run maven command SAP ==> [maven-archetype-webapp]
            console.log("[Processing runCommand]: case SAP")
            nrc.run(`mvn archetype:generate -DgroupId=${params.groupId} -DartifactId=${params.artifactId} -DarchetypeArtifactId=maven-archetype-webapp -DinteractiveMode=false`)
                .then((exitCodes) => {
                    console.log(`exitcodes: ${exitCodes}`);
                    if (exitCodes == 0) {
                    	console.log(`[Command processed OK!]\n[Sending to compressAndSend]`);
                        compressAndSend(res, params);
                    }
                }, (err) => {
                    console.log('error', err);
                });
            break;

        case 'enr': // Run maven command ENR ==> [archetype-site-simple]
            console.log("[Processing runCommand]: case ENR")
            nrc.run(`mvn archetype:generate -DgroupId=${params.groupId} -DartifactId=${params.artifactId} -DarchetypeArtifactId=archetype-site-simple -DinteractiveMode=false`)
                .then((exitCodes) => {
                    console.log(`exitcodes: ${exitCodes}`);
                    if (exitCodes == 0) {
                    	console.log(`[Command processed OK!]\n[Sending to compressAndSend]`);
                        compressAndSend(res, params);
                    }
                }, (err) => {
                    console.log('error', err);
                });
            break;
    }
}

function compressAndSend(res, params) {
    console.info('[compressAndSend]:[IN]');
    console.info(params);

    zipFolder(path.join(__dirname, `/${params.artifactId}`), path.join(__dirname, `/${params.artifactId}.zip`), function(err) {
        if (err) {
            console.log('Oh Nooo! Something went wrong during file compression...', err);
        } else {
        	console.info('[compressAndSend]: Success!! File compressed\n[calling to sendToClient]');
            sendToClient(res, params);
            console.log('EXCELLENT');
        }
    });
}

function sendToClient(res, params) {
    console.info('sending...');
    const filename = `${params.artifactId}.zip`;
    // res.setHeader('content-type', 'application/zip');
    // res.type('application/zip')
    res.download(path.join(__dirname, './', filename));
    deleteFilesAfterDownload(res, params);
}

function deleteFilesAfterDownload(res, params) {
    const folder = `${params.artifactId}`;
    const zipFolder = `${params.artifactId}.zip`;

    rimraf(path.join(__dirname, './', folder), function() {
        console.log('Folder was deleted successfully!!');
    });
    rimraf(path.join(__dirname, './', zipFolder), function() {
        console.log('Zip Folder was deleted successfully!!');
    });
}

app.listen(3000, function() {
    console.log('bnk-Builder app listening on port 3000!');
});
