<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html"%>

<html:html>
<head>
<title>Sync Data Attendance</title>
<%@include file="PartBootstrap.jsp"%>
<script type="text/javascript">
	function flyToPage(task, lastSync) {
		document.forms[0].task.value = task;
		document.forms[0].lastSync.value = lastSync;
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
				<html:hidden name="attendanceForm" property="lastSync" />
				<html:hidden name="attendanceForm" property="empId" />
				<!-- CONTAINER -->
				<div class="container-fluid">
					<div class="row">

						<!-- ROW 12 -->
						<div class="col-md-12">

							<!--JUDUL-->
							<div class="page-header">
								<h3 id="timeline">Sync Data Attendance</h3>
							</div>
							<!-- END JUDUL -->

							<!-- BREADCRUMB -->
							<ul class="breadcrumb">
								<li><i class="fa fa-dashboard"></i> <a
									href="<bean:write name="attendanceForm" property="urlPortal"/><%= request.getAttribute("zx") %>"> Dashboard</a></li>
								<li><i class="fa fa-random"></i> Sync Data Attendance</li>
							</ul>
							<!-- END BREADCRUMB -->

							<logic:notEmpty name="attendanceForm" property="failedMessage">
								<div class="alert alert-danger alert-dismissible" role="alert">
									<button type="button" class="close" data-dismiss="alert"
										aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<i class="fa fa-info-circle"></i> <strong><bean:write
											name="attendanceForm" property="failedMessage" /></strong>
								</div>
							</logic:notEmpty>

							<logic:notEmpty name="attendanceForm" property="successMessage">
								<div class="alert alert-info alert-dismissible" role="alert">
									<button type="button" class="close" data-dismiss="alert"
										aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
									<i class="fa fa-info-circle"></i> <strong><bean:write
											name="attendanceForm" property="successMessage" /></strong>
								</div>
							</logic:notEmpty>

							<div class="col-md-8 col-md-offset-2">
								<!-- CONTAINER -->
								<div class="container-fluid well">
									<div class="row">
										<div class="col-md-12">
											<div class="tab-content">
												<div class="tab-pane active" id="dashboard">
													<br> <br> <br>
													<div class="col-md-8 col-md-offset-2">
														<table align="center"
															class="table table-nonfluid table-hover ">
															<thead>
																<tr>
																	<th align="center" colspan="2">Sync Data
																		Attendance</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td class="kanan">Last Sync Date :</td>
																	<td><bean:write name="attendanceForm"
																			property="syncData.SYNCDATEMON" /></td>
																</tr>
																<tr>
																	<td class="kanan">Actor Sync Date :</td>
																	<td><bean:write name="attendanceForm"
																			property="syncData.SYNCACTOR" /></td>
																</tr>
																<tr>
																	<td colspan="2" class="tengah"><button
																			type="button" class="btn btn-primary"
																			data-toggle="modal" data-target="#modalYakin"
																			data-backdrop="static">
																			<i class="fa fa-random"></i> Sync
																		</button>
																	</td>
															</tbody>
															</tr>
														</table>
														<br/><br/><br/>
														<!-- MODAL -->
														<div class="modal fade" id="modalYakin" tabindex="-1"
															role="dialog" aria-labelledby="myModalLabel">
															<div class="modal-dialog" role="document">
																<div class="modal-content">
																	<div class="modal-header">
																		<button type="button" class="close"
																			data-dismiss="modal" aria-label="Close">
																			<span aria-hidden="true">&times;</span>
																		</button>
																		<h4 class="modal-title" id="myModalLabel">Are You
																			Sure?</h4>
																	</div>
																	<div class="modal-body "></div>
																	<div class="modal-footer">
																		<button type="button" class="btn btn-primary"
																			onclick="javascript:flyToPage('doSync','<bean:write name="attendanceForm" property="syncData.SYNCDATEMM"/>');">Submit</button>
																		<button type="button" class="btn btn-default"
																			data-dismiss="modal">Close</button>
																	</div>
																</div>
															</div>
														</div>
														<!-- MODAL -->
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
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