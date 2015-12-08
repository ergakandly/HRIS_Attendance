<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html"%>

<html:html>
<head>
<title>List</title>
<%@include file="PartBootstrap.jsp"%>
<link rel="stylesheet" type="text/css" href="asset/css/dataTable.min.css">
<script type="text/javascript" src="https://cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.10/js/dataTables.bootstrap.min.js"></script>
<script type="text/javascript">
	function flyToPage(task) {
		document.forms[0].task.value = task;
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
				<bean:define id="currentYear" name="attendanceForm" property="currentYear" />
			<!-- CONTAINER -->
				<div class="container-fluid">
					<div class="row">

						<!-- ROW 12 -->
						<div class="col-md-12">

							<!--JUDUL-->
							<div class="page-header">
								<h3 id="timeline">Attendance Period</h3>
							</div>
							<!-- END JUDUL -->

							<!-- BREADCRUMB -->
							<ul class="breadcrumb">
								<li><i class="fa fa-dashboard"></i> <a
									href="<bean:write name="attendanceForm" property="urlPortal"/><%= request.getAttribute("zx") %>"> Dashboard</a></li>
								<li><i class="fa fa-calendar"></i> Attendance Period</li>
							</ul>
							<!-- END BREADCRUMB -->

							
							<div class="form-inline">
								<div class="col-md-6 kiri">
								Period :
								<html:select name="attendanceForm" property="monthPeriod" styleClass="form-control">
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

								<html:select name="attendanceForm" property="yearPeriod" styleClass="form-control">
									<%
										for (int year = Integer.parseInt(currentYear.toString()); year >= 2010; year--) {
									%>
									<html:option value="<%=Integer.toString(year)%>"><%=year%></html:option>
									<%
										}
									%>
								</html:select>

								<button type="button" class="btn btn-primary"
									onclick="javascript:flyToPage('periodAttendance');">
									<i class="fa fa-search"></i> Search
								</button>
								</div>
								<div class="col-md-6 kanan">
								<button type="button" class="btn btn-primary kanan" onclick="javascript:flyToPage('generateReportPeriod');">
									<i class="fa fa-file"></i> Generate Report
								</button> <br/><br/>
								</div>
							</div>
							<hr>
							<!-- END SEARCH -->

							<table class="table table-striped table-hover table-condensed table-bordered" id="sort">
								<thead>
									<tr>
										<th>NIK</th>
										<th>Employee Name</th>
										<th>Department</th>
										<th>Location</th>
										<th>Check-in Count</th>
										<th>Late Count</th>
										<th>Working Hours</th>
									</tr>
								</thead>
								<tbody>
								<logic:iterate id="list" name="attendanceForm"
									property="listAttendanceMonthly">
									<tr>
										<td><bean:write name="list" property="NIK" /></td>
										<td><bean:write name="list" property="employeeName" /></td>
										<td><bean:write name="list" property="departmentName" /></td>
										<td><bean:write name="list" property="locationName" /></td>
										<td><bean:write name="list" property="totalAttendance" /> day(s)</td>
										<td><bean:write name="list" property="totalLate" /> day(s)</td>
										<td><bean:write name="list" property="totalWorkingTime" /></td>
									</tr>
								</logic:iterate>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				
			</html:form>
		</div>
	</div>
	<%@include file="PartJavascript.jsp"%>
	<script>
		$(document).ready(function() {
			$('#sort').DataTable();
		});
	</script>
</body>
</html:html>