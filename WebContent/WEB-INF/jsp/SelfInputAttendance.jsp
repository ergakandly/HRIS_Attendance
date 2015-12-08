<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html"%>
<html:html>
<head>
<title>Self Input Attendance</title>
<%@include file="PartBootstrap.jsp"%>
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
			<html:form action="/attendance" styleId="validate-form"
				styleClass="validate-form" onsubmit="javascript:checkInput();">
				<html:hidden name="attendanceForm" property="task" value="insert" />
				<html:hidden name="attendanceForm" property="empId" />
				<!-- CONTAINER -->
				<div class="container-fluid">
					<div class="row">

						<!-- ROW 12 -->
						<div class="col-md-12">

							<!--JUDUL-->
							<div class="page-header">
								<h3 id="timeline">Self Input Attendance</h3>
							</div>
							<!-- END JUDUL -->

							<!-- BREADCRUMB -->
							<ul class="breadcrumb">
								<li><i class="fa fa-dashboard"></i> <a
									href="<bean:write name="attendanceForm" property="urlPortal"/><%= request.getAttribute("zx") %>"> Dashboard</a></li>
								<li><i class="fa fa-calendar-plus-o"></i> Self Input
									Attendance</li>
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
								<div class="container-fluid well">
									<div class="row">
										<div class="col-md-12">
											<div class="tab-content">
												<div class="tab-pane active" id="dashboard">
													<br /> <br /> <br />

													<table align="center"
														class="table table-nonfluid table-hover ">
														<thead>
															<tr>
																<th align="center" colspan="2">Add New Attendance</th>
															</tr>
														</thead>

														<tr>
															<td class="kanan" width="40%">Check-in Date :</td>
															<td>																	<div class="form-group">
															
																<div class="input-group" id="datetimepicker1">
																		<input id="checkIn" type='text'
																			name="attendanceBean.checkIn" class="form-control" id="dpd1"/>
																	<span class="input-group-addon" id="datetimepicker1"
																		style="height: 22px !important; padding-top: 0; padding-bottom: 0; border-bottom-right-radius: 0px; border-bottom-right-radius: 15px;"><i
																		class="fa fa-calendar"></i></span>
																</div>																	</div>
																
															</td>
														</tr>

														<tr>
															<td class="kanan">Check-out Date :</td>
															<td>
																	<div class="form-group">
																<div class='input-group date' id='datetimepicker2'>
																		<input id="checkOut" type='text'
																			name="attendanceBean.checkOut" class="form-control"
																			onchange="javascript:doValidate();" />
																	
																	<span class="input-group-addon" id="basic-addon1"
																		style="height: 22px !important; padding-top: 0; padding-bottom: 0; border-bottom-right-radius: 15px;"><i
																		class="fa fa-calendar"></i></span>
																</div></div>
															</td>
														</tr>

														<logic:notEqual name="attendanceForm"
															property="attendanceBean.managerId" value="">
															<tr>
																<td class="kanan">Approver :</td>
																<td><html:hidden name="attendanceForm"
																		property="attendanceBean.managerId" /> <bean:write
																		name="attendanceForm"
																		property="attendanceBean.managerName" /></td>
															</tr>
														</logic:notEqual>
														<tr>
															<td colspan="2" class="tengah">
																<button type="button" class="btn btn-primary"
																	data-toggle="modal" data-target="#modalYakin"
																	data-backdrop="static">
																	<i class="fa fa-check"></i> Submit
																</button>
															</td>
														</tr>
													</table>

													<div class="tengah"></div>
													<br /> <br /> <br />

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
																	<h4 class="modal-title" id="myModalLabel">Insert
																		Attendance Data</h4>
																</div>
																<div class="modal-body ">
																	<div class="alert alert-info kiri" role="alert">
																		<i class="fa fa-info-circle"></i> Are you sure?
																	</div>
																</div>
																<div class="modal-footer">
																	<button type="submit" class="btn btn-primary">
																		<i class="fa fa-check "></i> Yes
																	</button>
																	<button type="button" class="btn btn-danger"
																		data-dismiss="modal">
																		<i class="fa fa-close "></i> No
																	</button>
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
			</html:form>
		</div>
	</div>
	<%@include file="PartJavascript.jsp"%>
	<script type="text/javascript">
		$('#dpd1').click(function() {
			$(document).ready(function() {
				$("#datetimepicker1").datepicker().focus();
			});
		});

		var checkIn = null;
		var checkOut = null;

		function doValidate() {
			$('#validate-form').bootstrapValidator('revalidateField',
					'attendanceBean.checkIn');
			$('#validate-form').bootstrapValidator('revalidateField',
					'attendanceBean.checkOut');
		}

		var today = new Date().getTime();

		checkIn = $(function() {
			$('#datetimepicker1').datetimepicker({
				maxDate : today,
				useCurrent : false,
			}).on(
					'dp.change',
					function(ev) {

						$('#validate-form').bootstrapValidator(
								'revalidateField', 'attendanceBean.checkIn');
					})

			locale: 'en-gb'
		});

		checkOut = $(function() {
			$('#datetimepicker2').datetimepicker({
				maxDate : today,
				useCurrent : false
			}).on(
					'dp.change',
					function(ev) {

						$('#validate-form').bootstrapValidator(
								'revalidateField', 'attendanceBean.checkOut');
					});
			locale: 'en-gb'
		});

		function checkInput() {
			start = $('#datetimepicker1 input').val();
			temp = start.split("/");
			timeStart = temp[1] + "/" + temp[0] + "/" + temp[2];

			end = $('#datetimepicker2 input').val();
			temp = end.split("/");
			timeEnd = temp[1] + "/" + temp[0] + "/" + temp[2];

			if (new Date(timeStart).getTime() > new Date(timeEnd).getTime()) {
				alert('Check-in time must be lower than Check-out time');
				return false;
			} else if (new Date(timeEnd).getTime()
					- new Date(timeStart).getTime() > 86399999) {
				alert('Attendance Time must be lower than 24 hours');
				return false;
			}

			$('#modalYakin').modal('toggle');
		}

		 $('#validate-form')
				.bootstrapValidator(
						{
							//      live: 'disabled',
							excluded : 'disabled',
							message : 'This value is not valid',
							feedbackIcons : {
								valid : 'glyphicon glyphicon-ok',
								invalid : 'glyphicon glyphicon-remove',
								validating : 'glyphicon glyphicon-refresh'
							},
							fields : {
								'attendanceBean.checkIn' : {
									validators : {
										notEmpty : {
											message : 'Check-in Date is required and cannot be empty'
										},
										callback : {

											callback : function(value,
													validator, $field) {
												start = $(
														'#datetimepicker1 input')
														.val();
												temp = start.split("/");
												timeStart = temp[1] + "/"
														+ temp[0] + "/"
														+ temp[2];

												end = $(
														'#datetimepicker2 input')
														.val();
												temp = end.split("/");
												timeEnd = temp[1] + "/"
														+ temp[0] + "/"
														+ temp[2];

												if (new Date(timeStart)
														.getTime() > new Date(
														timeEnd).getTime()) {
													return {
														valid : false,
														message : 'Check-out Date must be after Check-in Date'
													};
												} else if (new Date(timeEnd)
														.getTime()
														- new Date(timeStart)
																.getTime() > 86400000) {
													return {
														valid : false,
														message : 'Attendance time must must be lower than 	24 hours'
													};
												} else
													return true;
											}
										}

									}
								},
								'attendanceBean.checkOut' : {
									validators : {
										notEmpty : {
											message : 'Check-out Date is required and cannot be empty'
										},
										callback : {

											callback : function(value,
													validator, $field) {
												start = $(
														'#datetimepicker1 input')
														.val();
												temp = start.split("/");
												timeStart = temp[1] + "/"
														+ temp[0] + "/"
														+ temp[2];

												end = $(
														'#datetimepicker2 input')
														.val();
												temp = end.split("/");
												timeEnd = temp[1] + "/"
														+ temp[0] + "/"
														+ temp[2];

												if (new Date(timeStart)
														.getTime() > new Date(
														timeEnd).getTime()) {
													return {
														valid : false,
														message : 'Check-out Date must be after Check-in Date'
													};
												} else if (new Date(timeEnd)
														.getTime()
														- new Date(timeStart)
																.getTime() > 86399999) {
													return {
														valid : false,
														message : 'Attendance time must must be lower than 24 hours'
													};
												} else
													return true;
											}
										}
									}
								}
							}
						}); 
	</script>
</body>
</html:html>