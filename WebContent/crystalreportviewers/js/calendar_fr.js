// Modified Date: 11/30/1999
// Modified By:   Robert W. Husted
// Notes:  Added frameset support (changed reference for "newWin" to "top.newWin")
//         Also changed Spanish "March" from "Marcha" to "Marzo"
//         Fixed JavaScript Date Anomaly affecting days > 28
// 
// Modified by Crystal Decisions
// Removed large amounts of comments to shrink file size.
// Removed multi language support as language set by user as accept-language and navigator.language don't necessarily match
// Removed formatting code as only format wanted is for Crystal Reports Date/DateTime parameters
// Moved resource strings to top of file for translation
// Added A.whatever:visited styles so that followed links appear as if they weren't followed
//LOCALIZATION STRING
var L_Title     = "Calendrier JavaScript";
var L_Today     = "Aujourd&#39hui";
var L_January   = "Janvier";
var L_February  = "Février";
var L_March     = "Mars";
var L_April     = "Avril";
var L_May       = "Mai";
var L_June      = "Juin";
var L_July      = "Juillet";
var L_August    = "Août";
var L_September = "Septembre";
var L_October   = "Octobre";
var L_November  = "Novembre";
var L_December  = "Décembre";
var L_Su        = "di";
var L_Mo        = "lu";
var L_Tu        = "ma";
var L_We        = "me";
var L_Th        = "je";
var L_Fr        = "ve";
var L_Sa        = "sa";

// BEGIN USER-EDITABLE SECTION -----------------------------------------------------

// CALENDAR COLORS
topBackground    = "white";         // BG COLOR OF THE TOP FRAME
bottomBackground = "white";         // BG COLOR OF THE BOTTOM FRAME
tableBGColor     = "black";         // BG COLOR OF THE BOTTOM FRAME'S TABLE
cellColor        = "lightgrey";     // TABLE CELL BG COLOR OF THE DATE CELLS IN THE BOTTOM FRAME
headingCellColor = "white";         // TABLE CELL BG COLOR OF THE WEEKDAY ABBREVIATIONS
headingTextColor = "black";         // TEXT COLOR OF THE WEEKDAY ABBREVIATIONS
dateColor        = "blue";          // TEXT COLOR OF THE LISTED DATES (1-28+)
focusColor       = "#ff0000";       // TEXT COLOR OF THE SELECTED DATE (OR CURRENT DATE)
hoverColor       = "darkred";       // TEXT COLOR OF A LINK WHEN YOU HOVER OVER IT
fontStyle        = "12pt arial, helvetica";           // TEXT STYLE FOR DATES
headingFontStyle = "bold 12pt arial, helvetica";      // TEXT STYLE FOR WEEKDAY ABBREVIATIONS

// FORMATTING PREFERENCES
bottomBorder  = false;        // TRUE/FALSE (WHETHER TO DISPLAY BOTTOM CALENDAR BORDER)
tableBorder   = 0;            // SIZE OF CALENDAR TABLE BORDER (BOTTOM FRAME) 0=none

var isClosed = false;
var DateTimeFormat = true;		//"DateTime" if true, else a "Date"

// END USER-EDITABLE SECTION -------------------------------------------------------


// DETERMINE BROWSER BRAND
var isNav = false;
var isIE  = false;

// ASSUME IT'S EITHER NETSCAPE OR MSIE
if (navigator.appName == "Netscape") {
    isNav = true;
}
else {
    isIE = true;
}

// CALENDAR FUNCTIONS BEGIN HERE ---------------------------------------------------

// SET THE INITIAL VALUE OF THE GLOBAL DATE FIELD
function setDateField(formName, dateField) {
    // PRE-BUILD PORTIONS OF THE CALENDAR WHEN THIS JS LIBRARY LOADS INTO THE BROWSER
    buildCalParts();

    // ASSIGN THE INCOMING FIELD OBJECT TO A GLOBAL VARIABLE
    thisform = document.forms[formName];
    calDateField = thisform[dateField];

    // GET THE VALUE OF THE INCOMING FIELD
    inDate = thisform[dateField].value;

    // SET calDate TO THE DATE IN THE INCOMING FIELD OR DEFAULT TO TODAY'S DATE
    setInitialDate();

    // THE CALENDAR FRAMESET DOCUMENTS ARE CREATED BY JAVASCRIPT FUNCTIONS
    calDocTop    = buildTopCalFrame();
    calDocBottom = buildBottomCalFrame();
}


// SET THE INITIAL CALENDAR DATE TO TODAY OR TO THE EXISTING VALUE IN dateField
function setInitialDate() {

    // CREATE A NEW DATE OBJECT (WILL GENERALLY PARSE CORRECT DATE EXCEPT WHEN "." IS USED AS A DELIMITER)
    // (THIS ROUTINE DOES *NOT* CATCH ALL DATE FORMATS, IF YOU NEED TO PARSE A CUSTOM DATE FORMAT, DO IT HERE)
    // --- calDate = new Date(inDate);
    if ( DateTimeFormat == true ) {
        calDate = ParseDateTimePrompt(inDate);
    } else {
        calDate = ParseDatePrompt(inDate);
    }

    // IF THE INCOMING DATE IS INVALID, USE THE CURRENT DATE
    if (isNaN(calDate)) {

        // ADD CUSTOM DATE PARSING HERE
        // IF IT FAILS, SIMPLY CREATE A NEW DATE OBJECT WHICH DEFAULTS TO THE CURRENT DATE
        calDate = new Date();
    }

    // KEEP TRACK OF THE CURRENT DAY VALUE
    calDay  = calDate.getDate();
    isClosed = false;
    // SET DAY VALUE TO 1... TO AVOID JAVASCRIPT DATE CALCULATION ANOMALIES
    // (IF THE MONTH CHANGES TO FEB AND THE DAY IS 30, THE MONTH WOULD CHANGE TO MARCH
    //  AND THE DAY WOULD CHANGE TO 2.  SETTING THE DAY TO 1 WILL PREVENT THAT)
    calDate.setDate(1);
}


// POPUP A WINDOW WITH THE CALENDAR IN IT
function showCalendar(dateField) {

    // SET INITIAL VALUE OF THE DATE FIELD AND CREATE TOP AND BOTTOM FRAMES
    setDateField(dateField);

    // USE THE JAVASCRIPT-GENERATED DOCUMENTS (calDocTop, calDocBottom) IN THE FRAMESET
    calDocFrameset =
        "<HTML><HEAD><TITLE>" + L_Title + "</TITLE></HEAD>\n" +
        "<FRAMESET ROWS='70,*' FRAMEBORDER='0'>\n" +
        "  <FRAME NAME='topCalFrame' SRC='parent.opener.calDocTop' SCROLLING='no'>\n" +
        "  <FRAME NAME='bottomCalFrame' SRC='parent.opener.calDocBottom' SCROLLING='no'>\n" +
        "</FRAMESET>\n";

    // DISPLAY THE CALENDAR IN A NEW POPUP WINDOW
    top.newWin = window.open("parent.opener.calDocFrameset", "calWin", winPrefs);
    top.newWin.focus();
}


// CREATE THE TOP CALENDAR FRAME
function buildTopCalFrame() {

    // CREATE THE TOP FRAME OF THE CALENDAR
    var calDoc =
        "<HTML>" +
        "<HEAD>" +
        "</HEAD>" +
        "<BODY onload='parent.opener.rewriteCalendar();' BGCOLOR='" + topBackground + "'>" +
        "<FORM NAME='calControl' onSubmit='return false;'>" +
        "<CENTER>" +
        "<TABLE CELLPADDING=0 CELLSPACING=1 BORDER=0>" +
        "<TR><TD COLSPAN=7>" +
        "<CENTER>" +
        getMonthSelect() +
        "<INPUT NAME='year' VALUE='" + calDate.getFullYear() + "'TYPE=TEXT SIZE=4 MAXLENGTH=4 onChange='parent.opener.setYear()'>" +
        "</CENTER>" +
        "</TD>" +
        "</TR>" +
        "<TR>" +
        "<TD COLSPAN=7>" +
        "<INPUT " +
        "TYPE=BUTTON NAME='previousYear' VALUE='<<'    onClick='parent.opener.setPreviousYear()'><INPUT " +
        "TYPE=BUTTON NAME='previousMonth' VALUE=' < '   onClick='parent.opener.setPreviousMonth()'><INPUT " +
        "TYPE=BUTTON NAME='today' VALUE='" + L_Today + "' onClick='parent.opener.setToday()'><INPUT " +
        "TYPE=BUTTON NAME='nextMonth' VALUE=' > '   onClick='parent.opener.setNextMonth()'><INPUT " +
        "TYPE=BUTTON NAME='nextYear' VALUE='>>'    onClick='parent.opener.setNextYear()'>" +
        "</TD>" +
        "</TR>" +
        "</TABLE>" +
        "</CENTER>" +
        "</FORM>" +
        "</BODY>" +
        "</HTML>";

    return calDoc;
}


// CREATE THE BOTTOM CALENDAR FRAME
// (THE MONTHLY CALENDAR)
function buildBottomCalFrame() {

    // START CALENDAR DOCUMENT
    var calDoc = calendarBegin;

    // GET MONTH, AND YEAR FROM GLOBAL CALENDAR DATE
    month   = calDate.getMonth();
    year    = calDate.getFullYear();


    // GET GLOBALLY-TRACKED DAY VALUE (PREVENTS JAVASCRIPT DATE ANOMALIES)
    day     = calDay;

    var i   = 0;

    // DETERMINE THE NUMBER OF DAYS IN THE CURRENT MONTH
    var days = getDaysInMonth();

    // IF GLOBAL DAY VALUE IS > THAN DAYS IN MONTH, HIGHLIGHT LAST DAY IN MONTH
    if (day > days) {
        day = days;
    }

    // DETERMINE WHAT DAY OF THE WEEK THE CALENDAR STARTS ON
    var firstOfMonth = new Date (year, month, 1);

    // GET THE DAY OF THE WEEK THE FIRST DAY OF THE MONTH FALLS ON
    var startingPos  = firstOfMonth.getDay();
    days += startingPos;

    // KEEP TRACK OF THE COLUMNS, START A NEW ROW AFTER EVERY 7 COLUMNS
    var columnCount = 0;

    // MAKE BEGINNING NON-DATE CELLS BLANK
    for (i = 0; i < startingPos; i++) {

        calDoc += blankCell;
	columnCount++;
    }

    // SET VALUES FOR DAYS OF THE MONTH
    var currentDay = 0;
    var dayType    = "weekday";

    // DATE CELLS CONTAIN A NUMBER
    for (i = startingPos; i < days; i++) {

	var paddingChar = "&nbsp;";

        // ADJUST SPACING SO THAT ALL LINKS HAVE RELATIVELY EQUAL WIDTHS
        if (i-startingPos+1 < 10) {
            padding = "&nbsp;&nbsp;";
        }
        else {
            padding = "&nbsp;";
        }

        // GET THE DAY CURRENTLY BEING WRITTEN
        currentDay = i-startingPos+1;

        // SET THE TYPE OF DAY, THE focusDay GENERALLY APPEARS AS A DIFFERENT COLOR
        if (currentDay == day) {
            dayType = "focusDay";
        }
        else {
            dayType = "weekDay";
        }

        // ADD THE DAY TO THE CALENDAR STRING
        calDoc += "<TD align=center bgcolor='" + cellColor + "'>" +
                  "<a class='" + dayType + "' href='javascript:parent.opener.returnDate(" +
                  currentDay + ")'>" + padding + currentDay + paddingChar + "</a></TD>";

        columnCount++;

        // START A NEW ROW WHEN NECESSARY
        if (columnCount % 7 == 0) {
            calDoc += "</TR><TR>";
        }
    }

    // MAKE REMAINING NON-DATE CELLS BLANK
    for (i=days; i<42; i++)  {

        calDoc += blankCell;
	columnCount++;

        // START A NEW ROW WHEN NECESSARY
        if (columnCount % 7 == 0) {
            calDoc += "</TR>";
            if (i<41) {
                calDoc += "<TR>";
            }
        }
    }

    // FINISH THE NEW CALENDAR PAGE
    calDoc += calendarEnd;

    // RETURN THE COMPLETED CALENDAR PAGE
    return calDoc;
}


// WRITE THE MONTHLY CALENDAR TO THE BOTTOM CALENDAR FRAME
function writeCalendar() {

    // CREATE THE NEW CALENDAR FOR THE SELECTED MONTH & YEAR
    calDocBottom = buildBottomCalFrame();

    // WRITE THE NEW CALENDAR TO THE BOTTOM FRAME
    //top.newWin.frames['bottomCalFrame'].document.open();
    top.newWin.frames['bottomCalFrame'].document.write(calDocBottom);
    top.newWin.frames['bottomCalFrame'].document.close();
}

// Global var for our write out the calendar twice hack to get NN4 to work with Japanese characters.
// It's an ugly hack but what can you do.
var redraw = true;
function rewriteCalendar()
{
	if (isNav)
	{
		if (navigator.language == "ja")
		{
			if (redraw)
			{
				calDocBottom = buildBottomCalFrame();
				calDocTop = buildTopCalFrame();

				redraw = false;

				// WRITE THE NEW CALENDAR TO THE TOP FRAME
				top.newWin.frames['topCalFrame'].document.open();
				top.newWin.frames['topCalFrame'].document.write(calDocTop);
				top.newWin.frames['topCalFrame'].document.close();

				// WRITE THE NEW CALENDAR TO THE BOTTOM FRAME
				top.newWin.frames['bottomCalFrame'].document.open();
				top.newWin.frames['bottomCalFrame'].document.write(calDocBottom);
				top.newWin.frames['bottomCalFrame'].document.close();


			}
			else redraw = true;
		}
	}
}

// SET THE CALENDAR TO TODAY'S DATE AND DISPLAY THE NEW CALENDAR
function setToday() {

     // SET GLOBAL DATE TO TODAY'S DATE
    calDate = new Date();

    // SET DAY MONTH AND YEAR TO TODAY'S DATE
    var month = calDate.getMonth();
    var year  = calDate.getFullYear();

    // SET MONTH IN DROP-DOWN LIST
    top.newWin.frames['topCalFrame'].document.calControl.month.selectedIndex = month;

    // SET YEAR VALUE
    top.newWin.frames['topCalFrame'].document.calControl.year.value = year;
    calDay  = calDate.getDate();
    // DISPLAY THE NEW CALENDAR
    writeCalendar();
}


// SET THE GLOBAL DATE TO THE NEWLY ENTERED YEAR AND REDRAW THE CALENDAR
function setYear() {
    // GET THE NEW YEAR VALUE

    if (isClosed)
    {
	return true;
    }

    var year  = top.newWin.frames['topCalFrame'].document.calControl.year.value;

    // IF IT'S A FOUR-DIGIT YEAR THEN CHANGE THE CALENDAR
    if (isFourDigitYear(year)) {
        calDate.setFullYear(year);
        writeCalendar();
    }
    else {
        // HIGHLIGHT THE YEAR IF THE YEAR IS NOT FOUR DIGITS IN LENGTH
        top.newWin.frames['topCalFrame'].document.calControl.year.focus();
        top.newWin.frames['topCalFrame'].document.calControl.year.select();
    }
}


// SET THE GLOBAL DATE TO THE SELECTED MONTH AND REDRAW THE CALENDAR
function setCurrentMonth() {

    // GET THE NEWLY SELECTED MONTH AND CHANGE THE CALENDAR ACCORDINGLY
    var month = top.newWin.frames['topCalFrame'].document.calControl.month.selectedIndex;

    calDate.setMonth(month);
    writeCalendar();
}


// SET THE GLOBAL DATE TO THE PREVIOUS YEAR AND REDRAW THE CALENDAR
function setPreviousYear() {

    var year  = top.newWin.frames['topCalFrame'].document.calControl.year.value;

    if (isFourDigitYear(year) && year > 1000) {
        year--;
        calDate.setFullYear(year);
        top.newWin.frames['topCalFrame'].document.calControl.year.value = year;
        writeCalendar();
    }
}


// SET THE GLOBAL DATE TO THE PREVIOUS MONTH AND REDRAW THE CALENDAR
function setPreviousMonth() {

    var year  = top.newWin.frames['topCalFrame'].document.calControl.year.value;
    if (isFourDigitYear(year)) {
        var month = top.newWin.frames['topCalFrame'].document.calControl.month.selectedIndex;

        // IF MONTH IS JANUARY, SET MONTH TO DECEMBER AND DECREMENT THE YEAR
        if (month == 0) {
            month = 11;
            if (year > 1000) {
                year--;
                calDate.setFullYear(year);
                top.newWin.frames['topCalFrame'].document.calControl.year.value = year;
            }
        }
        else {
            month--;
        }
        calDate.setMonth(month);
        top.newWin.frames['topCalFrame'].document.calControl.month.selectedIndex = month;
        writeCalendar();
    }
}


// SET THE GLOBAL DATE TO THE NEXT MONTH AND REDRAW THE CALENDAR
function setNextMonth() {

    var year = top.newWin.frames['topCalFrame'].document.calControl.year.value;

    if (isFourDigitYear(year)) {
        var month = top.newWin.frames['topCalFrame'].document.calControl.month.selectedIndex;

        // IF MONTH IS DECEMBER, SET MONTH TO JANUARY AND INCREMENT THE YEAR
        if (month == 11) {
            month = 0;
            year++;
            calDate.setFullYear(year);
            top.newWin.frames['topCalFrame'].document.calControl.year.value = year;
        }
        else {
            month++;
        }
        calDate.setMonth(month);
        top.newWin.frames['topCalFrame'].document.calControl.month.selectedIndex = month;
        writeCalendar();
    }
}


// SET THE GLOBAL DATE TO THE NEXT YEAR AND REDRAW THE CALENDAR
function setNextYear() {

    var year  = top.newWin.frames['topCalFrame'].document.calControl.year.value;
    if (isFourDigitYear(year)) {
        year++;
        calDate.setFullYear(year);
        top.newWin.frames['topCalFrame'].document.calControl.year.value = year;
        writeCalendar();
    }
}


// GET NUMBER OF DAYS IN MONTH
function getDaysInMonth()  {

    var days;
    var month = calDate.getMonth()+1;
    var year  = calDate.getFullYear();

    // RETURN 31 DAYS
    if (month==1 || month==3 || month==5 || month==7 || month==8 ||
        month==10 || month==12)  {
        days=31;
    }
    // RETURN 30 DAYS
    else if (month==4 || month==6 || month==9 || month==11) {
        days=30;
    }
    // RETURN 29 DAYS
    else if (month==2)  {
        if (isLeapYear(year)) {
            days=29;
        }
        // RETURN 28 DAYS
        else {
            days=28;
        }
    }
    return (days);
}


// CHECK TO SEE IF YEAR IS A LEAP YEAR
function isLeapYear (Year) {

    if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
        return (true);
    }
    else {
        return (false);
    }
}


// ENSURE THAT THE YEAR IS FOUR DIGITS IN LENGTH
function isFourDigitYear(year) {

    if (year.length != 4) {
        top.newWin.frames['topCalFrame'].document.calControl.year.value = calDate.getFullYear();
        top.newWin.frames['topCalFrame'].document.calControl.year.select();
        top.newWin.frames['topCalFrame'].document.calControl.year.focus();
    }
    else {
        return true;
    }
}


// BUILD THE MONTH SELECT LIST
function getMonthSelect() {

    monthArray = new Array(L_January, L_February, L_March, L_April, L_May, L_June,
                           L_July, L_August, L_September, L_October, L_November, L_December);

    // DETERMINE MONTH TO SET AS DEFAULT
    var activeMonth = calDate.getMonth();

    // START HTML SELECT LIST ELEMENT
    monthSelect = "<SELECT NAME='month' onChange='parent.opener.setCurrentMonth()'>";

    // LOOP THROUGH MONTH ARRAY
    for (i in monthArray) {

        // SHOW THE CORRECT MONTH IN THE SELECT LIST
        if (i == activeMonth) {
            monthSelect += "<OPTION SELECTED>" + monthArray[i] + "\n";
        }
        else {
            monthSelect += "<OPTION>" + monthArray[i] + "\n";
        }
    }
    monthSelect += "</SELECT>";

    // RETURN A STRING VALUE WHICH CONTAINS A SELECT LIST OF ALL 12 MONTHS
    return monthSelect;
}


// SET DAYS OF THE WEEK DEPENDING ON LANGUAGE
function createWeekdayList() {

   weekdayArray = new Array(L_Su,L_Mo,L_Tu,L_We,L_Th,L_Fr,L_Sa);


    // START HTML TO HOLD WEEKDAY NAMES IN TABLE FORMAT
    var weekdays = "<TR BGCOLOR='" + headingCellColor + "'>";

    // LOOP THROUGH WEEKDAY ARRAY
    for (i in weekdayArray) {

        weekdays += "<TD class='heading' align=center>" + weekdayArray[i] + "</TD>";
    }
    weekdays += "</TR>";

    // RETURN TABLE ROW OF WEEKDAY ABBREVIATIONS TO DISPLAY ABOVE THE CALENDAR
    return weekdays;
}


// PRE-BUILD PORTIONS OF THE CALENDAR (FOR PERFORMANCE REASONS)
function buildCalParts() {

    // GENERATE WEEKDAY HEADERS FOR THE CALENDAR
    weekdays = createWeekdayList();

    // BUILD THE BLANK CELL ROWS
    blankCell = "<TD align=center bgcolor='" + cellColor + "'>&nbsp;&nbsp;&nbsp;</TD>";

    // BUILD THE TOP PORTION OF THE CALENDAR PAGE USING CSS TO CONTROL SOME DISPLAY ELEMENTS
    calendarBegin =
        "<HTML>" +
        "<HEAD>" +
        // STYLESHEET DEFINES APPEARANCE OF CALENDAR
        "<STYLE type='text/css'>" +
        "<!--" +
        "TD.heading { text-decoration: none; color:" + headingTextColor + "; font: " + headingFontStyle + "; }" +
        "A.focusDay:link { color: " + focusColor + "; text-decoration: none; font: " + fontStyle + "; }" +
        "A.focusDay:hover { color: " + focusColor + "; text-decoration: none; font: " + fontStyle + "; }" +
        "A.focusDay:visited { color: " + focusColor + "; text-decoration: none; font: " + fontStyle + "; }" +
        "A.weekday:link { color: " + dateColor + "; text-decoration: none; font: " + fontStyle + "; }" +
        "A.weekday:hover { color: " + hoverColor + "; font: " + fontStyle + "; }" +
        "A.weekday:visited { color: " + dateColor + "; text-decoration: none; font: " + fontStyle + "; }" +
        "-->" +
        "</STYLE>" +
        "</HEAD>" +
        "<BODY BGCOLOR='" + bottomBackground + "'" +
        "<CENTER>";

        // NAVIGATOR NEEDS A TABLE CONTAINER TO DISPLAY THE TABLE OUTLINES PROPERLY
        if (isNav) {
            calendarBegin +=
                "<TABLE CELLPADDING=0 CELLSPACING=1 BORDER=" + tableBorder + " ALIGN=CENTER BGCOLOR='" + tableBGColor + "'><TR><TD>";
        }

        // BUILD WEEKDAY HEADINGS
        calendarBegin +=
            "<TABLE CELLPADDING=0 CELLSPACING=1 BORDER=" + tableBorder + " ALIGN=CENTER BGCOLOR='" + tableBGColor + "'>" +
            weekdays +
            "<TR>";


    // BUILD THE BOTTOM PORTION OF THE CALENDAR PAGE
    calendarEnd = "";

        // WHETHER OR NOT TO DISPLAY A THICK LINE BELOW THE CALENDAR
        if (bottomBorder) {
            calendarEnd += "<TR></TR>";
        }

        // NAVIGATOR NEEDS A TABLE CONTAINER TO DISPLAY THE BORDERS PROPERLY
        if (isNav) {
            calendarEnd += "</TD></TR></TABLE>";
        }

        // END THE TABLE AND HTML DOCUMENT
        calendarEnd +=
            "</TABLE>" +
            "</CENTER>" +
            "</BODY>" +
            "</HTML>";
}


// REPLACE ALL INSTANCES OF find WITH replace
// inString: the string you want to convert
// find:     the value to search for
// replace:  the value to substitute
//
// usage:    jsReplace(inString, find, replace);
// example:  jsReplace("To be or not to be", "be", "ski");
//           result: "To ski or not to ski"
//
function jsReplace(inString, find, replace) {

    var outString = "";

    if (!inString) {
        return "";
    }

    // REPLACE ALL INSTANCES OF find WITH replace
    if (inString.indexOf(find) != -1) {
        // SEPARATE THE STRING INTO AN ARRAY OF STRINGS USING THE VALUE IN find
        t = inString.split(find);

        // JOIN ALL ELEMENTS OF THE ARRAY, SEPARATED BY THE VALUE IN replace
        return (t.join(replace));
    }
    else {
        return inString;
    }
}


// JAVASCRIPT FUNCTION -- DOES NOTHING (USED FOR THE HREF IN THE CALENDAR CALL)
function doNothing() {
}


// ENSURE THAT VALUE IS TWO DIGITS IN LENGTH
function makeTwoDigit(inValue) {

    var numVal = parseInt(inValue, 10);

    // VALUE IS LESS THAN TWO DIGITS IN LENGTH
    if (numVal < 10) {

        // ADD A LEADING ZERO TO THE VALUE AND RETURN IT
        return("0" + numVal);
    }
    else {
        return numVal;
    }
}

// SET FIELD VALUE TO THE DATE SELECTED AND CLOSE THE CALENDAR WINDOW
function returnDate(inDay)
{
    // inDay = THE DAY THE USER CLICKED ON
    setYear();
    calDate.setDate(inDay);

    // SET THE DATE RETURNED TO THE USER
    var day           = calDate.getDate();
    var month         = calDate.getMonth()+1;
    var year          = calDate.getFullYear();
    
    if ( DateTimeFormat == true )
        outDate = "DateTime(";
    else
	outDate = "Date(";

    outDate += year + ",";
    outDate += month + ",";
    outDate += day;
    
    if ( DateTimeFormat == true ) {
        outDate += ",";
        outDate += gHour + ",";  gHour = "0";
        outDate += gMin  + ",";  gMin  = "0";
        outDate += gSec;         gSec  = "0";
    }
    outDate += ")";

    // SET THE VALUE OF THE FIELD THAT WAS PASSED TO THE CALENDAR
    calDateField.value = outDate;

    // GIVE FOCUS BACK TO THE DATE FIELD
    calDateField.focus();

    // CLOSE THE CALENDAR WINDOW
    top.newWin.close()
}

var gHour = "0";
var gMin  = "0";
var gSec  = "0";
var regDateTimePrompt  = /^(D|d)(A|a)(T|t)(E|e)(T|t)(I|i)(M|m)(E|e) *\( *\d{4} *, *(0?[1-9]|1[0-2]) *, *((0?[1-9]|[1-2]\d)|3(0|1)) *, *([0-1]?\d|2[0-3]) *, *[0-5]?\d *, *[0-5]?\d *\)$/
function ParseDateTimePrompt(inDate)
{
    if ( regDateTimePrompt.test ( inDate ) )
    {
        var sDate = inDate.substr ( inDate.indexOf("(")+1 );    //move past "DateTime ("
        sDate = sDate.substr ( 0, sDate.lastIndexOf(")") );     //remove trailing ")"
        var dateArray = sDate.split (',');
        var _date = new Date ( dateArray[0], dateArray[1], dateArray[2] );
        _date.setMonth ( _date.getMonth ()-1 );  //move from 1 based to 0 based
        gHour = dateArray[3]; gMin = dateArray[4]; gSec = dateArray[5];
        return _date;
    }
    return new Date ();
}

var regDatePrompt = /^(D|d)(A|a)(T|t)(E|e) *\( *\d{4} *, *(0?[1-9]|1[0-2]) *, *((0?[1-9]|[1-2]\d)|3(0|1)) *\)$/
function ParseDatePrompt(inDate)
{
    if ( regDatePrompt.test ( inDate ) )
    {
        var sDate = inDate.substr ( inDate.indexOf("(")+1 );    //move past "Date ("
        sDate = sDate.substr ( 0, sDate.lastIndexOf(")") );     //remove trailing ")"
        var dateArray = sDate.split (',');
        var _date = new Date ( dateArray[0], dateArray[1], dateArray[2] );
        _date.setMonth ( _date.getMonth()-1 );  //move from 1 based to 0 based
        return _date;
    }
    return new Date();
}
