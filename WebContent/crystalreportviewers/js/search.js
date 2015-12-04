//============================================================================

function GetSelectedFields()
{
	var optionArray = document.getElementById("selectedFields").options;
	var returnString = "";
	if( optionArray != null && optionArray[0] != null )
	{
		returnString = optionArray[0].text;
		for( var i = 1; i < optionArray.length; i++ ) {
			returnString = returnString + "*$*" + optionArray[i].text;
		}
		returnString += "&type=fields";
	}
	
	return returnString;
}

function addOnToFormula( strFieldToBeAdded )
{
	var tempStr = document.all.DesignPane.innerText;
	document.all.DesignPane.innerText = tempStr + " " + strFieldToBeAdded;	
}

function moveOptionsFromListToList( fromListName, toListName, selectedOnly )
{
	var fromList = document.getElementById( fromListName );
	var fromOptions = fromList.options;
	var toList = document.getElementById( toListName );
	
	for( var i=0; i < fromOptions.length; i++ )
	{
		if( !selectedOnly || fromOptions[i].selected )
		{
			var newElem = document.createElement("OPTION");
			newElem.text = fromOptions[i].text;
			
			//Netscape requires a null argument to add to the end of the list - IE doesn't support null
			//so we do the correct one - using document.all as an IE detecter
			if( document.all )
			{
				toList.add( newElem );
			}
			else
			{
				toList.add( newElem, null );
			}
			fromList.remove(i);
			i--;
		}
	}
}

function addToSelected()
{
	moveOptionsFromListToList( "unselectedFields", "selectedFields", true );
}

function addAllToSelected()
{
	moveOptionsFromListToList( "unselectedFields", "selectedFields", false );
}

function addToUnselected()
{
	moveOptionsFromListToList( "selectedFields", "unselectedFields", true );
}

function addAllToUnselected()
{
	moveOptionsFromListToList( "selectedFields", "unselectedFields", false );
}

function moveSelectedFieldUp()
{
	var selectedList = document.getElementById( "selectedFields" );
	var selectedOptions = selectedList.options;
	var size = selectedOptions.length;
	for( var i=0; i < size; i++ )
	{
		if( selectedOptions[i].selected && i > 0 )
		{
			//If we want to move i, then we remove the element before it (i moves up a space) and then put a copy of the
			//the removed element in position i
			var downElement = document.createElement( "OPTION" );
			downElement.text = selectedOptions[i-1].text;
			downElement.selected = selectedOptions[i-1].selected;
						
			selectedList.remove( i-1 );
			
			//IE doesn't support the DOM definition of selectList.add - it takes an index rather than the item to put the
			//element before - so we use the existence of document.all to decide if we use IE's method or the DOM method
			if( document.all )
			{
				selectedList.add( downElement, i );
			}
			else
			{
				selectedList.add( downElement, selectedOptions[i] );
			}
		}
	}
}

function moveSelectedFieldDown()
{
	var selectedList = document.getElementById( "selectedFields" );
	var selectedOptions = selectedList.options;
	for( var i=selectedOptions.length-1; i >= 0; i-- )
	{
		if( selectedOptions[i].selected && i < selectedOptions.length-1 )
		{
			//We do the same thing here as we did moving up - we want to move i+1 up - so we remove i (i+1 moves up) and then
			//put a copy of the removed element in position i+1
			var downElement = document.createElement( "OPTION" );
			downElement.text = selectedOptions[i].text;
			downElement.selected = selectedOptions[i].selected;
			
			selectedList.remove( i );
			
			//Again, IE doesn't support the DOM definition of selectList.add - it takes an index rather than the item to put
			//the element before - so we use the existence of document.all to decide if we use IE's method or the DOM method
			if( document.all )
			{
				selectedList.add( downElement, i+1 );
			}
			else
			{
				selectedList.add( downElement, selectedOptions[i+1] );
			}
		}
	}
}

function addRowToFormulaTable()
{
	var nextNumber = new Number( document.getElementById("NumberOfRows").value );

	var table = document.getElementById( "FormulaTable" );	
	var row;
	var cell;
	if( table.rows.length > 2 )
	{
		row = table.rows[table.rows.length-2];
		cell = row.insertCell(row.cells.length);
		fillJoinCell( cell, nextNumber-1 );
	}
	
	row = table.insertRow(table.rows.length-1);
	//Add the blank spacing cell
	row.insertCell(row.cells.length);
	
	cell = row.insertCell(row.cells.length);

	fillFieldsCell( cell, nextNumber );
	
	cell = row.insertCell(row.cells.length);
	
	if( document.getElementById( "Where" ) != null )
	{
		cell.innerText = document.getElementById( "Where" ).value;
		cell = row.insertCell(row.cells.length);
	}
	
	if( document.getElementById( "OpsFirst" ).value == "true" )
	{
		fillOpsCell( cell, nextNumber );
		cell = row.insertCell(row.cells.length);
		fillValueCell( cell, nextNumber );
	}
	else
	{
		fillValueCell( cell, nextNumber );
		cell = row.insertCell(row.cells.length);
		fillOpsCell( cell, nextNumber );
	}
	
	document.getElementById( "NumberOfRows" ).value = nextNumber+1;
}

function addFilledRowToFormulaTable( fieldNumber, opNumber, valueString, joinOpNumber )
{
	var currentIndex = new Number( document.getElementById("NumberOfRows").value );
	
	addRowToFormulaTable();
	
	if( joinOpNumber != null && joinOpNumber > -1 )
	{
		document.getElementById( "JoinInFormula" + (currentIndex-1) ).options[joinOpNumber].selected = true;
	}

	document.getElementById( "FieldInFormula" + currentIndex ).options[fieldNumber].selected = true;
	
	document.getElementById( "OpInFormula" + currentIndex ).options[opNumber].selected = true;
	
	document.getElementById( "ValueInFormula" + currentIndex).value = valueString;
}

function fillJoinCell( cell, number )
{
	var cellHTML = cell.innerHTML;
	cellHTML += "<select name=JoinInFormula" + number + " id=JoinInFormula" + number + ">";
	var joins = document.getElementById( "Joins" ).value.split( "*|*|" );
	
	for( var i = 0; i < joins.length; i++ )
	{
		if( i == 0 )
		{
			cellHTML += "<option selected value=\"" + i + "\">" + joins[i] + "</option>";
		}
		else
		{
			cellHTML += "<option value=\"" + i + "\">" + joins[i] + "</option>";
		}
	}
	
	cellHTML += "</select>";
	
	cell.innerHTML = cellHTML;
}

function fillFieldsCell( cell, number )
{
	var cellHTML = cell.innerHTML;
	cellHTML += "<select name=FieldInFormula" + number + " id=FieldInFormula" + number + ">";
	var fields = document.getElementById( "FormulaFields" ).value.split( "*|*|" );
	
	for( var i = 0; i < fields.length; i++ )
	{
		if( i == 0 )
		{
			cellHTML += "<option selected>" + fields[i] + "</option>";
		}
		else
		{
			cellHTML += "<option>" + fields[i] + "</option>";
		}
	}
	
	cellHTML += "</select>";
	
	cell.innerHTML = cellHTML;
}

function fillOpsCell( cell, number )
{
	var cellHTML = cell.innerHTML;
	cellHTML += "<select name=OpInFormula" + number + " id=OpInFormula" + number + ">";
	var ops = document.getElementById( "FormulaOps" ).value.split( "*|*|" );
	
	for( var i = 0; i < ops.length; i++ )
	{
		if( i == 0 )
		{
			cellHTML += "<option selected value=" + i + ">" + ops[i] + "</option>";
		}
		else
		{
			cellHTML += "<option value=" + i + ">" + ops[i] + "</option>";
		}
	}
	
	cellHTML += "</select>";
	
	cell.innerHTML = cellHTML;
}

function fillValueCell( cell, number )
{
	var cellHTML = cell.innerHTML;
	cellHTML += "<input type=text name=\"ValueInFormula" + number + "\" id=\"ValueInFormula" + number + "\">";
	cell.innerHTML = cellHTML;
}

function CreateFormula()
{
	var formula = "";
	//We'll only have number of rows in structured
	if( document.getElementById( "NumberOfRows" ) )
	{
		var numberOfRows = document.getElementById( "NumberOfRows" ).value;
		var lastJoinOperator = null;
		for( var i =0; i < numberOfRows; i++ )
		{
			var fieldSelect = document.getElementById( "FieldInFormula" + i );
			var fieldName = fieldSelect.options[fieldSelect.selectedIndex].text;
			
			var opsSelect = document.getElementById( "OpInFormula" + i );
			var opSymbol = getComparisonOperator( opsSelect.options[opsSelect.selectedIndex].value );
			
			var joinSelect = document.getElementById( "JoinInFormula" + i );
			var joinOperator = null;
			if( joinSelect != null )
			{
				joinOperator = getJoinOperator( joinSelect.options[joinSelect.selectedIndex].value );
			}
			
			var value = document.getElementById( "ValueInFormula" + i ).value;
		
			if( value != "" )
			{
				if( lastJoinOperator != null )
				{
					formula += " " + lastJoinOperator + " ";
				}
	
				formula += fieldName + " " + opSymbol + " " + value;
			}
		
			lastJoinOperator = joinOperator
		}
		
		formula += "&type=formula";
	}
	else if( document.getElementById( "FormulaText" ) )
	{
		formula += document.getElementById( "FormulaText" ).value;
		formula += "&type=formula";
	}

		
	return formula;
}

function getComparisonOperator( opNumber )
{
	var returnSymbol
	if( opNumber == 0 )
	{
		returnSymbol = "=";
	}
	else if( opNumber == 1 )
	{
		returnSymbol = ">";
	}
	else if( opNumber == 2 )
	{
		returnSymbol = "<";
	}
	else if( opNumber == 3 )
	{
		returnSymbol = ">=";
	}
	else if( opNumber == 4 )
	{
		returnSymbol = "<=";
	}
	else if( opNumber == 5 )
	{
		returnSymbol = "<>";
	}
	
	return returnSymbol;
}

function getJoinOperator( joinNumber )
{
	var returnOperator = null;
	if( joinNumber == 0 )
	{
		returnOperator = "and";
	}
	else if( joinNumber == 1 )
	{
		returnOperator = "or";
	}
	
	return returnOperator;
}

function addFieldToFreeFormFormula( fieldName )
{
	if( fieldName )
	{
		var freeFormTextBox = document.getElementById( "FormulaText" );
		if( freeFormTextBox )
		{
			freeFormTextBox.value += fieldName;
		}
	}
}

function removeFieldFromSelected( strFieldToBeRemoved, addFieldMenuLabel, removeFieldMenuLabel )
{
	//Remove the menu from the selected fields list
	var strCurrentSelList = document.all.SelectedList.innerHTML;
	var fieldsArray = strCurrentSelList.split( "<BR>" );
	var strNewSelList = "";
	//We're always going to have an empty node at the end
	for( var i = 0; i < (fieldsArray.length-1); i++ )
	{
		if( fieldsArray[i] != strFieldToBeRemoved )
		{
			strNewSelList += fieldsArray[i] + "<BR>";
		}
	}
	document.all.SelectedList.innerHTML = strNewSelList;
	
	//Add the field to the menu that lets you add an item to the selected fields list
	addMenuItemToExistingMenu( addFieldMenuLabel, strFieldToBeRemoved, 
		"addFieldToSelected( \"" + strFieldToBeRemoved + "\", \"" + addFieldMenuLabel + "\", \""
		+ removeFieldMenuLabel + "\" ); " );
		
	//Remove the field from the menu that lets your remove an item from the selected fields list
	removeMenuItemFromExistingMenu( removeFieldMenuLabel, strFieldToBeRemoved );
	
	//Rewrite the menus
	updateWrittenMenus();
}

//Assumes: hiddenTreeInfo is a div containing the full tree information in the expected form
//         groupTree is the div into which the group tree is expected to be placed
//         treeScrollCurrent is an element whose innerText contains the current position in the tree
//         treeScrollMaxVisible is an element whose innerText contains the maximum visible nodes for the tree
//Params:  updateType - a flag denoted whether this is a refresh or a move back or forward
function updateGroupTree( updateType )
{
	//Check that we actually have a tree
	if( !(document.all.hiddenTreeInfo) )
	{
		//If not, just disable the buttons and go
		if( document.all.scrollup )
		{
			document.all.scrollup.style.display = "none";
		}
		if( document.all.scrolldown )
		{
			document.all.scrolldown.style.display = "none";
		}
		
		return;
	}
	
	//Get all of the node info
	var strFullTreeInfo = document.all.hiddenTreeInfo.innerText;
	var aryAllTreeNodes = strFullTreeInfo.split( "!!@@" );

	//Get position info
	var treeScrollCurrent = new Number( document.all.treeScrollCurrent.innerText );
	var treeScrollMaxVisible = new Number( document.all.treeScrollMaxVisible.innerText );
	
	//Set up the start point correctly
	if( updateType == "refresh" )
	{
		//This is probably the first time we're calling this, so make sure that the start point is 
		//valid (ie. between 0 and # of nodes) and then make sure that it's at the start of a group
		//(ie. if treeScrollMaxVisible = 10, then start point should be 0 or 10 or 20 or ...)
		
		//Make start point valid
		if( treeScrollCurrent < 0 )
		{
			treeScrollCurrent = 0;
		}
		else if( treeScrollCurrent > (aryAllTreeNodes.length-1 ) )
		{
			//This will likely be in the middle of a page, but the next section will deal with that
			//so we're not even going to try
			treeScrollCurrent = aryAllTreeNodes.length-1;
		}
		
		//Put start point at the top of a page
		var remainder = treeScrollCurrent % treeScrollMaxVisible;
		if( remainder > 0 )
		{
			var newCurrentNode = treeScrollCurrent - remainder;
			document.all.treeScrollCurrent.innerText = newCurrentNode;
			treeScrollCurrent = newCurrentNode;
		}

	}
	else if( updateType == "previous" )
	{
		//Move the current node back by the number of visible nodes
		var newCurrentNode = treeScrollCurrent - treeScrollMaxVisible;
		if( newCurrentNode < 0 )
		{
			newCurrentNode = 0;
		}
		
		document.all.treeScrollCurrent.innerText = newCurrentNode;
		treeScrollCurrent = newCurrentNode;
	}
	else if( updateType == "next" )
	{
		//Move the current node forward by the number of visible nodes
		var newCurrentNode = treeScrollCurrent + treeScrollMaxVisible;
		if( newCurrentNode > (aryAllTreeNodes.length-1) )
		{
			//Nowhere to go
			newCurrentNode = treeScrollCurrent;
		}
		
		document.all.treeScrollCurrent.innerText = newCurrentNode;
		treeScrollCurrent = newCurrentNode;
	}
			
	//Set end point correctly - reminder, last node in the array will actually be blank, just because
	//of the way we print out the full tree info
	var endPoint = treeScrollCurrent+treeScrollMaxVisible;
	var numberToMax = 0;
	if( endPoint > (aryAllTreeNodes.length-1) )
	{
		//We want to be able to pad the report so that each time you scroll, the amount of space the tree takes up 
		//is the same - however, if we have less than treeScrollMaxVisible nodes there is only one page (no scrolling)
		//so we don't want to pad at all
		if( treeScrollMaxVisible < (aryAllTreeNodes.length-1) )
		{
			numberToMax = endPoint - (aryAllTreeNodes.length-1);
		}
		
		endPoint = (aryAllTreeNodes.length-1);
	}
	
	var downImage = "";
	var upImage = "";	
	if( document.all.treeImageDown )
	{
		downImage = document.all.treeImageDown.innerText;
	}
	if( document.all.treeImageUp )
	{
		upImage = document.all.treeImageUp.innerText;
	}
		
	//Write out each node
	var strGroupTreeText = "";
	for( var i=treeScrollCurrent; i < endPoint; i++ )	
	{
		//Get the node info
		var aryThisNodeInfo = aryAllTreeNodes[i].split( ":::" );
		if( aryThisNodeInfo == null )
		{
			continue;
		}
		
		var nodeLevel = aryThisNodeInfo[0];
		var imageFlag = aryThisNodeInfo[1];
		var growProcedure = aryThisNodeInfo[2];
		var name = aryThisNodeInfo[3];
		var nodePath = aryThisNodeInfo[4];
		var navigateProcedure = "";
		if( aryThisNodeInfo.length >= 6 )
		{
			//The last var may or may not be here
			navigateProcedure = aryThisNodeInfo[5];
		}
		
		for( var j=0; j < nodeLevel; j++ )
		{
			strGroupTreeText += "&nbsp&nbsp&nbsp";
		}
		
		//If this is the first node on the page (treeScrollCurrent) then we need to put
		//this information in the input for retrieval
		if( i == treeScrollCurrent )		
		{
			var pathOfTopNode = document.getElementById('topNodeOfTree');
			if( pathOfTopNode != null )
			{
				pathOfTopNode.value = nodePath;
			}
		}
		
		//Start writing out tag - first the marker, then the name
		strGroupTreeText += "<a class=\"crtreenode\" href=\"";
		strGroupTreeText += growProcedure;
		strGroupTreeText += "\"><img src=\"";
		if( imageFlag == "crtreenodeDown" )
		{
			strGroupTreeText += downImage;
		}
		else
		{
			strGroupTreeText += upImage;
		}
		strGroupTreeText += " \"><a>";
		strGroupTreeText += "&nbsp&nbsp";
		
		if( navigateProcedure )
		{
			strGroupTreeText += "<a class=\"crtreenode\" href=\"";
			strGroupTreeText += navigateProcedure;
			strGroupTreeText += "\">";
			strGroupTreeText += name;
			strGroupTreeText += "</a>";
		}
		else
		{
			strGroupTreeText += name;
		}
		strGroupTreeText += "<br>";
	}
	//If the number of entries on the page does not equal our max number of entries, we want to fill in blank 
	//spaces to keep the spacing the same	
	for( var j = 0; j<numberToMax; j++ )
	{
		strGroupTreeText += "&nbsp&nbsp";
		strGroupTreeText += "<br>";
	}
	
	document.all.groupTree.innerHTML = strGroupTreeText;
	
	//Reset the scroll buttons - if they exist - if this is the first time through, the scroll down
	//button won't exist yet
	if( document.all.scrollup )
	{
		if( treeScrollCurrent <= 0 )
		{
			//scroll up is disabled
			document.all.scrollup.style.visibility = "hidden";
		}
		else
		{
			document.all.scrollup.style.visibility = "visible";
		}
	}
	
	if( document.all.scrolldown )
	{
		if( endPoint >= (aryAllTreeNodes.length-1) )
		{
			//scroll down is disabled
			document.all.scrolldown.style.visibility = "hidden";
		}
		else
		{
			document.all.scrolldown.style.visibility = "visible";
		}
	}
}


//Function: SlideSideBar
//  Shows and hides the side bar depending on user behaviour
//Assumes: sidebar is in a table cell named SideBar
//         triggering area is a table cell named TriggerBar
function SlideSideBar( action )
{
	if( document.all.SideBar.filters[0] )
	{
		document.all.SideBar.filters[0].apply();
	}
	
	if( action == "hide" )
	{
		//If the side bar is showing, then we should hide it
		document.all.SideBar.style.display = "none";
	}
	else
	{
		//If the side bar is hidden, then we should show it
		document.all.SideBar.style.display = "inline";
	}
	
	if( document.all.SideBar.filters[0] )
	{
		document.all.SideBar.filters[0].play();
	}
}