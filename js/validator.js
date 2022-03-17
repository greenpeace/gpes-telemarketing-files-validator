tlmkValidator = Object.create(null);
tlmkValidator.version = "0.3";
/**
 * Errors list
 */

tlmkValidator.errors = {
  checkFields: "Campos del CSV incorrectos",
  isEmpty: "Campo obligatorio está vacío",
  isNotEmpty: "Campo tiene que estar vacío",
  isValidDniNie: "DNI/NIE invalido o con minúsculas",
  isValidIban: "IBAN invalido",
  hasIllegalChars: "Tiene caracteres ilegales: .- _",
  validDate: "Fecha invalida. dd/mm/aaaa ",
  isPastDate: "Fecha invalida.",
  isFirstDay: "El día tiene que ser 01",
  isValidPhone: "Telefono incorrecto. Ej: 623456789 o 923456789",
  isValidPhoneLandline: "Telefono fijo incorrecto. Ej: 923456789",
  isValidPhoneMobile: "Telefono mobile incorrecto. Ej: 923456789",
  wrongLength: "La longitud del campo no es la correcta",
  isInValidList: "No es un valor valido",
  isTrue: "El campo tiene que ser true",
  isInvalidAmount: "Importe no valido",
  isValidPostCode: "No está en el formato correcto o no es un código postal español",
  isNotSpain: "El campo debe ser Spain",
  isValidBolean: "Valor true/false no valido",
  isValidEmail: "No es una dirección de correo valida"
};
tlmkValidator.TransactionsperYearValues = [0, 1, 2, 4, 12];
tlmkValidator.genderValues = ["Female", "Male", "Other Options", "MALE", "FEMALE", "OTHER OPTIONS", "", undefined];
tlmkValidator.provinceValues = ["Álava", "Albacete", "Alacant", "Almería", "Asturias", "Ávila", "Badajoz", "Illes Balears", "Barcelona", "Bizkaia", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castelló", "Ceuta", "Ciudad Real", "Córdoba", "A Coruña", "Cuenca", "Girona", "Granada", "Guadalajara", "Gipuzkoa", "Huelva", "Huesca", "Jaén", "León", "Las Palmas De Gran Canaria", "Lleida", "La Rioja", "Lugo", "Madrid", "Málaga", "Melilla", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz De Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Zamora", "Zaragoza"];
tlmkValidator.legacyStageValues = ["Intender", "Considerer", "Rejected", "Pledge", "Pre-considerer"];
tlmkValidator.DsourceAditionalValues = ["Direct Dialogue", "Traveling Team", "SAS", "Door2Door", "Reactivation", "Conversion Source", "Direct Mail", "Event", "Greenpeace Staff Member", "Incoming Phone Call", "Incoming Unprompted Letter", "In Person", "Retention", "Press advertising:PAD", "Local Groups", "Legacies", "TV", "Other", "Without Specific Source", "Email", "High Donors", "Middle Donors", "MGM", "Radio", "SMS", "Telemarketing", "Upgrade", "Web", "WEB", "Telemarketing", "DD", "IT", "Reactivación", "TV", "SPTC", "TMK"];
tlmkValidator.DsourceParaTmkAditionalValues = ["Telemarketing", "DD", "IT", "Reactivación", "TV", "SPTC", "TMK"];
tlmkValidator.CierreGPValues = ["Positivo", "Positivo Aumenta cuota", "Positivo, Mensualiza sin aum", "Positivo aum cuota y donación", "Positivo hace donación", "Baja", "Enviamos cupón", "Socio Durmiente", "Negativo antes argumentario", "Negativo", "Queria baja pero se mantiene", "Pendiente. nos llamará", "Quejas", "No contacto directo con el socio", "Contestador automático", "Fallecido", "Ilocalizable", "Teléfono equivocado", "Reduce Cuota evitando baja", "Retenido aceptando SALTA", "Teléfono erróneo o nulo", "Negativo Coronavirus", "Negativo alta por la web"];
/**
 * Compares the csv fields with the right fields
 * @param   {Array} fields CSV fields
 * @returns {boolean} Are the fields the same
 */

tlmkValidator.checkFields = function (fields) {
  return _.isEqual(fields, this.fields);
};
/**
 * Removes last line of the CSV if empty
 * @param   {object}   fileVar Entire PapaParse object
 * @returns {[[Type]]} Papaparse object without last line if empty
 */


tlmkValidator.clean = function (fileVar) {
  var lastRow = fileVar.data[fileVar.data.length - 1];

  if (lastRow.FirstName == undefined || lastRow.FirstName == "") {
    var poped = fileVar.data.pop();
    return fileVar;
  } else {
    return fileVar;
  }
};
/**
 * Crestes an html string from an array
 * @param   {Array} arrayToConvert Array to convert to string
 * @returns {string} Html string with array
 */


tlmkValidator.arrayToHtmlList = function (arrayToConvert) {
  var htmlString = "";
  $.each(arrayToConvert, function (index, value) {
    htmlString = htmlString + "<li>" + value + "</li>";
  });
  return htmlString;
};
/**
 * Is th value empty?
 * @param   {string} value [[Description]]
 * @returns {boolean}  [[Description]]
 */


tlmkValidator.isEmpty = function (value) {
  var trimedValue = _.trim(value);

  if (trimedValue.length >= 1) {
    return false;
  } else {
    return true;
  }
};
/**
 * Is th value empty?
 * @param   {string} value Variable to evaluate
 * @returns {boolean}  Is it not empty?
 */


tlmkValidator.isNotEmpty = function (value) {
  var trimedValue = _.trim(value);

  if (trimedValue.length >= 1) {
    return true;
  } else {
    return false;
  }
};
/**
 * Checks if a cell is true, based on the strings accepted by Salesforce
 * @param   {string} value Value to check
 * @returns {boolean}  Is true?
 */


tlmkValidator.isTrue = function (value) {
  if (value.toLowerCase() == "true" || value === true) {
    return true;
  } else {
    return false;
  }
};
/**
 * Checks if a cell is false, based on the strings accepted by Salesforce
 * @param   {string} value String to check
 * @returns {boolean}  Is it false?
 */


tlmkValidator.isFalse = function (value) {
  if (value.toLowerCase() == "false" || value === false) {
    return true;
  } else {
    return false;
  }
};
/**
 * Is the value in a list of valid values?
 * @param   {string} value String to check
 * @param   {Array} list  Array of strings or numbers
 * @returns {boolean}  [[Description]]
 */


tlmkValidator.isInValidList = function (value, list) {
  if (list.indexOf(value) >= 0) {
    return true;
  } else {
    return false;
  }
};
/**
 * Function useful to validate DNI / NIE
 */


tlmkValidator.str_replace = function (e, t, n) {
  var r = e,
      i = t,
      s = n;
  var o = i instanceof Array,
      u = s instanceof Array,
      r = [].concat(r),
      i = [].concat(i),
      a = (s = [].concat(s)).length;

  while (j = 0, a--) {
    if (s[a]) {
      while (s[a] = s[a].split(r[j]).join(o ? i[j] || "" : i[0]), ++j in r) {}
    }
  }

  return u ? s : s[0];
};

tlmkValidator.valida_nif_cif_nie = function (e) {
  var t = e.toUpperCase();
  var r = "TRWAGMYFPDXBNJZSQVHLCKE";

  if (t !== "") {
    if (!/^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$/.test(t) && !/^[T]{1}[A-Z0-9]{8}$/.test(t) && !/^[0-9]{8}[A-Z]{1}$/.test(t)) {
      return 0;
    }

    if (/^[0-9]{8}[A-Z]{1}$/.test(t)) {
      posicion = e.substring(8, 0) % 23;
      letra = r.charAt(posicion);
      var s = t.charAt(8);

      if (letra == s) {
        return 1;
      } else {
        return -1;
      }
    }

    suma = parseInt(e[2]) + parseInt(e[4]) + parseInt(e[6]);

    for (i = 1; i < 8; i += 2) {
      temp1 = 2 * parseInt(e[i]);
      temp1 += "";
      temp1 = temp1.substring(0, 1);
      temp2 = 2 * parseInt(e[i]);
      temp2 += "";
      temp2 = temp2.substring(1, 2);

      if (temp2 == "") {
        temp2 = "0";
      }

      suma += parseInt(temp1) + parseInt(temp2);
    }

    suma += "";
    n = 10 - parseInt(suma.substring(suma.length - 1, suma.length));

    if (/^[KLM]{1}/.test(t)) {
      if (e[8] == String.fromCharCode(64 + n)) {
        return 1;
      } else {
        return -1;
      }
    }

    if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(t)) {
      t = n + "";

      if (e[8] == String.fromCharCode(64 + n) || e[8] == parseInt(t.substring(t.length - 1, t.length))) {
        return 2;
      } else {
        return -2;
      }
    }

    if (/^[T]{1}/.test(t)) {
      if (e[8] == /^[T]{1}[A-Z0-9]{8}$/.test(t)) {
        return 3;
      } else {
        return -3;
      }
    }

    if (/^[XYZ]{1}/.test(t)) {
      pos = tlmkValidator.str_replace(["X", "Y", "Z"], ["0", "1", "2"], t).substring(0, 8) % 23;

      if (e[8] == r.substring(pos, pos + 1)) {
        return 3;
      } else {
        return -3;
      }
    }
  }

  return 0;
};
/**
 * Checks if an expression has lowercase chars
 * @param   {string} exp String to evaluate
 * @returns {boolean}  Is there a lowercase char in the string
 */


tlmkValidator.hasLowerCase = function (exp) {
  var isUp = /[a-z]/.test(exp);

  if (isUp === true) {
    return true;
  } else {
    return false;
  }
};
/**
 * Validates Spanish DNI
 * @param   {string} dni Validates DNI or NIE
 * @returns {boolean} Valid or not?
 */


tlmkValidator.isValidDniNie = function (dni) {
  var valid, validatorResult;

  if (typeof dni != "undefined") {
    validatorResult = this.valida_nif_cif_nie(dni.toUpperCase());
  } else {
    validatorResult = 99;
  }

  var hasLowerCase = this.hasLowerCase(dni);

  if (validatorResult >= 1 && validatorResult != 2 && hasLowerCase === false) {
    valid = true;
  } else {
    valid = false;
  }

  return valid;
};
/**
 * Valid date
 * @param   {string} date Validates date
 * @returns {boolean} Valid or not?
 */


tlmkValidator.isValidDate = function (value) {
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value) == false) {
    return false;
  }

  var day = Number(value.split("/")[0]);
  var month = Number(value.split("/")[1]);
  var year = Number(value.split("/")[2]);

  if (day > 31 || day < 1 || month > 12 || month < 1 || year < 0 || year > 2099) {
    return false;
  }

  if (month == 2 && day > 29 || day == 31 && (month == 4 || month == 6 || month == 9 || month == 11)) {
    return false;
  }

  if (year % 4 != 0 && month == 2 && day == 29) {
    return false;
  }

  return true;
};
/**
 * Check if it's a valid Salesforce boolean
 * @param   {string} value String to be checked
 * @returns {boolean}  Is it a sting boolean?
 */


tlmkValidator.isValidBolean = function (value) {
  if (this.isInValidList(value, ["true", "false", "TRUE", "FALSE", "True", "False", true, false])) {
    return true;
  } else {
    return false;
  }
};
/**
 * Check if a date in the format dd/mmm/yyyy is a past date
 * @param   {string}  value The string to check
 * @returns {boolean} Is it in the past?
 */


tlmkValidator.isPastDate = function (value) {
  var day = value.split("/")[0];
  var month = value.split("/")[1];
  var year = value.split("/")[2];
  var fullDateString = year + month + day;
  var d = new Date();
  var yearCurrentString = d.getFullYear().toString();
  var monthCurrent = (d.getMonth() + 1).toString();
  var monthCurrentString = "00".substr(0, 2 - monthCurrent.length) + monthCurrent;
  var dayCurrent = d.getDate().toString();
  var dayCurrentString = "00".substr(0, 2 - dayCurrent.length) + dayCurrent;
  var fullCurrentDateString = yearCurrentString + monthCurrentString + dayCurrentString;

  if (Number(fullCurrentDateString) >= Number(fullDateString)) {
    return true;
  } else {
    return false;
  }
};
/**
 * Check if it's the first day
 * @param   {string}  value The string to check
 * @returns {boolean} Is it in the past?
 */


tlmkValidator.isFirstDay = function (value) {
  var day = value.split("/")[0];
  var month = value.split("/")[1];
  var year = value.split("/")[2];
  var fullDateString = year + month + day;

  if (day == "01") {
    return true;
  } else {
    return false;
  }
};
/**
 * Validate phone number
 * @param   {string} phone Phone number
 * @returns {boolean} Valid or not?
 */


tlmkValidator.isValidPhone = function (phone) {
  var valid = /^[6789]\d{8}$/.test(phone);
  return valid;
};
/**
 * Validate mobile phone number
 * @param   {string} phone Phone number
 * @returns {boolean} Valid or not?
 */


tlmkValidator.isValidPhoneMobile = function (phone) {
  var valid = /^[67]\d{8}$/.test(phone);
  return valid;
};
/**
 * Validate mobile phone number
 * @param   {string} phone Phone number
 * @returns {boolean} Valid or not?
 */


tlmkValidator.isValidPhoneLandline = function (phone) {
  var valid = /^[89]\d{8}$/.test(phone);
  return valid;
};
/**
 * Validate IBAN
 * @param {string} Iban
 *  @returns {boolean} Valid or not?
 */


tlmkValidator.isValidIban = function (iban) {
  if (typeof iban == "undefined") {
    return true;
  }

  var newIban = iban.replace(/[\.\s-,_\|#]/g, '').toUpperCase(); // Lenght

  if (newIban.length != 24) {
    return false;
  }

  modulo = function (divident, divisor) {
    var cDivident = '';
    var cRest = '';

    for (var i in divident) {
      var cChar = divident[i];
      var cOperator = cRest + '' + cDivident + '' + cChar;

      if (cOperator < parseInt(divisor)) {
        cDivident += '' + cChar;
      } else {
        cRest = cOperator % divisor;

        if (cRest == 0) {
          cRest = '';
        }

        cDivident = '';
      }
    }

    cRest += '' + cDivident;

    if (cRest == '') {
      cRest = 0;
    }

    return cRest;
  };

  if (newIban.search(/^[A-Z]{2}/gi) < 0) {
    return false;
  }

  newIban = newIban.substring(4) + newIban.substring(0, 4);
  newIban = newIban.replace(/[A-Z]/g, function (match) {
    return match.charCodeAt(0) - 55;
  });
  return parseInt(modulo(newIban, 97), 10) === 1;
};
/**
 * Check if it has illegal chars
 * @param   {string} input String to test
 * @returns {boolean} Valid or not?
 */


tlmkValidator.hasIllegalChars = function (input) {
  var valid = /.*(\s|-|_|\.|,).*/.test(input);
  return valid;
};
/**
 * Check if it's a valid Spanish phone number
 * @param   {string} value Postcode to check
 * @returns {boolean}  Is it valid or not?
 */


tlmkValidator.isValidPostCode = function (value) {
  if (/^\d{5}$/.test(value) && Number(value) >= 1000 && Number(value) <= 52999) {
    return true;
  } else {
    return false;
  }
};
/**
 * [[Description]]
 * @param   {[[Type]]} value [[Description]]
 * @returns {[[Type]]} [[Description]]
 */


tlmkValidator.isValidEmail = function (value) {
  var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(value);
};