leadFileValidator = Object.create(tlmkValidator);

leadFileValidator.version = "3.0";

leadFileValidator.fields = ["DCAMPAIGNMEMBERID", "DINCOMPLETE", "DPROCESSNAME", "DACTIONTYPE", "DACTIONTYPESUCCESS", "REgGivingStatus", "LeadStatus", "DLEADID", "DSOURCEADICIONALPARATMK", "Amount", "TransactionsperYear", "CURRENTPAYMENTMETHOD", "SIGNUPDATE", "1st payment Amount", "Transaction Payment Method", "AccountName", "IBAN", "DIDDECAMPANA", "Gender", "DNI", "FirstName", "LastName", "Birthdate", "Street", "PostalCode", "City", "Province", "DCOUNTRY", "PHONE", "MOBILEPHONE", "EMAIL", "MAILOK", "EMAILOK", "SMSOK", "PHONEOK", "PERMITGOVTAXESSENT", "CommunicationPreferenceNotes", "REVCREATECASE", "CASEDESCRIPTION", "CIERREDESC", "RDATE", "ID",  "PAIS", "Donation Start Date", "Facturacion TMK"];

leadFileValidator.CierreGPValues = [
    "NEGATIVO – Motivos económicos – Demasiados gastos",
    "NEGATIVO – Motivos económicos – No tiene trabajo",
    "NEGATIVO – Motivos económicos – Colabora con otras ONG",
    "NEGATIVO – Motivos no económicos – Colabora con otras ONG",
    "NEGATIVO – Motivos no económicos",
    "NEGATIVO – Motivos no identificados",
    "POSITIVO - Socio",
    "POSITIVO - Donativo",
    "CONTACTADO – Positivo pendiente de datos",
    "CONTACTADO – Reprogramar",
    "CONTACTADO – Alta web",
    "NO ÚTIL – Ya es socio",
    "NO ÚTIL – No deja argumentar",
    "NO ÚTIL – Fallecido",
    "NO ÚTIL – Número equivocado",
    "NO ÚTIL – No ha firmado la campaña",
    "NO ÚTIL - Robinson",
    "NO ÚTIL – No contactado (Ilocalizable)"
];

leadFileValidator.checkCsvData = function( rowindex, row ) {

	// console.log (row);
	var prefix, errorsInRecord = "";
	
	rowindex = Number( rowindex );
	rowindex++;
	
	prefix = rowindex + " : " + row["FirstName"] + " " + row["LastName"] + " : ";
	
	// VALIDCIONES INDIVIDUALES
	
	if ( this.isEmpty(row["DCAMPAIGNMEMBERID"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DCAMPAIGNMEMBERID)" + "\n";
	} else if ( row["DCAMPAIGNMEMBERID"].length != 18 ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (DCAMPAIGNMEMBERID)" + "\n";
	}
	
	if ( this.isEmpty(row["DINCOMPLETE"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DINCOMPLETE)" + "\n";
	} else if ( !this.isTrue(row["DINCOMPLETE"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isTrue + " (DINCOMPLETE)" + "\n";
	}
	
	if ( this.isEmpty(row["DPROCESSNAME"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DPROCESSNAME)" + "\n";
	} else if ( !this.isInValidList( row["DPROCESSNAME"], ["TFRImport"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (DPROCESSNAME)" + "\n";		
	}
	
	if ( this.isNotEmpty(row["DACTIONTYPE"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isNotEmpty + " (DACTIONTYPE)" + "\n";
	}
	
	if ( this.isEmpty(row["DACTIONTYPESUCCESS"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DACTIONTYPESUCCESS)" + "\n";
	} else if ( !this.isTrue(row["DACTIONTYPESUCCESS"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isTrue + " (DACTIONTYPESUCCESS)" + "\n";
	}
	
	if ( !this.isInValidList( row["REgGivingStatus"], ["Pending", "", undefined] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (REgGivingStatus)" + "\n";		
	}
	
	if ( this.isEmpty(row["LeadStatus"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (LeadStatus)" + "\n";
	} else if ( !this.isInValidList( row["LeadStatus"], ["Pending", "Existing Lead"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (LeadStatus)" + "\n";
	}
	
	if ( this.isEmpty(row["DLEADID"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DLEADID)" + "\n";
	} else if ( row["DLEADID"].length != 18 ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (DLEADID)" + "\n";
	}
	
	if ( this.isEmpty(row["DSOURCEADICIONALPARATMK"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DSOURCEADICIONALPARATMK)" + "\n";
	} else if ( !this.isInValidList( row["DSOURCEADICIONALPARATMK"], this.DsourceParaTmkAditionalValues ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (DSOURCEADICIONALPARATMK)" + "\n";
	}
	
	if ( this.isNotEmpty(row["Amount"]) && !(Number(row["Amount"]) > 0) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInvalidAmount + " (Amount)" + "\n";				
	}
	
	if ( this.isNotEmpty(row["TransactionsperYear"]) && !this.isInValidList( Number(row["TransactionsperYear"]), this.TransactionsperYearValues ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (TransactionsperYear)" + "\n";				
	}
	
	if ( !this.isInValidList( row["CURRENTPAYMENTMETHOD"], ["Direct Debit", "", undefined] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (CURRENTPAYMENTMETHOD)" + "\n";				
	}
	
	if ( this.isNotEmpty(row["SIGNUPDATE"]) && !this.isValidDate( row["SIGNUPDATE"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.validDate + " (SIGNUPDATE)" + "\n";						
	} else if ( this.isNotEmpty(row["SIGNUPDATE"]) && !this.isPastDate( row["SIGNUPDATE"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isPastDate + " (SIGNUPDATE)" + "\n";								
	}
	
	if ( this.isNotEmpty(row["1st payment Amount"]) && !(Number(row["1st payment Amount"]) > 0) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInvalidAmount + " (1st payment Amount)" + "\n";				
	}
	
	if ( !this.isInValidList( row["Transaction Payment Method"], ["Direct Debit", "", undefined] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (Transaction Payment Method)" + "\n";				
	}
	
	if ( this.isNotEmpty(row["AccountName"]) && row["AccountName"].length > 250 ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (AccountName)" + "\n";
	}
	
	if ( this.isNotEmpty(row["IBAN"]) && !this.isValidIban(row["IBAN"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidIban + " (IBAN)" + "\n";		
	}
    
	if ( this.hasIllegalChars(row["IBAN"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.hasIllegalChars + " (IBAN)" + "\n";		
	}
	
	if ( this.isEmpty(row["DIDDECAMPANA"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DIDDECAMPANA)" + "\n";
	} else if ( row["DIDDECAMPANA"].length != 18 ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (DIDDECAMPANA) Tiene que tener 18 caracteres." + "\n";
	}
	
	if ( !this.isInValidList( row["Gender"], this.genderValues ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (Gender)" + "\n";				
	}
	
	if ( this.isNotEmpty(row["DNI"]) && !this.isValidDniNie(row["DNI"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidDniNie + " (DNI)" + "\n";				
	}
	
	if ( this.isEmpty(row["FirstName"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (FirstName)" + "\n";
	}
	
	if ( this.isEmpty(row["LastName"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (LastName)" + "\n";
	}
	
	if ( this.isNotEmpty(row["Birthdate"]) && !this.isValidDate( row["Birthdate"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.validDate + " (Birthdate)" + "\n";						
	} else if ( this.isNotEmpty(row["Birthdate"]) && !this.isPastDate( row["Birthdate"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isPastDate + " (Birthdate)" + "\n";								
	}
	
	if ( this.isNotEmpty(row["Street"]) && row["Street"].length > 250 ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (Street)" + "\n";
	}
	
	if ( this.isNotEmpty(row["PostalCode"]) && !this.isValidPostCode( row["PostalCode"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidPostCode + " (PostalCode)" + "\n";				
	}
	
	if ( this.isNotEmpty(row["City"]) && row["City"].length > 250 ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (City)" + "\n";	
	}
	
	if ( this.isNotEmpty(row["Province"]) && !this.isInValidList( row["Province"], this.provinceValues ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (Province)" + "\n";				
	}
	
	if ( this.isEmpty(row["DCOUNTRY"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DCOUNTRY)" + "\n";		
	} else if ( row["DCOUNTRY"] != "Spain") {
		errorsInRecord = errorsInRecord + prefix + this.errors.isNotSpain + " (DCOUNTRY)" + "\n";				
	}
	
	if ( this.isNotEmpty(row["PHONE"]) && !this.isValidPhoneLandline(row["PHONE"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidPhoneLandline + " (PHONE)" + "\n";				
	}
	
	if ( this.isNotEmpty(row["MOBILEPHONE"]) && !this.isValidPhoneMobile(row["MOBILEPHONE"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidPhoneMobile + " (MOBILEPHONE)" + "\n";
	}
	
	if ( this.isNotEmpty(row["EMAIL"]) && !this.isValidEmail(row["EMAIL"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidEmail + " (EMAIL)" + "\n";	
	}
	
	if ( this.isEmpty(row["MAILOK"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (MAILOK)" + "\n";		
	} else if ( !this.isValidBolean (row["MAILOK"])) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidBolean + " (MAILOK)" + "\n";	
	}
	
	if ( this.isEmpty(row["EMAILOK"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (EMAILOK)" + "\n";		
	} else if ( !this.isValidBolean (row["EMAILOK"])) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidBolean + " (EMAILOK)" + "\n";	
	}

	if ( this.isEmpty(row["SMSOK"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (SMSOK)" + "\n";		
	} else if ( !this.isValidBolean (row["SMSOK"])) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidBolean + " (SMSOK)" + "\n";	
	}
	
	if ( this.isEmpty(row["PHONEOK"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (PHONEOK)" + "\n";		
	} else if ( !this.isValidBolean (row["PHONEOK"])) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidBolean + " (PHONEOK)" + "\n";	
	}
	
	if ( this.isEmpty(row["PERMITGOVTAXESSENT"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (PERMITGOVTAXESSENT)" + "\n";		
	} else if ( !this.isValidBolean (row["PERMITGOVTAXESSENT"])) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidBolean + " (PERMITGOVTAXESSENT)" + "\n";	
	}
	
	if ( this.isEmpty(row["REVCREATECASE"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (REVCREATECASE)" + "\n";		
	} else if ( !this.isValidBolean (row["REVCREATECASE"])) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidBolean + " (REVCREATECASE)" + "\n";	
	}
	
	if ( this.isNotEmpty(row["CASEDESCRIPTION"]) && row["CASEDESCRIPTION"].length > 250 ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (CASEDESCRIPTION)" + "\n";	
	}
	
	if ( this.isEmpty(row["CIERREDESC"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (CIERREDESC)" + "\n";
	} else if ( !this.isInValidList( row["CIERREDESC"], this.CierreGPValues ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (CIERREDESC)" + "\n";		
	}
	
	if ( this.isEmpty(row["RDATE"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (RDATE)" + "\n";		
	} else if ( !this.isValidDate( row["RDATE"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.validDate + " (RDATE)" + "\n";
	} else if ( !this.isPastDate( row["RDATE"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isPastDate + " (RDATE)" + "\n";								
	}
	
	if ( row["PAIS"] != "ES" ) {
		errorsInRecord = errorsInRecord + prefix + "El valor del campo tiene que ser ES" + " (PAIS)" + "\n";
	}
	
	if ( this.isNotEmpty(row["Donation Start Date"]) && this.isValidDate(row["Donation Start Date"]) ) {
		var day = row["Donation Start Date"].split("/")[0];
		var month = row["Donation Start Date"].split("/")[1];
		var year = row["Donation Start Date"].split("/")[2];
		var currentDate = new Date();
		var thisMonth = currentDate.getMonth() + 1;
		// var thisMonth = 12;
		var next2Month = thisMonth + 2;
		if ( next2Month > 12) {
			next2Month = next2Month - 12;
		}
		if ( day != "01") {
			errorsInRecord = errorsInRecord + prefix + "El valor del día tiene que ser 01" + " (Donation Start Date)" + "\n";
		}
		
		if ( thisMonth <= 10) {
			
			if ( (Number(month) < Number(next2Month))  && (currentDate.getFullYear() >= year)  ) {
				errorsInRecord = errorsInRecord + prefix + "El valor del mes tiene que mayor que el mes siguiente" + " (Donation Start Date)" + "\n";
			}
			
		} else {
						
			if ( Number(year) != currentDate.getFullYear() + 1 ) {
				errorsInRecord = errorsInRecord + prefix + "El valor del año tiene que ser el año que viene" + " (Donation Start Date)" + "\n";					
			}
			
			if ( Number(month) < Number(next2Month) ) {
				errorsInRecord = errorsInRecord + prefix + "El valor del mes tiene que mayor que el mes siguiente" + " (Donation Start Date)" + "\n";
			}
			
		}
		
		if ( year != currentDate.getFullYear()  && year != currentDate.getFullYear() + 1 ) {
			errorsInRecord = errorsInRecord + prefix + "El valor del año no está correcto" + " (Donation Start Date)" + "\n";
		}
	} else if (this.isNotEmpty(row["Donation Start Date"]) && !this.isValidDate(row["Donation Start Date"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.validDate + " (Donation Start Date)" + "\n";
	}
    
	// VALIDACIONES CRUZADAS
	
	if ( row["CIERREDESC"] == "POSITIVO - Socio") {
				
		if ( row["REgGivingStatus"] != "Pending") {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Socio, REgGivingStatus tiene que ser Pending" + " (REgGivingStatus)" + "\n";
		}
		
		if ( row["LeadStatus"] != "Pending") {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Socio, LeadStatus tiene que ser Pending" + " (LeadStatus)" + "\n";
		}
		
		if ( this.isEmpty(row["Amount"])) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Socio, Amount es obligatório" + " (Amount)" + "\n";			
		}
		
		if ( this.isEmpty(row["TransactionsperYear"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Socio, TransactionsperYear es obligatorio" + " (TransactionsperYear)" + "\n";			
		} else if ( Number(row["TransactionsperYear"]) === 0) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Socio, TransactionsperYear no puede ser 0" + " (TransactionsperYear)" + "\n";			
		}
		
		if ( row["CURRENTPAYMENTMETHOD"]  != "Direct Debit" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Socio, CURRENTPAYMENTMETHOD tiene que ser Direct Debit" + " (CURRENTPAYMENTMETHOD)" + "\n";						
		}
		
		if ( this.isEmpty(row["SIGNUPDATE"])) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Socio, SIGNUPDATE es obligatorio" + " (SIGNUPDATE)" + "\n";									
		}
		
		if ( this.isEmpty(row["AccountName"])) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Socio, AccountName es obligatorio" + " (AccountName)" + "\n";									
		}
		
		if ( this.isEmpty(row["IBAN"])) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Socio, IBAN es obligatorio" + " (IBAN)" + "\n";									
		}
		
	} else if (row["CIERREDESC"] == "POSITIVO - Donativo") {
		
		if ( this.isNotEmpty(row["REgGivingStatus"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Donativo, REgGivingStatus tiene que estar vacío" + " (REgGivingStatus)" + "\n";												
		}
		
		if ( row["LeadStatus"] != "Pending") {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Donativo, LeadStatus tiene que ser Pending" + " (LeadStatus)" + "\n";
		}
		
		if ( this.isEmpty(row["1st payment Amount"])) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Donativo, 1st payment Amount es obligatorio" + " (1st payment Amount)" + "\n";									
		}
		
		if ( this.isEmpty(row["TransactionsperYear"])) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Donativo, TransactionsperYear es obligatorio" + " (TransactionsperYear)" + "\n";									
		}
		
		if ( Number(row["TransactionsperYear"]) !== 0 ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Donativo, TransactionsperYear tiene que ser 0" + " (TransactionsperYear)" + "\n";															
		}
		
		if ( row["Transaction Payment Method"] !="Direct Debit") {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Donativo, Transaction Payment Method tiene que ser Direct Debit" + " (Transaction Payment Method)" + "\n";												
		}
				
		if ( this.isEmpty(row["AccountName"])) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Donativo, AccountName es obligatorio" + " (AccountName)" + "\n";									
		}
		
		if ( this.isEmpty(row["IBAN"])) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es POSITIVO - Donativo, IBAN es obligatorio" + " (IBAN)" + "\n";									
		}
		
	} else { // CIERREDESC == Otro
		
		if ( this.isNotEmpty(row["REgGivingStatus"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es 'otro', REgGivingStatus tiene que estar vacío" + " (REgGivingStatus)" + "\n";												
		}
		
		if ( row["LeadStatus"] != "Existing Lead") {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es 'otro', LeadStatus tiene que estar vacío" + " (LeadStatus)" + "\n";															
		}
		
		if ( this.isNotEmpty(row["TransactionsperYear"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es 'otro', TransactionsperYear tiene que estar vacío" + " (TransactionsperYear)" + "\n";												
		}
		
		if ( this.isNotEmpty(row["Amount"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es 'otro', Amount tiene que estar vacío" + " (Amount)" + "\n";
		}
		
		if ( this.isNotEmpty(row["1st payment Amount"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es 'otro', 1st payment Amount tiene que estar vacío" + " (1st payment Amount)" + "\n";
		}
		
		if ( this.isNotEmpty(row["CURRENTPAYMENTMETHOD"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es 'otro', CURRENTPAYMENTMETHOD tiene que estar vacío" + " (CURRENTPAYMENTMETHOD)" + "\n";
		}
		
		if ( this.isNotEmpty(row["Transaction Payment Method"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es 'otro', Transaction Payment Method tiene que estar vacío" + " (Transaction Payment Method)" + "\n";
		}
		
		if ( this.isNotEmpty(row["SIGNUPDATE"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es 'otro', SIGNUPDATE tiene que estar vacío" + " (SIGNUPDATE)" + "\n";
		}
		
		if ( this.isNotEmpty(row["AccountName"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es 'otro', AccountName tiene que estar vacío" + " (AccountName)" + "\n";
		}
		
		if ( this.isNotEmpty(row["IBAN"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CIERREDESC es 'otro', IBAN tiene que estar vacío" + " (IBAN)" + "\n";
		}
		
	}
	
	if ( this.isTrue(row["REVCREATECASE"]) ) {
		
		if ( this.isEmpty(row["CASEDESCRIPTION"] ) ) {
			errorsInRecord = errorsInRecord + prefix + "Si REVCREATECASE es true, CASEDESCRIPTION es obligatório" + " (CASEDESCRIPTION)" + "\n";			
		}
		
	} else if ( this.isFalse(row["REVCREATECASE"]) ) {
		
		if ( this.isNotEmpty(row["CASEDESCRIPTION"] ) ) {
			errorsInRecord = errorsInRecord + prefix + "Si REVCREATECASE es false, CASEDESCRIPTION tiene que estár vacío" + " (CASEDESCRIPTION)" + "\n";			
		}
		
	}
	
	
	return errorsInRecord;
}
