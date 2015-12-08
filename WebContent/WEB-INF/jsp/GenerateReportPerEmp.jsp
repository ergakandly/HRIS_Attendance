<%
/* 
 * Applies to versions:	XI Release 2
 * Date Created: December 2005
 * Description: This sample demonstrates how to export a report to a stream (server-side exporting).  The sample
 * 				then demonstrates how to use the Java I/O libraries to write the exported result to the local 
 * 				file system or the browser.
 * 				NOTE: If the report is based on a secured database the database login credentials
 * 				will need to be set before calling the export method below.  Also, if the report
 * 				has parameters, then values will need to be set for the report before export method can
 * 				be called or an error will be thrown.  See the ViewReportParameters or ViewReportLogon samples 
 * 				for samples on how to set parameters and login credentials through the JRC SDK.   
 * Author: CW.
 */
%>

<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>

<%//Crystal Java Reporting Component (JRC) imports.%>

<%@include file="CrystalReportHelper.jsp"%>

<%//Java imports. %>
<%@page import="java.io.*" %>

<%
//Reports can be opened from the relative location specified in the CRConfig.xml, or the report location
//tag can be removed to open the reports as Java resources or using an absolute path (absolute path not recommended
//for Web applications).
final String REPORT_NAME = "AttendancePerEmployee.rpt";
 
final String EXPORT_FILE = "ExportedAttendancePerEmp.pdf";
%>

<%
try {
	
	//Open report.
	ReportClientDocument reportClientDoc = getClientDocument(REPORT_NAME);
	
	//NOTE: If parameters or database login credentials are required, they need to be set before.
	//calling the export() method of the PrintOutputController.

	int i=0;
	
	
	String p_date = request.getAttribute("period").toString();
	String p_empId = request.getAttribute("empId").toString();
	setDocParameter(i++, p_date, reportClientDoc);
	setDocParameter(i++, p_empId, reportClientDoc);
	
	//Export report and obtain an input stream that can be written to disk.
	//See the Java Reporting Component Developer's Guide for more information on the supported export format enumerations
	//possible with the JRC.
	ByteArrayInputStream byteArrayInputStream = (ByteArrayInputStream)reportClientDoc.getPrintOutputController().export(ReportExportFormat.PDF);
			
	//Release report.
	reportClientDoc.close();
	
	//These utility methods below demonstrate how to use the Java I/O libraries to write the input stream content
	//directly to the browser, or the server's file system.  Note: We are now working with APIs completely outside of
	//Crystal at this point:  						
	writeToBrowser(byteArrayInputStream, response, "application/pdf", EXPORT_FILE);	
}
catch(ReportSDKException ex) {	
	out.println(ex);
}
catch(Exception ex) {
	out.println(ex);			
}
%>

<%!
   /*
	* Utility method that demonstrates how to write an input stream to the server's local file system.  
	*/
	private void writeToBrowser(ByteArrayInputStream byteArrayInputStream, HttpServletResponse response, String mimetype, String exportFile) throws Exception {
	
		//Create a byte[] the same size as the exported ByteArrayInputStream.
		byte[] buffer = new byte[byteArrayInputStream.available()];
		int bytesRead = 0;
		
		//Set response headers to indicate mime type and inline file.
		response.reset();
		response.setHeader("Content-disposition", "inline;filename=" + exportFile);
		response.setContentType(mimetype);
		
		//Stream the byte array to the client.
		while((bytesRead = byteArrayInputStream.read(buffer)) != -1) {
			response.getOutputStream().write(buffer, 0, bytesRead);	
		}
		
		//Flush and close the output stream.
		response.getOutputStream().flush();
		response.getOutputStream().close();	
	}
%>	