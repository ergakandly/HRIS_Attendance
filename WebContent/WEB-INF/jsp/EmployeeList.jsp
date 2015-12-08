<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean"%>

<html:html>
<head>
<title>Employee List</title>
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
			<html:form action="/attendance" method="post">
				<html:hidden name="attendanceForm" property="task" />
				<html:hidden name="attendanceForm" property="empId" />
				<!-- CONTAINER -->
				<div class="container-fluid">
					<div class="row">
						<div class="col-md-12">

							<!--JUDUL-->
							<div class="page-header">
								<h3 id="timeline">List Employee</h3>
							</div>
							<!-- END JUDUL -->

							<!-- BREADCRUMB -->
							<ul class="breadcrumb">
								<li>
									<i class="fa fa-dashboard"></i>
									<a href="<bean:write name="attendanceForm" property="urlPortal"/><%= request.getAttribute("zx") %>">Dashboard</a>
								</li>
								<li>
									<i class="fa fa-list"></i>List Employee
								</li>
							</ul>
							<!-- END BREADCRUMB -->
							<div class="col-md-10 col-md-offset-1">
								<table class="table table-striped table-hover table-condensed table-bordered" id="sort">
									<thead>
										<tr>
											<th>NIK</th>
											<th>Employee Name</th>
											<th>Department Name</th>
											<th>Location Name</th>
											<th class="tengah">Action</th>
										</tr>
									</thead>
									<tbody>
										<logic:notEmpty name="attendanceForm" property="listAttendance">
											<logic:iterate id="list" name="attendanceForm" property="listAttendance">
												<tr>
													<td><bean:write name="list" property="NIK" /></td>
													<td><bean:write name="list" property="employeeName" /></td>
													<td><bean:write name="list" property="departmentName" /></td>
													<td><bean:write name="list" property="locationName" /></td>
													<td class="tengah">
														<button type="button" class="btn btn-success" onclick="javascript:flyToPage('viewAttendancePerEmployee','<bean:write name="list" property="employeeId"/>');" aria-label="Left Align">
															<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
															View
														</button>
													</td>
												</tr>
											</logic:iterate>
										</logic:notEmpty>
									</tbody>
								</table>
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
			$('#sort').dataTable( {
				 "columns": [
				             null,
				             null,
				             null,
				             null,
				             { "orderable": false }
				            ]
			} );
		});
	</script>
</body>
</html:html>