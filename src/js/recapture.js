/* jshint browser: true,  esversion: 6 */
/* global $, alert, sha1, tlmkValidator, recaptureFileValidator */

$("#clear").on("click", function(){
	$("#errorHeaders, #errorRecords").hide();
	$("#recordsNumber, #fileHash").text(" ");
});

$('#submit').on('click', function() {
	
	$("button").css("cursor", "progress");
	
	var ext = $('#files').val().split('.').pop().toLowerCase();
	if ( $.inArray(ext, ['csv']) == -1 ) {
		$("#errorHeaders, #errorRecords").hide();
		alert("O no has elegido un fichero o tienes una extensión de fichero inválida. Tienes que elegir un fichero .csv");
	$("button").css("cursor", "pointer");
	} else {
			$('input[type=file]').parse({
			config: {
				header: true,
				complete: function(results, file) {

					$("#errorHeaders, #errorRecords").hide();
					// console.log('This file done:', file);					
					// console.log(results.data);
					// console.log(results.meta.fields);
					
					var uniqueContent = JSON.stringify (results.data);
					var hashedUniqueContent = sha1(uniqueContent);
					$("#fileHash").text(hashedUniqueContent);
					
					// Check header fields and if they are not correct, display diferences.
					if ( recaptureFileValidator.checkFields( results.meta.fields ) !== true ) {
						$("#errorHeaders").show();
						$("#recordsNumber").text(" ");
						$("#correctHeaders").html( tlmkValidator.arrayToHtmlList( recaptureFileValidator.fields ) );
						$("#headersInTheFile").html( tlmkValidator.arrayToHtmlList( results.meta.fields ) );
						
					} else {
						// Parse csv body rows
						var errorsInRecordS = "";
						results = tlmkValidator.clean(results);		
						$("#recordsNumber").text( results.data.length );

						for (var n in results.data) {
							if (results.data.hasOwnProperty(n)) {
								errorsInRecordS = errorsInRecordS + recaptureFileValidator.checkCsvData(n, results.data[n]);										
							}
						}
						if ( errorsInRecordS.length >= 1 ) {
							$("#errorRecords pre").text( errorsInRecordS );
							$("#errorRecords").show();
						}							
					}
					
					$("button").css("cursor", "pointer");
					
				}
			},
			complete: function() {
				// console.log('All files done!');
			}
		});

	}

});