function generatePackageName() {
    var groupId = document.forms['form']['groupId'].value;
    var artifactId = document.forms['form']['artifactId'].value;

    if (groupId != "" || artifactId != "") {
        document.forms['form']['packageName'].value = groupId + "." + artifactId;
    } else if (groupId === "" || artifactId === "") {
        document.forms['form']['packageName'].value = "";
    }
}



$(document).ready(function() {

    /* this activates the "which columns to display" selectbox */

    // ARCHEYPE Selector
    $('#archetypeSelector').on('change', function() {
        var e = document.getElementById("archetypeSelector");
        var selectedOption = e.options[e.selectedIndex].value;
        console.log('[ready]:[archetypeSelector]: showing: ' + selectedOption);

        // set fields according archetype 
        showInputsByArchetype(selectedOption);
    });
    // Init archetype selector when document.ready
    $('#archetypeSelector').material_select();


    // SAP TYPE Selector
    $('#sapSelector').on('change', function() {
        var e = document.getElementById("sapSelector");
        var typeSelected = e.options[e.selectedIndex].value;
        console.log('[ready]:[sapSelector]: showing sap type: ' + typeSelected);

        // set fields according archetype 
        showInputsBySapType(typeSelected);
    });
    // Init sapType selector when document.ready
    $('#sapSelector').material_select();



    // Init tootip
    $('.tooltipped').tooltip({
        delay: 50
    });

    // Init updateTextField
    Materialize.updateTextFields();

});




// Set fields according archetype
function showInputsByArchetype(selectedOption) {
    console.log('recibido en showInputsByArchetype: ' + selectedOption);

    switch (selectedOption) {

        case 'lite':
            console.log("[showInputsByArchetype]: case LITE")
            // Hide SAP fields when Lite is selected
            document.getElementById('type').style.display = 'none';
            document.getElementById('servicioName').style.display = 'none';
            document.getElementById('servicioVersion').style.display = 'none';
            document.getElementById('cacheable').style.display = 'none';
            document.getElementById('in').style.display = 'none';
            document.getElementById('sapVersion').style.display = 'none';
            document.getElementById('sapDescription').style.display = 'none';
            document.getElementById('sapFolder').style.display = 'none';

            // Show set Lite fields
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
            // Hide Lite fields when SAP is selected
            document.getElementById('flowNameFolder').style.display = 'none';
            document.getElementById('fuid').style.display = 'none';
            document.getElementById('sbpVersion').style.display = 'none';
            document.getElementById('action1').style.display = 'none';
            document.getElementById('action1Composite').style.display = 'none';
            document.getElementById('servicio1Name').style.display = 'none';
            document.getElementById('servicio1Version').style.display = 'none';

            // Show set SAP fields
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



        default:
            console.log("[showInputsByArchetype]: default")
            //document.write("Exiting switch block");

    }
}


//showInputsBySapType
function showInputsBySapType(typeSelected) {

    switch (typeSelected) {

        case 'sit':
            console.log("[showInputsBySapType]: case SAP-SIT")
            // Show SAP-SIT field, hidden by the TABIT case
            document.getElementById('in').style.display = 'block';
            break;

        case 'tabit':
            console.log("[showInputsBySapType]: case SAP-TABIT")
            // Hide SAP-SIT-SNG fields when TABIT is selected
            document.getElementById('in').style.display = 'none';
            break;

        case 'sng':
            console.log("[showInputsBySapType]: case SAP-SNG")
            // Show SAP-SNG field, hidden by the TABIT case
            document.getElementById('in').style.display = 'block';
            break;

    }
}