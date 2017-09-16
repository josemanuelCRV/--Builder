

function generatePackageName() {
	var groupId = document.forms['form']['groupId'].value;
	var artifactId = document.forms['form']['artifactId'].value;

	if (groupId != "" || artifactId != "") {
		document.forms['form']['packageName'].value = groupId + "."	+ artifactId;
	} else if (groupId === "" || artifactId === "") {
		document.forms['form']['packageName'].value = "";
	}

}

$(document).ready(function() {

	/* this activates the "which columns to display" selectbox */
	$('#column-selector').on('change',function() {

		var e = document.getElementById("column-selector");
		var selectedOption = e.options[e.selectedIndex].value;
		console.log('showing ' + selectedOption);

		// set fields according archetype 
		hidingFields(selectedOption);
	});

	// Inicializa selector cuando está ready
	$('#column-selector').material_select();

	// Inicializa tootip cuando está ready
	$('.tooltipped').tooltip({delay: 50});

	// Inicializa actualiza inputs cuando está ready
	Materialize.updateTextFields();

});


function checkSelected(){

	$('#column-selector').on('change',function() {

		var e = document.getElementById("column-selector");
		var selectedOption = e.options[e.selectedIndex].value;
		console.log('showing ' + selectedOption);

		// set fields according archetype 
		hidingFields(selectedOption);
	});

}



function hidingFields(selectedOption){
	console.log('recibido en hidingFields: ' + selectedOption);

	switch (selectedOption)
	{
		case 'lite': 
		console.log(" case lite")

		// Ocultar campos del SAP al no requerirse en el Lite
		document.getElementById('type').style.display = 'none';
		document.getElementById('servicioName').style.display = 'none';
		document.getElementById('servicioVersion').style.display = 'none';
		document.getElementById('cacheable').style.display = 'none';
		document.getElementById('in').style.display = 'none';
		document.getElementById('sapVersion').style.display = 'none';
		document.getElementById('sapDescription').style.display = 'none';
		document.getElementById('sapFolder').style.display = 'none';	

		// Mostrar el conjunto de campos del LITE
		document.getElementById('flowNameFolder').style.display = 'block';
		document.getElementById('fuid').style.display = 'block';
		document.getElementById('sbpVersion').style.display = 'block';
		document.getElementById('action1').style.display = 'block';
		document.getElementById('action1Composite').style.display = 'block';
		document.getElementById('servicio1Name').style.display = 'block';
		document.getElementById('servicio1Version').style.display = 'block';
		break;




		case 'flow': 
		console.log(" case flow")
		break;



		case 'sap': 
		console.log("case sap")
		// Ocultamos campos del Lite al no requerirse en el SAP
		document.getElementById('flowNameFolder').style.display = 'none';
		document.getElementById('fuid').style.display = 'none';
		document.getElementById('sbpVersion').style.display = 'none';
		document.getElementById('action1').style.display = 'none';
		document.getElementById('action1Composite').style.display = 'none';
		document.getElementById('servicio1Name').style.display = 'none';
		document.getElementById('servicio1Version').style.display = 'none';

		// Mostrar el conjunto de campos del SAP
		document.getElementById('type').style.display = 'block';
		document.getElementById('servicioName').style.display = 'block';
		document.getElementById('servicioVersion').style.display = 'block';
		document.getElementById('cacheable').style.display = 'block';
		document.getElementById('in').style.display = 'block';
		document.getElementById('sapVersion').style.display = 'block';
		document.getElementById('sapDescription').style.display = 'block';
		document.getElementById('sapFolder').style.display = 'block';
		break;




		case 'enr': 
		console.log("case enr")
		break;



		default:  console.log("nada default")
            //document.write("Exiting switch block");

        }
    }




