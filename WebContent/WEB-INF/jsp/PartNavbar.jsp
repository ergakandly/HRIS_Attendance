<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<script>
	function goToModal(id){
		$('#notifModalId').val(id);
		$('#notifModalName').html($('#notifMainName' + id).text());
		$('#notifModalSubmitDate').html($('#notifMainSubmitDate' + id).text());
		$('#notifModalCheckIn').html($('#notifMainCheckIn' + id).text());
		$('#notifModalCheckOut').html($('#notifMainCheckOut' + id).text());
		
		$('#modalNotif').modal({
			show : true
		});
	}
	
	function notifAction(paramApproval) {
		 $
		.getJSON(
				"/HRIS_Attendance/attendance.do",
				{
					task : "notifAction",
					act : paramApproval,
					id: $('#notifModalId').val(),
					currentPage: $('#currentPage').val()
				},
				function(data) {

					 var content = "<tr><th>Leave Date</th><th>Approval Status</th></tr>";

					$.each(data, function(index, element) {
						content += "<tr><td>" + element.leaveDate
								+ "</td><td>" + element.approvalStatus
								+ "</td></tr>";
					});

					$("#leaveDetailModal").html(content); 
					$('#modalNotif').modal({
						show : false
					});
				}); 
		location.reload(true);
	}
	
	function readNotif(task, empId){
		document.forms[0].task.value = task;
		document.forms[0].empId.value = empId;
		document.forms[0].submit();
	}
</script>
<!-- END TIME -->
</head>
<body onload="startTime()">
	<!-- NAVBAR -->
	<nav class="navbar navbar-inverse navbar-fixed-top role="navigation">
	<!-- LOGO -->
	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
			<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span>
			<span class="icon-bar"></span> <span class="icon-bar"></span>
		</button>
		<a class="navbar-brand" href="#">
			<img alt="Brand" src="asset/img/logo-hover.png">
		</a>
	</div>
	<!-- END LOGO -->

	<ul class="nav navbar-right top-nav">
		<!-- DROPDOWN USER -->
		<li class="dropdown">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown">
				<i class=" fa fa-user" id="warnaPutih"></i>
				<font color="white">Hi, <%=session.getAttribute("employeeName") %></font>
				<b class="caret" id="warnaPutih"></b>
			</a>
			<ul class="dropdown-menu">
				<li>
					<a href="" data-toggle="modal" data-target="#modalLogin">
						<i class=" fa fa-lock"></i> User Password
					</a>
				</li>
				<li class="divider"></li>
				<li><a href="javascript:flyToPage('logout');">
					<span class="glyphicon glyphicon-log-out"></span> Log Out
				</a></li>
			</ul></li>
		<!-- END DROPDOWN USER -->
	</ul>

	<!-- SIDEBAR  -->
	<div class="collapse navbar-collapse navbar-ex1-collapse">
		<ul class="nav navbar-nav side-nav">
			<!-- SIDEBAR 1 -->
			<%if(session.getAttribute("roleId").toString().equals("1") || session.getAttribute("roleId").toString().equals("2")){ %>
			<logic:equal name="attendanceForm" property="currentSideBar" value="1">
				<li class="active" style="cursor: pointer;">
					<a href="#">
						<i class="fa fa-list"></i> Employee List
					</a>
				</li>
			</logic:equal>
			<logic:notEqual name="attendanceForm" property="currentSideBar" value="1">
				<li>
					<a href="javascript:flyToPage('employeeList');">
						<i class="fa fa-list"></i> 
						Employee List
					</a>
				</li>
			</logic:notEqual>
			<%}else{%>
			<logic:equal name="attendanceForm" property="currentSideBar" value="0">
				<li class="active" style="cursor: pointer;">
					<a href="#">
						<i class="fa fa-list"></i>Show Attendance Data
					</a>
				</li>
			</logic:equal>
			<logic:notEqual name="attendanceForm" property="currentSideBar" value="0">
				<li>
					<a href="javascript:flyToPage('viewAttendancePerEmployee', '<%=session.getAttribute("employeeId").toString()%>');">
						<i class="fa fa-list"></i> 
						Show Attendance Data
					</a>
				</li>
			</logic:notEqual>
			<% }%>
			
			<!-- SIDEBAR 2 -->
			<%if(session.getAttribute("roleId").toString().equals("1") || session.getAttribute("roleId").toString().equals("2")){ %>
			<logic:equal name="attendanceForm" property="currentSideBar" value="2">
				<li class="active" style="cursor: pointer;">
					<a href="#">
						<i class="fa fa-calendar-o"></i>
						Daily Attendance
					</a>
				</li>
			</logic:equal>
			<logic:notEqual name="attendanceForm" property="currentSideBar" value="2">
				<li>
					<a href="javascript:flyToPage('dailyAttendance');">
						<i class="fa fa-calendar-o"></i>
						Daily Attendance
					</a>
				</li>
			</logic:notEqual>
			
			<!-- SIDEBAR 3 -->
			<logic:equal name="attendanceForm" property="currentSideBar" value="3">
				<li class="active">
					<a href="#">
						<i class="fa fa-calendar-plus-o"></i>
						Period Attendance 
					</a>
				</li>
			</logic:equal>
			
			<logic:notEqual name="attendanceForm" property="currentSideBar" value="3">
				<li>
					<a href="javascript:flyToPage('periodAttendance');">
						<i class="fa fa-calendar"></i>
						Period Attendance
					</a>
				</li>
			</logic:notEqual>
			<%}%>
			
			<!-- SIDEBAR 4 -->
			<logic:equal name="attendanceForm" property="currentSideBar" value="4">
				<li class="active">
					<a href="#">
						<i class="fa fa-calendar-plus-o"></i>
						Self Input Attendance
					</a>
				</li>
			</logic:equal>
			<logic:notEqual name="attendanceForm" property="currentSideBar"	value="4">
				<li>
					<a href="javascript:flyToPage('selfInputAttendance');">
						<i class="fa fa-calendar-plus-o"></i>
						Self Input Attendance
					</a>
				</li>
			</logic:notEqual>
				
			<!-- SIDEBAR 5 -->
			<logic:equal name="attendanceForm" property="currentSideBar" value="5">
				<li class="active">
					<a href="#">
						<i class="fa fa-check"></i>
						Approve Attendance
					</a>
				</li>
			</logic:equal>
			
			<logic:notEqual name="attendanceForm" property="currentSideBar" value="5">
				<li>
					<a href="javascript:flyToPage('approveAttendance')">
						<i class="fa fa-check"></i>
						Approve Attendance
					</a>
				</li>
			</logic:notEqual>
			
			<!-- SIDEBAR 6 -->
			<%if(session.getAttribute("roleId").toString().equals("1") || session.getAttribute("roleId").toString().equals("2")){ %>
			<logic:equal name="attendanceForm" property="currentSideBar" value="6">
				<li class="active">
					<a href="#">
						<i class="fa fa-random"></i>
						Sync Data Attendance
					</a>
				</li>
			</logic:equal>
			<logic:notEqual name="attendanceForm" property="currentSideBar" value="6">
				<li>
					<a href="javascript:flyToPage('syncDataAttendance')">
						<i class="fa fa-random"></i>
						Sync Data Attendance
					</a>
				</li>
			</logic:notEqual>
			<%}%>
		</ul>
	</div>
	<!-- END SIDEBAR --> </nav>

	</nav>
	<!-- END NAVBAR -->

	<!-- MODAL CHANGE PASSWORD-->
	<div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">User Profile</h4>
				</div>
				<div class="modal-body ">

					<!-- PANEL PASSWORD-->
					<div class="panel panel-info ">
						<div class="panel-heading">
							<h5 class="panel-title">
								<span class="glyphicon glyphicon-lock"></span>
								Change Password
							</h5>
						</div>
						<div class="panel-body">
							<table align="center" class="table table-nonfluid table-hover ">
								<tr>
									<td class="kanan fontBold">Old Password:</td>
									<td>
										<html:password name="attendanceForm" styleClass="form-control" property="oldPassword" />
									</td>
								</tr>
								<tr>
									<td class="kanan fontBold">New Password :</td>
									<td>
										<html:password name="attendanceForm" styleClass="form-control" property="newPassword" />
									</td>
								</tr>
								<tr>
									<td class="kanan fontBold">Retype New Password :</td>
									<td>
										<html:password name="attendanceForm" styleClass="form-control" property="confirmPassword" />
									</td>
								</tr>
							</table>
						</div>
					</div>
					<!-- PANEL -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary">
						<i class="fa fa-check"></i> Save Changes
					</button>
					<button type="button" class="btn btn-danger" data-dismiss="modal">
						<i class="fa fa-close"></i> Close
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- END MODAL CHANGE PASSWORD-->
</body>
</html>