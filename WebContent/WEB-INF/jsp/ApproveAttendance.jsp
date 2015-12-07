<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html"%>

<html:html>
<head>
<title>Approve Attendance</title>
<%@include file="PartBootstrap.jsp"%>

<script type="text/javascript">
	function flyToPage(task, id) {
		document.forms[0].task.value = task;
		document.forms[0].id.value = id;
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
				<html:hidden name="attendanceForm" property="id" />
				<html:hidden name="attendanceForm" property="empId" />
				<!-- CONTAINER -->
				<div class="container-fluid">
					<div class="row">

						<!-- ROW 12 -->
						<div class="col-md-12">

							<!--JUDUL-->
							<div class="page-header">
								<h3 id="timeline">Approve Attendance</h3>
							</div>
							<!-- END JUDUL -->

							<!-- BREADCRUMB -->
							<ul class="breadcrumb">
								<li><i class="fa fa-dashboard"></i> <a href="#">Dashboard</a>
								</li>
								<li><i class="fa fa-check"></i> Approve Attendance</li>
							</ul>
							<!-- END BREADCRUMB -->

							<div class="col-md-12">
								<!-- TAB -->
								<ul id="mytabs" class="nav nav-tabs" role="tablist">
									<li class="active"><a href="#pending" role="tab"
										data-toggle="tab">Pending Attendance Approval</a></li>
									<li><a href="#history" role="tab" data-toggle="tab">History Attendance
											Approval</a></li>
								</ul>
								<!-- END JUDUL TAB -->
								
								<!-- ISI TAB PENDING-->
								<div class="tab-content">

									<!-- TAB PERSONAL -->
									<div class="tab-pane active" id="pending">
										<div class="col-md-12">
											<br />
											<table class="table table-striped table-hover table-condensed table-bordered" id="sort">
												<thead>
													<tr>
														<th>Submit Date </th>
														<th>Employee Name</th>
														<th>Check In</th>
														<th>Check Out</th>		
														<th class="tengah">Action</th>
													</tr>
												<thead>
												<tbody>
													<logic:iterate id="list" name="attendanceForm" property="listAttendance">
														<tr>
															<td><bean:write name="list" property="submitDate" /></td>
															<td><bean:write name="list" property="employeeName" /></td>
															<td><bean:write name="list" property="checkIn" /></td>
															<td><bean:write name="list" property="checkOut" /></td>
															<td>
																<button type="button" class="btn btn-primary"
																	onclick="javascript:flyToPage('doApprove','<bean:write name="list" property="attendanceId"/>', '2');"
																	aria-label="Left Align">
																	<i class="fa fa-check"></i> Approve
																</button>
																<button type="button" class="btn btn-danger"
																	onclick="javascript:flyToPage('doReject','<bean:write name="list" property="attendanceId"/>', '2');"
																	aria-label="Left Align">
																	<i class="fa fa-close"></i> Reject
																</button>
															</td>
															</tr>
													</logic:iterate>
												</tbody>
											</table>
										</div>
									</div>
									<!-- END TAB PENDING -->

									<!-- ISI TAB HISTORY -->
									<div class="tab-pane" id="history">
										<div class="col-md-12">
										<br />
											<table class="table table-striped table-hover table-condensed table-bordered" id="sort">
												<thead>
													<tr>
														<th>Submit Date </th>
														<th>Employee Name</th>
														<th>Check In</th>
														<th>Check Out</th>	
														<th>Approve Date</th>	
														<th class="tengah">Status</th>				
													</tr>
												<thead>
												<tbody>
													<logic:iterate id="list" name="attendanceForm" property="listHistory">
														<tr>
															<td><bean:write name="list" property="submitDate" /></td>
															<td><bean:write name="list" property="employeeName" /></td>
															<td><bean:write name="list" property="checkIn" /></td>
															<td><bean:write name="list" property="checkOut" /></td>
															<td><bean:write name="list" property="approvalDate" /></td>																
															<td>
											                	<logic:equal name="list" property="status" value="Approved"> 
											                 		<i class="fa fa-check" style="color: green;"></i> Approved
																</logic:equal> 
											                	<logic:equal name="list" property="status" value="Rejected"> 
											                 		<i class="fa fa-close" style="color: red;"></i> Rejected
											                 	</logic:equal> 
                 											</td>               
														</tr>
													</logic:iterate>
												</tbody>
											</table>
										</div>
									</div>
									<!-- END TAB HISTORY -->
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
			$('#pending').dataTable( {
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