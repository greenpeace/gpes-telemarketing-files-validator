/*global upgradeFileValidator, tlmkValidator */

upgradeFileValidator = Object.create(tlmkValidator);

upgradeFileValidator.version = "3.0";

upgradeFileValidator.fields = ["DCAMPAIGNMEMBERID", "DINCOMPLETE", "DPROCESSNAME", "AccionGP", "ConfirmacionAccionGP", "REgGivingStatus", "DIDDECONTACTO", "DINITIALSOURCE", "DREGULARGIVING", "Amount", "TransactionsperYear", "CURRENTPAYMENTMETHOD", "SIGNUPDATE", "DWELCOMECALLDATE", "1st payment Amount", "Transaction Payment Method", "Update Payment Details", "AccountName", "IBAN", "DCREDITCARDNUMBER", "DNAMEONCARD", "DEXPIRYMONTH", "DEXPIRYYEAR", "DIATSCUSTOMERCODE", "DIDDECAMPANA", "DLIFETIMEHARDANDSOFTCREDDON", "DLIFETIMEHARDCREDITDONTOTAL", "DLASTYEARSHARDCREDITDONTOTAL", "DFIRSTHARDCREDITDONDATE", "DLASTHARDCREDITDONDATE", "cancelation date", "cancelation MOTIVO", "LRGStatus", "LRGHardFailure", "RazonCancelacion", "ComentariosGuia", "Gender", "DNI", "FirstName", "LastName", "Birthdate", "Street", "PostalCode", "City", "Province", "DCOUNTRY", "PHONE", "MOBILEPHONE", "EMAIL", "MAILOK", "EMAILOK", "SMSOK", "PHONEOK", "PERMITGOVTAXESSENT", "CommunicationPreferenceNotes", "REVCREATECASE", "CASEDESCRIPTION", "CierreGP", "FECHACIERRE", "ID", "PAIS", "Donation Start Date", "UPDATEFREQUENCY", "Amount (OLD)", "TransactionsperYear (OLD)", "SIGNUPDATE (OLD)", "Legacy Stage", "Legacy Campaign", "Facturacion TMK"];

upgradeFileValidator.legacyStageValues.push("Pre-considerer"); // FIXME, remove in v3 as it's already in tlmkValidator.js

upgradeFileValidator.CierreGPValues = [
    
    "NEGATIVO – Motivos económicos – Demasiados gastos",
    "NEGATIVO – Motivos económicos – No tiene trabajo",
    "NEGATIVO – Motivos económicos – Colabora con otras ONG",
    "NEGATIVO – Motivos no económicos – Colabora con otras ONG",
    "NEGATIVO – Motivos no económicos",
    "NEGATIVO – Motivos no identificados",
    "NEGATIVO – Baja",
    "NEGATIVO – Reduce cuota",
    "NEGATIVO – Salta cuota",
    "POSITIVO – Aumenta cuota",
    "POSITIVO - Donativo",
    "CONTACTADO – Nos llamará el socio",
    "CONTACTADO - Reprogramar",
    "NO ÚTIL – Ya no es socio",
    "NO ÚTIL – No deja argumentar",
    "NO ÚTIL – Fallecido",
    "NO ÚTIL – Número equivocado",
    "NO ÚTIL – NO quiere que se le llame por upgrade",
    "NO ÚTIL - Robinson",
    "NO ÚTIL – No contactado (Ilocalizable)"
];

upgradeFileValidator.cancelationMotivo = [
	"Motivos económicos",
	"Discrepancias con GP",
	"Fallecimiento",
	"Otras",
	"Desconocida",
	"Impago",
	"Pérdida de interés",
	"Colaborar otras ONGs",
	"Marcha del país",
	"Duplicado"
];

upgradeFileValidator.LRGStatus = [
	"Active",
	"Cancelled",
	"Blocked"
];

upgradeFileValidator.checkCsvData = function( rowindex, row ) {

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
	
	if ( this.isNotEmpty(row["AccionGP"]) && !this.isInValidList( row["AccionGP"], ["Upgrade", "Downgrade", "Salta"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (AccionGP)" + "\n";		
	}
	
	if ( this.isEmpty(row["ConfirmacionAccionGP"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (ConfirmacionAccionGP)" + "\n";
	} else if ( !this.isTrue(row["ConfirmacionAccionGP"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isTrue + " (ConfirmacionAccionGP)" + "\n";
	}
	
	if ( !this.isInValidList( row["REgGivingStatus"], ["Upgrade", "Downgrade", "Salta" , "", undefined] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (REgGivingStatus)" + "\n";		
	}
	
	if ( this.isEmpty(row["DIDDECONTACTO"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DIDDECONTACTO)" + "\n";
	} else if ( row["DIDDECONTACTO"].length != 18 ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (DIDDECONTACTO)" + "\n";
	}
	
	if ( this.isEmpty(row["DINITIALSOURCE"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DINITIALSOURCE)" + "\n";
	} else if ( !this.isInValidList( row["DINITIALSOURCE"], this.DsourceAditionalValues ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (DINITIALSOURCE)" + "\n";		
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
	
	if ( this.isEmpty( row["SIGNUPDATE"] )) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (SIGNUPDATE)" + "\n";
	} else if ( this.isNotEmpty(row["SIGNUPDATE"]) && !this.isValidDate( row["SIGNUPDATE"] ) ) {
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
	
	if ( !this.isValidBolean( row["Update Payment Details"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidBolean + " (Update Payment Details)" + "\n";		
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
		errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (DIDDECAMPANA) Tiene que tener 18 caracteres" + "\n";
	}
	
	if ( this.isNotEmpty(row["cancelation MOTIVO"]) &&  !this.isInValidList( row["cancelation MOTIVO"], this.cancelationMotivo ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (cancelation MOTIVO)" + "\n";				
	}
	
	if ( this.isNotEmpty(row["LRGStatus"]) &&  !this.isInValidList( row["LRGStatus"], this.LRGStatus ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (LRGStatus)" + "\n";				
	}
	
	if ( !this.isValidBolean( row["LRGHardFailure"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidBolean + " (LRGHardFailure)" + "\n";		
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
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidPhoneLandline + " (MOBILEPHONE)" + "\n";
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
	
	if ( this.isEmpty(row["CierreGP"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (CierreGP)" + "\n";
	} else if ( !this.isInValidList( row["CierreGP"], this.CierreGPValues ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (CierreGP)" + "\n";		
	}
	
	if ( this.isEmpty(row["FECHACIERRE"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (FECHACIERRE)" + "\n";		
	} else if ( !this.isValidDate( row["FECHACIERRE"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.validDate + " (FECHACIERRE)" + "\n";
	} else if ( !this.isPastDate( row["FECHACIERRE"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isPastDate + " (FECHACIERRE)" + "\n";
	}
	
	if ( row["PAIS"] != "ES" ) {
		errorsInRecord = errorsInRecord + prefix + "El valor del campo tiene que ser ES" + " (PAIS)" + "\n";
	}
	
	if ( this.isNotEmpty(row["Donation Start Date"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isNotEmpty + " (Donation Start Date)" + "\n";		
	}
	
	if ( this.isEmpty(row["UPDATEFREQUENCY"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (UPDATEFREQUENCY)" + "\n";		
	} else if ( !this.isValidBolean (row["UPDATEFREQUENCY"])) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isValidBolean + " (UPDATEFREQUENCY)" + "\n";	
	}
	
	if ( this.isNotEmpty(row["Amount (OLD)"]) && !(Number(row["Amount (OLD)"]) > 0) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInvalidAmount + " (Amount (OLD))" + "\n";				
	}
	
	if ( this.isNotEmpty(row["TransactionsperYear (OLD)"]) && !this.isInValidList( Number(row["TransactionsperYear (OLD)"]), this.TransactionsperYearValues ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (TransactionsperYear (OLD))" + "\n";				
	}
	
	if ( this.isEmpty(row["SIGNUPDATE (OLD)"]) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (SIGNUPDATE (OLD))" + "\n";		
	} else if ( !this.isValidDate( row["SIGNUPDATE (OLD)"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.validDate + " (SIGNUPDATE (OLD))" + "\n";
	} else if ( !this.isPastDate( row["SIGNUPDATE (OLD)"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isPastDate + " (SIGNUPDATE (OLD))" + "\n";
	}
	
	if ( this.isNotEmpty(row["SIGNUPDATE (OLD)"]) && this.isNotEmpty(row["SIGNUPDATE"]) && ( row["SIGNUPDATE (OLD)"] !== row["SIGNUPDATE"]  )  ) {
		errorsInRecord = errorsInRecord + prefix + "SIGNUPDATE (OLD) tiene debe ser igual a SIGNUPDATE" + "\n";
	}
    
    if ( this.isNotEmpty(row["Legacy Stage"]) && !this.isInValidList( row["Legacy Stage"], this.legacyStageValues ) ) {
        errorsInRecord = errorsInRecord + prefix + this.errors.isInValidList + " (Legacy Stage)" + "\n";
    }
    
    if (this.isEmpty( row["Facturacion TMK"] ) ) {
        errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (Facturacion TMK)" + "\n";
    } else if ( this.isNotEmpty(row["Facturacion TMK"]) && !this.isValidDate( row["Facturacion TMK"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.validDate + " (Facturacion TMK)" + "\n";						
	} else if ( this.isNotEmpty(row["Facturacion TMK"]) && !this.isFirstDay( row["Facturacion TMK"] ) ) {
		errorsInRecord = errorsInRecord + prefix + this.errors.isFirstDay + " (Facturacion TMK)" + "\n";								
	}
	
	// VALIDACIONES CRUZADAS
	
	if ( this.isTrue( row["UPDATEFREQUENCY"] ) ) {
		
		if ( this.isNotEmpty(row["TransactionsperYear"]) && this.isNotEmpty(row["TransactionsperYear (OLD)"]) && row["TransactionsperYear"] === row["TransactionsperYear (OLD)"] ) {
			errorsInRecord = errorsInRecord + prefix + "Si UPDATEFREQUENCY es true, TransactionsperYear (OLD) tiene debe ser diferente a TransactionsperYear" + "\n";			
		}
		
        if ( row['REgGivingStatus'] !== "Upgrade" && row['REgGivingStatus'] !== "Downgrade" ) {
			errorsInRecord = errorsInRecord + prefix + "Si UPDATEFREQUENCY es true, REgGivingStatus tiene que ser Upgrade o Downgrade" + "\n";			            
        }
        
        if ( row['AccionGP'] !== "Upgrade" && row['AccionGP'] !== "Downgrade" ) {
			errorsInRecord = errorsInRecord + prefix + "Si UPDATEFREQUENCY es true, AccionGP tiene que ser Upgrade o Downgrade" + "\n";			            
        }
        
	} else if ( this.isFalse( row["UPDATEFREQUENCY"] ) ) {
		
		if ( this.isNotEmpty( row["TransactionsperYear"] ) && this.isNotEmpty(row["TransactionsperYear (OLD)"]) && row["TransactionsperYear"] !== row["TransactionsperYear (OLD)"] ) {
			errorsInRecord = errorsInRecord + prefix + "Si UPDATEFREQUENCY es false, TransactionsperYear (OLD) tiene debe ser igual a TransactionsperYear" + "\n";			
		}	
	}
	
	if ( row["CierreGP"] === "NEGATIVO – Baja" ) {
				
		if ( row["LRGStatus"] !== "Cancelled" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es NEGATIVO, LRGStatus tiene debe ser igual a Cancelled" + "\n";			
		}
		
		if ( this.isEmpty( row["cancelation MOTIVO"] ) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es NEGATIVO, cancelation MOTIVO es obligatorio" + "\n";
		}

		if ( this.isNotEmpty( row["AccionGP"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es NEGATIVO, AccionGP tiene que estar vacío" + "\n";	
		}
        
        if ( this.isEmpty(row["DREGULARGIVING"]) ) {
            errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DREGULARGIVING)" + "\n";
        } else if ( row["DREGULARGIVING"].length != 18 ) {
            errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (DREGULARGIVING)" + "\n";
        }
        
	} else if ( row["CierreGP"] === "NO ÚTIL – Fallecido" ) {
        
		if ( row["LRGStatus"] !== "Cancelled" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es NO ÚTIL – Fallecido, LRGStatus tiene debe ser igual a Cancelled" + "\n";			
		}
		
		if ( this.isEmpty( row["cancelation MOTIVO"] ) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es NO ÚTIL – Fallecido, cancelation MOTIVO es obligatorio" + "\n";
		}
        
		if ( this.isNotEmpty( row["AccionGP"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es NO ÚTIL – Fallecido, AccionGP tiene que estar vacío" + "\n";	
		}
        
        if ( this.isEmpty(row["DREGULARGIVING"]) ) {
            errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DREGULARGIVING)" + "\n";
        } else if ( row["DREGULARGIVING"].length != 18 ) {
            errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (DREGULARGIVING)" + "\n";
        }
        
		
	} else if ( row["CierreGP"] === "POSITIVO – Aumenta cuota" ) {
		
		if ( row["REgGivingStatus"] !== "Upgrade" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio aumenta cuota, REgGivingStatus tiene que ser Upgrade" + "\n";			
		}
		
		if ( row["AccionGP"] !== "Upgrade" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio aumenta cuota, AccionGP tiene que ser Upgrade" + "\n";			
		}
		
		if ( row["CURRENTPAYMENTMETHOD"] !== "Direct Debit" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio aumenta cuota, CURRENTPAYMENTMETHOD tiene que ser Direct Debit" + "\n";			
		}
		
		if ( this.isEmpty( row["Amount"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio aumenta cuota, Amount es obligatorio" + "\n";						
		}
		
		if ( this.isEmpty( row["AccountName"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio aumenta cuota, AccountName es obligatorio" + "\n";						
		}
		
		if ( this.isEmpty( row["IBAN"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio aumenta cuota, IBAN es obligatorio" + "\n";						
		}
		
		if ( (Number(row["Amount"]) * Number(row["TransactionsperYear"])) <= (Number(row["Amount (OLD)"]) * Number(row["TransactionsperYear (OLD)"]))  ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio aumenta cuota, Amount * TransactionsperYear > Amount(OLD) * TransactionsperYear (OLD)" + "\n";									
		}
		
		if (  row["LRGStatus"] !== "Active"  ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio aumenta cuota, LRGStatus tiene que ser Active" + "\n";
		}
		
		if ( this.isNotEmpty( row["cancelation MOTIVO"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio aumenta cuota, cancelation MOTIVO tiene que estar vacío" + "\n";
		}
        
        if ( this.isEmpty(row["DREGULARGIVING"]) ) {
            errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DREGULARGIVING)" + "\n";
        } else if ( row["DREGULARGIVING"].length != 18 ) {
            errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (DREGULARGIVING)" + "\n";
        }
		
	} else if ( row["CierreGP"] === "NEGATIVO - reduce cuota" ) {
		
		if ( row["REgGivingStatus"] !== "Downgrade" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, REgGivingStatus tiene que ser Downgrade" + "\n";			
		}
		
		if ( row["AccionGP"] !== "Downgrade" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, AccionGP tiene que ser Downgrade" + "\n";			
		}
		
		if ( row["CURRENTPAYMENTMETHOD"] !== "Direct Debit" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, CURRENTPAYMENTMETHOD tiene que ser Direct Debit" + "\n";			
		}
		
		if ( this.isEmpty( row["Amount"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, Amount es obligatorio" + "\n";						
		}
		
		if ( this.isEmpty( row["AccountName"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, AccountName es obligatorio" + "\n";						
		}
		
		if ( this.isEmpty( row["IBAN"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, IBAN es obligatorio" + "\n";						
		}
		
		if ( (Number(row["Amount"]) * Number(row["TransactionsperYear"])) >= (Number(row["Amount (OLD)"]) * Number(row["TransactionsperYear (OLD)"]))  ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, Amount * TransactionsperYear < Amount(OLD) * TransactionsperYear (OLD)" + "\n";									
		}
		
		if ( row["LRGStatus"] !== "Active" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, LRGStatus tiene que ser Active" + "\n";			
		}
		
		if ( Number(row["TransactionsperYear"]) === 0 ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, TransactionsperYear no puede cer 0" + "\n";			
		}
		
		if( this.isNotEmpty ( row["cancelation MOTIVO"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, cancelation MOTIVO tiene que estar vacío" + "\n";
		}
        
        if ( this.isEmpty(row["DREGULARGIVING"]) ) {
            errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DREGULARGIVING)" + "\n";
        } else if ( row["DREGULARGIVING"].length != 18 ) {
            errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (DREGULARGIVING)" + "\n";
        }
        
        // Fusionados
        
		if ( this.isEmpty( row["TransactionsperYear"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, TransactionsperYear es obligatorio" + "\n";	
		} else if ( row["TransactionsperYear"] == 0) { // FIXME, RETUNDANTE
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, TransactionsperYear no puede ser cero" + "\n";
		}
		
		if ( (Number(row["Amount"]) * Number(row["TransactionsperYear"])) != (Number(row["Amount (OLD)"]) * Number(row["TransactionsperYear (OLD)"]))  ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, Amount * TransactionsperYear = Amount(OLD) * TransactionsperYear (OLD)" + "\n"; // FIXME									
		}

        if ( this.isFalse(row["REVCREATECASE"])) { // FIXME, NO EXISTE ANTES
            errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO – Se mantiene socio reduce cuota, REVCREATECASE tiene que ser true" + " (CASEDESCRIPTION)" + "\n";
        }
        
		
	} else if ( row["CierreGP"] === "POSITIVO - Donativo" ) {
		
		if ( this.isNotEmpty( row["REgGivingStatus"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO - Donativo, REgGivingStatus tiene que estar vacío" + "\n";	
		}
		
		if ( Number(row["TransactionsperYear"]) !== 0  ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO - Donativo, TransactionsperYear tiene que ser 0" + "\n";	
		}
		
		if ( this.isEmpty( row["1st payment Amount"] ) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO - Donativo, 1st payment Amount es obligatório" + "\n";							
		}
		
		if ( row["Transaction Payment Method"] !="Direct Debit" ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO - Donativo, Transaction Payment Method tiene que ser Direct Debit" + "\n";			
		}
		
		if ( this.isEmpty( row["AccountName"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO - Donativo, AccountName es obligatorio" + "\n";						
		}
		
		if ( this.isEmpty( row["IBAN"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO - Donativo, IBAN es obligatorio" + "\n";						
		}
		
		if( this.isNotEmpty ( row["cancelation MOTIVO"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO - Donativo, cancelation MOTIVO tiene que estar vacío" + "\n";
		}
        
		if ( this.isNotEmpty( row["DREGULARGIVING"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es POSITIVO - Donativo, DREGULARGIVING tiene que estar vacío" + "\n";	
		}
        
	} else if ( row["CierreGP"] === "NEGATIVO – Salta cuota" ) {
        
        if ( this.isFalse( row["REVCREATECASE"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es NEGATIVO – Salta cuota - REVCREATECASE tiene que ser true" + "\n";						
		}
        
		if ( this.isEmpty( row["CASEDESCRIPTION"] ) ) {
			errorsInRecord = errorsInRecord + prefix + "Si REVCREATECASE es true, CASEDESCRIPTION es obligatório" + " (CASEDESCRIPTION)" + "\n";			
		}
        
    } else if ( row["CierreGP"] === "NEGATIVO – Reduce cuota" ) {
        
        // FIXME
        
    } else {
		
		if ( this.isNotEmpty( row["REgGivingStatus"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es 'Otros', REgGivingStatus tiene que estar vacío" + "\n";	
		}
		
		if ( this.isNotEmpty( row["AccionGP"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es 'Otros', AccionGP tiene que estar vacío" + "\n";	
		}
		
		if ( !this.isFalse( row["Update Payment Details"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es 'Otros', Update Payment Details tiene que ser false" + "\n";
		}
		
		if ( this.isNotEmpty( row["LRGStatus"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es 'Otros', LRGStatus tiene que estar vacío" + "\n";	
		}
		
		if( this.isNotEmpty ( row["cancelation MOTIVO"]) ) {
			errorsInRecord = errorsInRecord + prefix + "Si CierreGP es 'Otros', cancelation MOTIVO tiene que estar vacío" + "\n";
		}
        
        if ( this.isEmpty(row["DREGULARGIVING"]) ) {
            errorsInRecord = errorsInRecord + prefix + this.errors.isEmpty + " (DREGULARGIVING)" + "\n";
        } else if ( row["DREGULARGIVING"].length != 18 ) {
            errorsInRecord = errorsInRecord + prefix + this.errors.wrongLength + " (DREGULARGIVING)" + "\n";
        }
		
	}
	
	if ( this.isTrue( row["REVCREATECASE"]) ) {
		
		if ( this.isEmpty(row["CASEDESCRIPTION"] ) ) {
			errorsInRecord = errorsInRecord + prefix + "Si REVCREATECASE es true, CASEDESCRIPTION es obligatório" + " (CASEDESCRIPTION)" + "\n";			
		}
		
	} else if ( this.isFalse( row["REVCREATECASE"]) ) {
		
		if ( this.isNotEmpty( row["CASEDESCRIPTION"] ) ) {
			errorsInRecord = errorsInRecord + prefix + "Si REVCREATECASE es false, CASEDESCRIPTION tiene que estár vacío" + " (CASEDESCRIPTION)" + "\n";			
		}
		
	}
	
	if ( this.isTrue( row["Update Payment Details"] ) ) {
		
		if( this.isEmpty( row["AccountName"] ) ) {
			errorsInRecord = errorsInRecord + prefix + "Si Update Payment Details es true, AccountName es obligatorio" + "\n";
		}
		
		if( this.isEmpty( row["IBAN"] ) ) {
			errorsInRecord = errorsInRecord + prefix + "Si Update Payment Details es true, IBAN es obligatorio" + "\n";
		}
		
	}

	return errorsInRecord;
}
