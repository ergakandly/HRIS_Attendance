<%@ page import="java.io.*"%>

<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page import="javax.servlet.http.HttpServletRequest" %>
<%@ page import="javax.servlet.http.HttpServletResponse" %>

<%@ page import="com.crystaldecisions.sdk.occa.report.data.*" %>
<%@ page import="com.crystaldecisions.sdk.occa.report.application.*" %>
<%@ page import="com.crystaldecisions.sdk.occa.report.lib.*" %>
<%@ page import="com.crystaldecisions.report.web.viewer.*" %>


<%-- <%@ page import="com.crystaldecisions.reports.sdk.*" %>
<%@ page import="com.crystaldecisions.reports.reportengineinterface.*" %>  --%>

<%@ page import="com.crystaldecisions.sdk.occa.report.exportoptions.*" %>
<%@ page import="com.crystaldecisions.sdk.occa.report.application.ReportClientDocument" %>
<%@ page import="com.crystaldecisions.sdk.occa.report.reportsource.*" %>
<%@ page import="com.crystaldecisions.sdk.occa.report.exportoptions.*" %>



<%!
// Path directory for all reports.
String disableCache = "rassdk://";
String path = "C:\\Program Files (x86)\\Crystal Decisions\\Report Application Server 9\\Reports\\";
/*********** TESTING *************/
// Should be using XML config file: clientSDKOptions.xml.
// String rasHostName = "014ACE0815";
String rasHostName = "192.168.10.16";
String dbUser = "ace_hr";
String dbPassword = "ace";


/**
 * Modify the crystal report document current value parameters.
 *
 * @param paramIndex the index position of the parameter.
 * @param valContent the value content for the parameter.
 * @param clientDoc the ReportClientDocument object.
 */
public void setDocParameter(int paramIndex, String valContent, ReportClientDocument clientDoc)
       throws ReportSDKException {
    ParameterField newParameterField = null;
    ParameterFieldDiscreteValue newDiscreteValue = null;

    // Get the copy of the param object.
    newParameterField = new ParameterField();
    ((ParameterField)clientDoc.getDataDefinition().getParameterFields().getField(paramIndex)).copyTo(
        newParameterField, true);

    // Set Discrete value.
    newDiscreteValue = new ParameterFieldDiscreteValue();
    newDiscreteValue.setValue(valContent);

    // Set ParameterField with the Discrete value.
    newParameterField.getCurrentValues().add(newDiscreteValue);

    // Modify with the new ParameterField
    clientDoc.getDataDefController().getParameterFieldController().modify(
        (IParameterField) clientDoc.getDataDefinition().getParameterFields().getField(paramIndex)
        , newParameterField);
}

/**
 * Create ReportClientDocument object and open a report template.
 *
 * @param reportName the index position of the parameter.
 * @return the ReportClientDocument object.
 */
ReportClientDocument getClientDocument(String reportName)
      throws ReportSDKException, Exception {   

  ReportAppSession ra = new ReportAppSession();
   try {
      ra.createService("com.crystaldecisions.sdk.occa.report.application.ReportClientDocument");
      ra.setReportAppServer(rasHostName);
      ra.initialize();
   } catch (Exception ex) {
      System.out.println(ex);
      throw ex;
   }
   ReportClientDocument clientDoc = new ReportClientDocument();
   try {
      clientDoc.setReportAppServer(ra.getReportAppServer());
   } catch (Exception ex) {
      throw ex;
   }
   String reportPath = path + reportName;
   try {
//      System.out.println("* Path: " + reportPath +" "+ OpenReportOptions._openAsReadOnly);

      // Open the report and set the open type as Read Only.
      clientDoc.open(reportPath, OpenReportOptions._openAsReadOnly);
      // Refresh report.
      clientDoc.refreshReportDocument();
   } catch (ReportSDKException reportSdkEx) {
     System.out.println(reportSdkEx);
     throw reportSdkEx;
   }
   // Logon to database.
   clientDoc.getDatabaseController().logon(dbUser, dbPassword);
   return clientDoc;
}

/**
 * View the report.
 *
 * @param clientDoc the index position of the parameter.
 * @param request the value content for the parameter.
 * @param response the ReportClientDocument object.
 * @param session
 */
public void viewReport(ReportClientDocument clientDoc
        , HttpServletRequest request
        , HttpServletResponse response
        , HttpSession session
        ) throws ReportSDKExceptionBase, Exception {

    // Refresh report.
    //ReportServerControl serverControl = new ReportServerControl();
    //serverControl.setReportSource(clientDoc.getReportSource());
    //serverControl.refresh();

    // Create a CrystalReportViewer object
    System.out.println("CreateViewer");
     CrystalReportViewer viewer = new CrystalReportViewer();
    System.out.println("FinishesCreateViewer");

    System.out.println("SetPageProperties");
    viewer.setDisplayPage(true);
    viewer.setDisplayGroupTree(false);
//    viewer.set PageToTreeRatio(2);
    viewer.setDisplayToolbar(true);
    viewer.setOwnPage(true);
    viewer.setZoomFactor(100);
    viewer.setEnableLogonPrompt(false);
    viewer.setEnableParameterPrompt(false);
    viewer.setEnableDrillDown(false);
    viewer.setReuseParameterValuesOnRefresh(false);
    System.out.println("FinishesSetPageProperties");

    // Set the source for the  viewer to the client documents report source
    System.out.println("SetReportSource");
    viewer.setReportSource(clientDoc.getReportSource());
    System.out.println("FinishesSetReportSource");

    // Process the http request to view the report
    try{
      System.out.println("processHttpRequest");
        viewer.processHttpRequest(request, response, getServletConfig().getServletContext(), null);
    }catch(Exception e){
      System.out.println(e);
      throw e;
    }
    // Dispose the viewer object
    viewer.dispose();
    if(viewer!=null){
        viewer = null;
    }
    // Close the ReportClientDocument
    //clientDoc.close();
    //clientDoc.dispose();
    System.out.println("Generate report finish");
}

/**
 * View the report.
 *
 * @param clientDoc the index position of the parameter.
 * @param request the value content for the parameter.
 * @param response the ReportClientDocument object.
 * @param session
 */
public void viewReportPlain(ReportClientDocument clientDoc
        , HttpServletRequest request
        , HttpServletResponse response
        , HttpSession session
        ) throws ReportSDKExceptionBase, Exception {

    // Refresh report.
    //ReportServerControl serverControl = new ReportServerControl();
    //serverControl.setReportSource(clientDoc.getReportSource());
    //serverControl.refresh();

    // Create a CrystalReportViewer object
    System.out.println("CreateViewer");
     CrystalReportViewer viewer = new CrystalReportViewer();
    System.out.println("FinishesCreateViewer");

    System.out.println("SetPageProperties");
    viewer.setDisplayPage(true);
    viewer.setDisplayGroupTree(false);
//    viewer.set PageToTreeRatio(2);
    viewer.setDisplayToolbar(false);
    viewer.setOwnPage(true);
    viewer.setZoomFactor(90);
    viewer.setEnableLogonPrompt(false);
    viewer.setEnableParameterPrompt(false);
    viewer.setEnableDrillDown(false);
    viewer.setReuseParameterValuesOnRefresh(false);
    System.out.println("FinishesSetPageProperties");

    // Set the source for the  viewer to the client documents report source
    System.out.println("SetReportSource");
    viewer.setReportSource(clientDoc.getReportSource());
    System.out.println("FinishesSetReportSource");

    // Process the http request to view the report
    try{
      System.out.println("processHttpRequest");
        viewer.processHttpRequest(request, response, getServletConfig().getServletContext(), null);
    }catch(Exception e){
      System.out.println(e);
      throw e;
    }
    // Dispose the viewer object
    viewer.dispose();
    if(viewer!=null){
        viewer = null;
    }
    // Close the ReportClientDocument
    //clientDoc.close();
    //clientDoc.dispose();
    System.out.println("Generate report finish");
}

%>
