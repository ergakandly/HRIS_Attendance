
var _bver    = parseInt(navigator.appVersion);
var Nav4     = ((navigator.appName == "Netscape") && _bver==4);
var Nav4plus = ((navigator.appName == "Netscape") && _bver >= 4);
var IE4plus  = ((navigator.userAgent.indexOf("MSIE") != -1) && _bver>4);

if (Nav4plus)
	var userLanguage = (navigator.language.substr(0, 2));
else
	var userLanguage = (navigator.browserLanguage.substr(0, 2));

// strings that need localization - don't localize anything not listed here
var L_BadNumber	= "Este parámetro es de tipo \"Número\" y sólo puede contener un signo negativo, los siguientes dígitos (\"0-9\") y una coma como separador de decimales. Modifique el valor de parámetro introducido.";
var L_BadCurrency	= "Este parámetro es de tipo \"Moneda\" y sólo puede contener un signo negativo, los siguientes dígitos (\"0-9\") y una coma como separador de decimales. Modifique el valor de parámetro introducido.";
var L_BadDate	= "Este parámetro es de tipo \"Fecha\" y debe tener el siguiente formato \"Fecha(aaaa,mm,dd)\" donde \"aaaa\" es un año con cuatro dígitos, \"mm\" es el mes (por ejemplo Enero= 1) y \"dd\" es el número de días del mes.";
var L_BadDateTime 	= "Este parámetro es de tipo \"FechaHora\" y el formato correcto es \"FechaHora(aaaa,mm,dd,hh,mm,ss)\". \"aaaa\" es un año con cuatro dígitos, \"mm\" es el mes (por ejemplo Enero= 1), \"dd\" es el día del mes, \"hh\" son las horas en un formato de 24 horas, \"mm\" son los minutos y \"ss\" son los segundos.";
var L_BadTime	= "Este parámetro es de tipo \"Hora\" y debe tener el siguiente formato \"Hora(hh,mm,ss)\" donde \"hh\" son las horas en un formato de 24 horas, \"mm\" son los minutos de una hora y \"ss\" son los segundos de un minuto.";

//////////////////////////////
// FOR DEBUGGING ONLY
var debug = false;
function dumpFormFields(formName)
{
    theForm = document.forms[formName];
    for ( idx = 0; idx < theForm.elements.length; ++idx )
        alert ( theForm.elements[idx].name + " - " + theForm.elements[idx].value );
}

////////////////////////////////////////////////////////
// handles Netscape4 bug on Japanese where we sometimes can't get a form or form element using [string] operator
function getElement (widgetarray, name)
{
    var retval = widgetarray[name];
    if ( retval == null && Nav4 )
    {
        for ( var idx = 0; idx < widgetarray.length; idx++ )
            if ( widgetarray[idx].name == name )
                retval = widgetarray[idx];
    }
    return retval;
}

///////////////////////////////
// properly escapes prompt values
function escapePrompt (prompt)
{
/* No need to do encode in here	
    if ( prompt != null && prompt != "" ) {
        prompt = prompt.replace (/\\/g, "\\\\"); // replace \ with \\ globally
        prompt = prompt.replace (/"/g, "\\\"");  // replace " with \" globally
    }
*/
    return prompt;
}

////////////////////////////////////
// generic "add" function which calls one of the two below. Note: won't work for range _and_ discrete prompts,
// only one or the other cases
function addPromptValue ( inForm, type , paramName)
{
    if ( inForm[paramName + "DiscreteValue"] != null )
        return addPromptDiscreteValue ( inForm, type , paramName);
    else if ( inForm[paramName + "LowerBound"] != null )
        return addPromptRangeValue ( inForm, type , paramName);
}

////////////////////////////////
// add number, currency, string from dropdown/textbox to list box
// where multiple prompt values are supported
function addPromptDiscreteValue ( inForm, type , paramName)
{
	var widget, obj;
    widget = obj = inForm[paramName + "DiscreteValue"];
	if ( obj.type && obj.type.toLowerCase() != "text" &&
	     obj.type.toLowerCase() != "hidden" && obj.type.toLowerCase() != "password")
	{
		//select box not a textbox
		obj = obj.options[obj.selectedIndex];
	}
	if ( ! checkSingleValue ( obj.value, type, inForm.name ) )
    {
        if (widget.focus && widget.type.toLowerCase() != "hidden")
        widget.focus();
		return false;
    }
	promptValue =  escapePrompt(obj.value);
	displayString = ( obj.text ) ? obj.text : obj.value;
	promptEntry = new Option(displayString,promptValue,false,false);
	theList = inForm[paramName + "ListBox"];
	theList.options[theList.length] = promptEntry;
    if (widget.focus && widget.type.toLowerCase() != "hidden")	
    widget.focus ();
    if ( widget.select )
        widget.select ();
    if ( widget.type.toLowerCase != "text" &&
	 widget.type.toLowerCase != "hidden" &&
	 widget.type.toLowerCase != "password")
        if ( widget.selectedIndex < widget.length - 1 )
            widget.selectedIndex = widget.selectedIndex + 1;      //... or move to next selection in listbox
    //if ( Nav4 )
    //      history.go(0);
}

////////////////////////////////////
// adds Range prompt to listbox where multiple values are supported
function addPromptRangeValue ( inForm, type , paramName)
{
    lowerBound = inForm[paramName + "LowerBound"];
    upperBound = inForm[paramName + "UpperBound"];
    //handle select box, not text box case
    if ( lowerBound.type.toLowerCase () != "text" &&
	 lowerBound.type.toLowerCase () != "hidden" &&
	 lowerBound.type.toLowerCase () != "password" )  //either upper or lower, doesn't matter
    {
        lowerBound = lowerBound.options[lowerBound.selectedIndex];
        upperBound = upperBound.options[upperBound.selectedIndex];
    }

    lowerUnBounded = inForm[paramName + "NoLowerBoundCheck"].checked;
    upperUnBounded = inForm[paramName + "NoUpperBoundCheck"].checked;
    lvalue = uvalue = "";

    if ( ! lowerUnBounded )
    {
        if ( ! checkSingleValue ( lowerBound.value, type, inForm.name ) ) {
            if ( lowerBound.focus && lowerBound.type.toLowerCase () != "hidden")
                lowerBound.focus ();
            return false;
        }
        lvalue = lowerBound.value;
    }
    if ( ! upperUnBounded )
    {
        if ( ! checkSingleValue ( upperBound.value, type, inForm.name ) ) {
            if ( upperBound.focus && upperBound.type.toLowerCase () != "hidden")
                upperBound.focus ();
            return false;
        }
        uvalue = upperBound.value;
    }
    ldisplay = (lowerBound.text && !lowerUnBounded) ? lowerBound.text : lvalue;
    udisplay = (upperBound.text && !upperUnBounded) ? upperBound.text : uvalue;

    lowerChecked = inForm[paramName + "LowerCheck"].checked;
    upperChecked = inForm[paramName + "UpperCheck"].checked;

    value = ( lowerChecked && ! lowerUnBounded ) ? "[" : "(";
    if ( ! lowerUnBounded ) //unbounded is empty string not quoted empty string (e.g not "_crEMPTY_")
        value += escapePrompt(lvalue);
    value += "_crRANGE_"
    if ( ! upperUnBounded )
        value += escapePrompt(uvalue);
    value += (upperChecked && ! upperUnBounded ) ? "]" : ")";
    if ( debug ) alert (value);

    display = ( lowerChecked && ! lowerUnBounded ) ? "[" : "(";
    display += ldisplay;
    display += "  ..  "
    display += udisplay;
    display += (upperChecked && ! upperUnBounded ) ? "]" : ")";

	promptEntry = new Option(display,value,false,false);
	theList = inForm[paramName + "ListBox"];
	theList.options[theList.length] = promptEntry;
    //if ( Nav4 )
    //      history.go(0);
}

////////////////////////////////////
// puts "select" value into text box for an editable prompt which also has defaults
function setSelectedValue (inForm, selectCtrl, textCtrl)
{
    selectedOption = inForm[selectCtrl].options[inForm[selectCtrl].selectedIndex];
    inForm[textCtrl].value = selectedOption.value;
	//if ( Nav4 )
	//      history.go(0);
}

///////////////////////////////////
// remove value from listbox where multiple value prompts are supported
function removeFromListBox ( inForm, paramName )
{
	lbox = inForm[paramName + "ListBox"];
	for ( var idx = 0; idx < lbox.options.length; )
	{
		if ( lbox.options[idx].selected )
			lbox.options[idx] = null;
		else
			idx++;
	}
	//if ( Nav4 )
	//      history.go(0);
}

/////////////////////////////////////
// sets prompt value into the hidden form field in proper format so that it can be submitted
function setPromptSingleValue (promptName, type, paramName, inform)
{
    hiddenField = inform[promptName];
    value = "";
    if ( inform[paramName + "NULL"] != null && inform[paramName + "NULL"].checked )
        value = "_crNULL_"; //NULL is a literal for, uhmm.. a NULL
    else
    {
        discreteVal = inform[paramName + "DiscreteValue"];
        if ( discreteVal.type.toLowerCase () != "text" && 
 	     discreteVal.type.toLowerCase () != "hidden" && 
	     discreteVal.type.toLowerCase () != "password")
            value = discreteVal.options[discreteVal.selectedIndex].value;
        else
            value = discreteVal.value;
        if ( ! checkSingleValue ( value, type, promptName ) ) {
            if (discreteVal.focus && discreteVal.type.toLowerCase ())
            discreteVal.focus ();
            return false;
        }
        else
            value = escapePrompt(value);
    }
    hiddenField.value = value;
	return true;
}

/////////////////////////////////////
// sets prompt value for a range into the hidden form field in proper format so that it can be submitted
function setPromptRangeValue (promptName, type, paramName, inform)
{
    hiddenField = inform[promptName];

    lowerBound = inform[paramName + "LowerBound"];
    upperBound = inform[paramName + "UpperBound"];
    //handle select box, not text box case
    if ( lowerBound.type.toLowerCase () != "text" &&
	 lowerBound.type.toLowerCase () != "hidden" &&
	 lowerBound.type.toLowerCase () != "password")  //either upper or lower, doesn't matter
    {
        lowerBound = lowerBound.options[lowerBound.selectedIndex];
        upperBound = upperBound.options[upperBound.selectedIndex];
    }
    lowerUnBounded = inform[paramName + "NoLowerBoundCheck"].checked;
    upperUnBounded = inform[paramName + "NoUpperBoundCheck"].checked;
    lowerChecked = inform[paramName + "LowerCheck"].checked;
    upperChecked = inform[paramName + "UpperCheck"].checked;
    uvalue = lvalue = "";

    if ( ! lowerUnBounded )
    {
        if ( ! checkSingleValue ( lowerBound.value, type, promptName ) ) {
            if ( lowerBound.focus && lowerBound.type.toLowerCase () != "hidden")
                lowerBound.focus();
            return false;
        }
        lvalue = lowerBound.value;
    }
    if ( ! upperUnBounded )
    {
        if ( ! checkSingleValue ( upperBound.value, type, promptName ) ) {
            if ( upperBound.focus && upperBound.type.toLowerCase () != "hidden")
                upperBound.focus ();
            return false;
        }
        uvalue = upperBound.value;
    }
    value = ( lowerChecked && ! lowerUnBounded ) ? "[" : "(";
    if ( ! lowerUnBounded )
        value += escapePrompt(lvalue);
    value += "_crRANGE_"
    if ( ! upperUnBounded )
        value += escapePrompt(uvalue);
    value += (upperChecked && ! upperUnBounded ) ? "]" : ")";
    if ( debug )
        alert (value);
    hiddenField.value = value;
	return true;
}

/////////////////////////////////////
// sets prompt value into the hidden form field in proper format so that it can be submitted
function setPromptMultipleValue (promptName, type, paramName, inform)
{
    hiddenField = inform[promptName];
    values = inform[paramName + "ListBox"].options;
    value = "";
    for ( idx = 0; idx < values.length; ++idx )
    {
        if ( value.length != 0 )
            value += "_crMULT_"
        value += values[idx].value;
    }
    if ( value == "" )
        value = "_crEMPTY_";     //if value is empty, set to empty string
    if ( debug )
        alert (value);
    hiddenField.value = value;
    //NOTE: we'll always return true as the validation is done before values are added to select box
	return true;
}

///////////////////////////////////////
// check and alert user about any errors based on type of prompt
var promptPrefix = "promptex-";
var regNumber    = /^(\+|-)?((\d+(\.|,| )?\d*)+|(\d*(\.|,| )?\d+)+)$/
var regCurrency  = regNumber;
var regDate	 = /^(D|d)(A|a)(T|t)(E|e) *\( *\d{4} *, *(0?[1-9]|1[0-2]) *, *((0?[1-9]|[1-2]\d)|3(0|1)) *\)$/
var regDateTime  = /^(D|d)(A|a)(T|t)(E|e)(T|t)(I|i)(M|m)(E|e) *\( *\d{4} *, *(0?[1-9]|1[0-2]) *, *((0?[1-9]|[1-2]\d)|3(0|1)) *, *([0-1]?\d|2[0-3]) *, *[0-5]?\d *, *[0-5]?\d *\)$/
var regTime	 = /^(T|t)(I|i)(M|m)(E|e) *\( *([0-1]?\d|2[0-3]) *, *[0-5]?\d *, *[0-5]?\d *\)$/

function checkSingleValue ( value, type, promptName )
{
	if ( type == 'n' && ! regNumber.test ( value ) )
	{
		alert ( "\"" + promptName.substr(promptPrefix.length) + "\": " + L_BadNumber );
		return false;
	}
	else if ( type == 'c' && ! regCurrency.test ( value ) )
	{
		alert ( "\"" + promptName.substr(promptPrefix.length) + "\": " + L_BadCurrency );
		return false;
	}
	else if ( type == 'd' && ! regDate.test ( value ) )
	{
		alert ( "\"" + promptName.substr(promptPrefix.length) + "\": " + L_BadDate );
		return false;
	}
	else if ( type == "dt" && ! regDateTime.test ( value ) )
	{
		alert ( "\"" + promptName.substr(promptPrefix.length) + "\": " + L_BadDateTime );
		return false;
	}
	else if ( type == 't' && ! regTime.test ( value ) )
	{
		alert ( "\"" + promptName.substr(promptPrefix.length) + "\": " + L_BadTime );
		return false;
	}

	//by default let it go...
	return true;
}

// Disable enter key checking for multibyte languages since the enter key is used for committing characters
var isEnabledLanguage = (! ((userLanguage == "ja") || (userLanguage == "ko") || (userLanguage == "zh")) )

var isNav = (navigator.appName == "Netscape");
if (isEnabledLanguage)
{
    if(isNav) {
        document.captureEvents(Event.KEYUP);
    }
    document.onkeyup = checkValue;
}

function checkValue(evt) {
  var theButtonPressed, buttonVal;
  if (isNav) {
	if (evt.target.type == "text" || evt.target.type == "password") {
		buttonVal = evt.target.value;
		theButtonPressed = evt.which;
	}
  } else {
	// Same effect as 'if (window.event.srcElement.type == "text" || window.event.srcElement.type == "password")'
	if (window.event.srcElement.className == "promptTextBox") {
		buttonVal = window.event.srcElement.value;
		theButtonPressed = window.event.keyCode;
	}
  }

  if ((theButtonPressed == 13) && (buttonVal != "")) {
	checkSetAndSubmitValues ();
  }
}
