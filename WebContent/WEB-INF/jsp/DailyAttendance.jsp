<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html"%>

<html:html>
<head>
<title>Daily Attendance</title>
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
				<html:hidden name="attendanceForm" property="id" />
				<html:hidden name="attendanceForm" property="empId" />
				<!-- CONTAINER -->
				<div class="container-fluid">
					<div class="row">
						<!-- ROW 12 -->
						<div class="col-md-12">

							<!--JUDUL-->
							<div class="page-header">
								<h3 id="timeline">Attendance Daily</h3>
							</div>
							<!-- END JUDUL -->

							<!-- BREADCRUMB -->
							<ul class="breadcrumb">
								<li><i class="fa fa-dashboard"></i>
								<a href="<bean:write name="attendanceForm" property="urlPortal"/><%= request.getAttribute("zx") %>">Dashboard</a>
								</li>
								<li><i class="fa fa-list"></i> Attendance Daily</li>
							</ul>
							<!-- END BREADCRUMB -->

							<div class="col-md-12">
								<!-- SEARCH -->
								<div class="form-inline">
									<div class="col-md-6">
									Check-in Date :
									<div class="input-group">
										<input class="form-control" name="searchByDate" type="text" value="<bean:write name="attendanceForm" property="searchByDate" />"
											id="cariTanggal" readonly="readonly" />
											<span
											class="input-group-addon" id="basic-addon1"
											style="height: 22px !important; padding-top: 0; padding-bottom: 0; border-bottom-right-radius: 15px;"><i
											class="fa fa-calendar"></i></span>
									</div>
									<button type="button" class="btn btn-primary"
										onclick="javascript:flyToPage('dailyAttendance');">
										<i class="fa fa-search"></i> Search
									</button>
									</div>
									
									
									
									<div class="col-md-6 kanan">
									<button type="button" class="btn btn-primary kiri" onclick="javascript:flyToPage('generateReportDaily');">
										<i class="fa fa-file"></i> Generate Report
									</button>
									</div>
								</div>
								<hr>
								<!-- END SEARCH -->

								<!-- TABLE LIST -->
								<table
									class="table table-striped table-hover table-condensed table-bordered"
									id="sort">
									<thead>
										<tr>
											<th>NIK</th>
											<th>Employee Name</th>
											<th>Department</th>
											<th>Location</th>
											<th>Checkin Time</th>
											<th>Checkout Time</th>
											<th>Working Hours</th>
											<th>Status</th>
										</tr>
									</thead>
									<logic:iterate id="list" name="attendanceForm"
										property="listAttendance">
										<tr>
											<td><bean:write name="list" property="NIK" /></td>
											<td><bean:write name="list" property="employeeName" /></td>
											<td><bean:write name="list" property="departmentName" /></td>
											<td><bean:write name="list" property="locationName" /></td>
											<td><bean:write name="list" property="checkIn" /></td>
											<td><bean:write name="list" property="checkOut" /></td>
											<td><bean:write name="list" property="workingHours" /></td>
											<td><bean:write name="list" property="status" /></td>
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
	<script>
		$(document).ready(function() {
			$('#sort').dataTable({
				"columns" : [ null, null, null, null, null, null, null, null, ]
			});
		});
	</script>
	<script>
		$(window).load(
				function() {
					var nowTemp = new Date();
					var now = new Date(nowTemp.getFullYear(), nowTemp
							.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

					// 		Datepicker1
					var cariTanggal = $('#cariTanggal')
							.datepicker(
									{
										onRender : function(date) {
											return date.valueOf() > now
													.valueOf() ? 'disabled'
													: '';
										}
									}).on(
									'changeDate',
									function(ev) {
										$('#validate-form').bootstrapValidator(
												'revalidateField',
												'searchByDate');
										cariTanggal.hide();
									}).data('datepicker');
				});
	</script>
	<link rel="stylesheet" type="text/css" href="asset/css/datepicker.css">

	<script type="text/javascript" src="asset/css/bootstrap-datepicker.js"></script>
</body>
</html:html>