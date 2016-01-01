<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html"%>
<%@ page import="java.io.*,java.util.*"%>
<%@ page import="javax.servlet.*,java.text.*"%>

<html:html>
<head>
<title>View Attendance</title>
<%@include file="PartBootstrap.jsp"%>
<link rel="stylesheet" type="text/css" href="asset/css/dataTable.min.css">
<script type="text/javascript" src="https://cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.10/js/dataTables.bootstrap.min.js"></script>
<script type="text/javascript">
	function flyToPage(task, empId) {
		document.forms[0].task.value = task;
		document.forms[0].empId.value = empId;
		document.forms[0].submit();
	}
</script>
</head>
<body>
	<div id="wrapper">
		<%@include file="PartNavbar.jsp"%>
		<div id="page-wrapper">
			<html:form action="/attendance">
				<html:hidden name="attendanceForm" property="task" />
				<html:hidden name="attendanceForm" property="empId" />
				<!-- CONTAINER -->
				<div class="container-fluid">
					<div class="row">

						<!-- ROW 12 -->
						<div class="col-md-12">

							<!--JUDUL-->
							<div class="page-header">
								<h3 id="timeline">List Employee</h3>
							</div>
							<!-- END JUDUL -->

							<!-- BREADCRUMB -->
							<ul class="breadcrumb">
								<li>
									<span class="fa fa-dashboard"></span>
									<a href="#"> Dashboard</a>
								</li>
								<li>
									<span class="fa fa-list"></span>
									<a href="javascript:flyToPage('employeeList');"> 
									List Employee</a>
								</li>
								<li>
									<span class="glyphicon glyphicon-eye-open"></span> 
									View
								</li>
							</ul>
							<!-- END BREADCRUMB -->

							<div class="col-md-10 col-md-offset-1">
								<div class="col-md-6">
								<div class="form-inline">
									<bean:define id="monthPeriod" name="attendanceForm" property="monthPeriod" />
									<bean:define id="currentYear" name="attendanceForm" property="currentYear" />

									<html:select name="attendanceForm" property="monthPeriod" styleClass="form-control form-control-sm form-inline">
										<html:option value="January">January</html:option>
										<html:option value="February">February</html:option>
										<html:option value="March">March</html:option>
										<html:option value="April">April</html:option>
										<html:option value="May">May</html:option>
										<html:option value="June">June</html:option>
										<html:option value="July">July</html:option>
										<html:option value="August">August</html:option>
										<html:option value="September">September</html:option>
										<html:option value="October">October</html:option>
										<html:option value="November">November</html:option>
										<html:option value="December">December</html:option>
									</html:select> 
									<html:select name="attendanceForm" property="yearPeriod" styleClass="form-control form-control-sm">
										<%
											for (int year = Integer.parseInt(currentYear.toString()); year >= 2010; year--) {
										%>
										<html:option value="<%=Integer.toString(year)%>"><%=year%></html:option>
										<%
											}
										%>
									</html:select>

									<button type="button" class="btn btn-primary" onclick="javascript:flyToPage('viewAttendancePerEmployee','<bean:write name="attendanceForm" property="empId"/>');">
										<span class="glyphicon glyphicon-search"></span>
										Search
									</button>
								</div>
								</div>

								<div class="col-md-6 kanan">
									<button type="button" class="btn btn-primary" onclick="javascript:flyToPage('generateReportPerEmp', '<bean:write name="attendanceForm" property="empId"/>');">
										<i class="fa fa-file"></i>
										Generate Report 
									</button>
								</div>

								<br /> <br />
	

								<!-- PANEL PERSONAL INFORMATION -->
								<div class="panel panel-info ">
									<div class="panel-heading">
										<h5 class="panel-title">
											<i class="fa fa-user"></i> Personal Information
										</h5>
									</div>
									<div class="panel-body">
										<table class="table-h5 table-nonfluid">
											<tr>
												<td class="kanan fontBold">Name :</td>
												<td>&nbsp;<bean:write name="attendanceForm"	property="attendanceBean.employeeName" /></td>
											</tr>
											<tr>
												<td class="kanan fontBold">Department :</td>
												<td>&nbsp;<bean:write name="attendanceForm" property="attendanceBean.departmentName" /></td>
											</tr>
											<tr>
												<td class="kanan fontBold">Location :</td>
												<td>&nbsp;<bean:write name="attendanceForm" property="attendanceBean.locationName" /></td>
											</tr>
											<tr>
												<td class="kanan fontBold">Total Attendance :</td>
												<td>&nbsp;<bean:write name="attendanceForm" property="totalAttendance" /></td>
											</tr>
											<tr>
												<td class="kanan fontBold">Total Late :</td>
												<td>&nbsp;<bean:write name="attendanceForm" property="totalLate" /></td>
											</tr>
											<tr>
												<td class="kanan fontBold">Total Working Time :</td>
												<td>&nbsp;<bean:write name="attendanceForm" property="totalWorkingTime" /></td>
											</tr>
										</table>
									</div>
								</div>
								<!-- END PANEL -->

								<!-- TABLE LIST -->
								<table class="table table-striped table-hover table-condensed">
									<thead>
										<tr>
											<th class="tengah"><b>Attendance Date</b></th>
											<th><b>Check-In</b></th>
											<th><b>Check-Out</b></th>
											<th class="tengah"><b>Daily Working Hour</b></th>
											<th class="tengah"><b>Status</b></th>
										</tr>
									</thead>
									<logic:iterate id="list" name="attendanceForm" property="listAttendance">
										<tr>
											<td class="tengah"><bean:write name="list" property="attendanceDate" /></td>
											<td><bean:write name="list" property="checkIn" /></td>
											<td><bean:write name="list" property="checkOut" /></td>
											<td class="tengah"><bean:write name="list" property="workingHours" /></td>
											<td class="tengah">
												<logic:equal name="list" property="status" value="Late">
													<span style="color: red;"><bean:write name="list" property="status" /></span>
												</logic:equal>
												<logic:notEqual name="list" property="status" value="Late">
													<bean:write name="list" property="status" />
												</logic:notEqual>
											</td>
										</tr>
									</logic:iterate>
								</table>
								<!-- END TABLE LIST -->
							</div>
						</div>
					</div>
				</div>
			</html:form>
		</div>
	</div>
	<%@include file="PartJavascript.jsp"%>
</body>
</html:html>