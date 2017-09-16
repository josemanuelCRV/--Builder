

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
	
	// ARCHEYPE Selector
	$('#archetype-selector').on('change',function() {
		var e = document.getElementById("archetype-selector");
		var selectedOption = e.options[e.selectedIndex].value;
		console.log('[ready]:[archetype-selector]: showing: ' + selectedOption);

		// set fields according archetype 
		showInputsByArchetype(selectedOption);
	});
	// Init archetype selector when document.ready
	$('#archetype-selector').material_select();




	// SAP TYPE Selector
	$('#sap-selector').on('change',function() {
		var e = document.getElementById("sap-selector");
		var typeSelected = e.options[e.selectedIndex].value;
		console.log('[ready]:[sap-selector]: showing sap type: ' + typeSelected);

			// set fields according archetype 
			showInputsBySapType(typeSelected);
		});
	// Init sapType selector when document.ready
	$('#sap-selector').material_select();



	// Inicializa tootip cuando está ready
	$('.tooltipped').tooltip({delay: 50});

	// Inicializa actualiza inputs cuando está ready
	Materialize.updateTextFields();

});




// Set fields according archetype
function showInputsByArchetype(selectedOption){
	console.log('recibido en showInputsByArchetype: ' + selectedOption);

	switch (selectedOption)
	{

		case 'lite': 
			console.log("[showInputsByArchetype]: case LITE")
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
			console.log("[showInputsByArchetype]: case FLOW")
			break;



		case 'sap': 
			console.log("[showInputsByArchetype]: case SAP")
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
			console.log("[showInputsByArchetype]: case ENR")
			break;



		default:  console.log("[showInputsByArchetype]: default")
            //document.write("Exiting switch block");

        }
    }


    //showInputsBySapType
    function showInputsBySapType(typeSelected){

    	switch (typeSelected)	{

    		case 'sit': 
    			console.log("[showInputsBySapType]: case SAP-SIT")
				// Mostramos si campos ocultados por 'case tabit'
				document.getElementById('in').style.display = 'block';
				break;

			case 'tabit': 
				console.log("[showInputsBySapType]: case SAP-TABIT")
				// Ocultamos campos del Lite al no requerirse en el SAP
				document.getElementById('in').style.display = 'none';
				break;

			case 'sng': 
				console.log("[showInputsBySapType]: case SAP-SNG")
				// Mostramos si campos ocultados por 'case tabit'
				document.getElementById('in').style.display = 'block';
				break;

			}
		}


// Commit Type: chore, docs, feat, fix, refactor, style, or test.
// feat(selectorArchetype):show fields according to archetype-[LITE/SAP]
// feat()