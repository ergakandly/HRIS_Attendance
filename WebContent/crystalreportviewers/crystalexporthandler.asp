<%@ Language=VBScript %>

<% 
Function handleDocument()
	Dim handler
	On Error Resume Next
	Set handler = CreateObject("CrystalReports.CrystalExportHandler")
	Call handler.HandleDocument(Request, Response)
 	if Err.number <> 0 then
		Response.Write Err.Description
		Err.Clear
	end if
End Function
%>

<% handleDocument %>
