package com.hris.attendance.handler;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.hris.attendance.form.AttendanceForm;
import com.hris.attendance.manager.AttendanceManager;
import com.hris.attendance.util.AttendanceUtil;

public class AttendanceAction extends Action {

	private String parameter;

	@Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		AttendanceForm aForm = (AttendanceForm) form;
		AttendanceManager aManager = new AttendanceManager();	
		
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		DateFormat dateTimeFormat = new SimpleDateFormat("dd/MM/yyyy hh:mm");
		Date date = new Date();
		
//		HttpSession session = request.getSession(false);
//		String param = null;
//		//check session jika ada parameter yang diterima
//		if (null!=request.getParameter("zx") && AttendanceUtil.isBase64(request.getParameter("zx").replace(' ', '+'))) {
//			//parameter diterima
//			System.out.println("ATTENDANCE Check session dari parameter.");
//			param = request.getParameter("zx").replace(' ', '+');
//			String user[] = AttendanceUtil.decrypt(param).split("##");
//			
//			// cek apakah memang data memiliki hak akses
//			if (aManager.isAuthorized(user[0], user[1])) {
//				//parameter yang akan dikirim
//				System.out.println("ATTENDANCE param dikirim: "+ param);
//				request.setAttribute("zx", param);
//				parameter = param;
//				
//				System.out.println("ATTENDANCE Set session "+user[0]+".");
//				session.setAttribute("username", user[0]);
//				session.setAttribute("password", user[1]);
//				session.setAttribute("roleId", user[2]);
//				session.setAttribute("userId", user[3]);
//				session.setAttribute("employeeId", user[4]);
//				session.setAttribute("employeeName", user[5]);
//			}
//			else {
//				// hancurkan session karena username dan password tidak pernah ada
//				System.out.println("ATTENDANCE "+session.getAttribute("username")+" tidak terautorisasi. Session dihancurkan.");
//				if (null != session)
//					session.invalidate();
//			}	
//		}
//		aForm.setParameter(parameter);
		
		////////TES DOANG////////////////
		HttpSession session = request.getSession();
		session.setAttribute("username", "donny.setiawan");
		session.setAttribute("password", "donny");
		session.setAttribute("roleId", "2");
		session.setAttribute("userId", "1");
		session.setAttribute("employeeId", "1");
		session.setAttribute("employeeName", "Donny Setiawan");
		/////////////////////////////////
		
		if (!"employeeList".equalsIgnoreCase(aForm.getTask())) {
			if ("notifAction".equalsIgnoreCase(aForm.getTask())) {
				
				if ("approve".equalsIgnoreCase(aForm.getAct()))
					aManager.doApprove(aForm.getId(), "2");
				else if ("reject".equalsIgnoreCase(aForm.getAct()))
					aManager.doApprove(aForm.getId(), "3");

				aForm.setCurrentSideBar(aForm.getCurrentSideBar());
				return null;
				
			}else if ("readNotif".equalsIgnoreCase(aForm.getTask())) {
				aManager.readNotification(aForm.getEmpId());			
				
			}else if ("viewAttendancePerEmployee".equalsIgnoreCase(aForm.getTask()) && ((session.getAttribute("roleId").toString().equals("1") || session.getAttribute("roleId").toString().equals("2")))) {
				String period = aForm.getMonthPeriod() + " " + aForm.getYearPeriod();

				aForm.setListAttendance(aManager.getDetailAttendance(aForm.getEmpId(), period));
				aForm.setAttendanceBean(aManager.getOneEmployee(aForm.getEmpId()));
				aForm.setTotalAttendance(aManager.getTotalAttendance(aForm.getEmpId(), period));
				aForm.setTotalLate(aManager.getTotalLate(aForm.getEmpId(), period));
				aForm.setTotalWorkingTime(aManager.getTotalWorkingTime(aForm.getEmpId(), period));

				aForm.setCurrentSideBar(0);
				return mapping.findForward("viewAttendancePerEmployee");
				
			} else if ("dailyAttendance".equalsIgnoreCase(aForm.getTask())) {
				aForm.setListAttendance(aManager.getAllAttendanceDaily(aForm.getSearchByDate(), aForm.getSearchByName(),
						aForm.getSearchByDept(), aForm.getSearchByLoc()));
				aForm.setSearchByDate(aForm.getSearchByDate());
				aForm.setCurrentSideBar(2);
				return mapping.findForward("dailyAttendance");
				
			} else if ("periodAttendance".equalsIgnoreCase(aForm.getTask())) {
				String period = aForm.getMonthPeriod() + " " + aForm.getYearPeriod();

				aForm.setListAttendanceMonthly(aManager.getAllAttendancePeriod(period, aForm.getSearchByName(),
						aForm.getSearchByDept(), aForm.getSearchByLoc()));

				aForm.setCurrentSideBar(3);
				return mapping.findForward("periodAttendance");
				
			} else if ("selfInputAttendance".equalsIgnoreCase(aForm.getTask())) {
				aForm.setAttendanceBean(aManager.getManager(session.getAttribute("employeeId").toString()));
				
				aForm.setCurrentSideBar(4);
				return mapping.findForward("selfInputAttendance");
				
			} else if ("insert".equalsIgnoreCase(aForm.getTask())) {
				if (aManager.checkInputAttendance(session.getAttribute("employeeId").toString(), aForm.getAttendanceBean().getCheckIn()) == false) 
					aForm.setFailedMessage("SERVER: Failed to input, attendance with the same day has been exist !");
				else if(dateTimeFormat.parse(aForm.getAttendanceBean().getCheckOut()).before(dateTimeFormat.parse(aForm.getAttendanceBean().getCheckIn())))
					aForm.setFailedMessage("SERVER: Check-out Date must be after Check-in Date");
				else if(dateTimeFormat.parse(aForm.getAttendanceBean().getCheckOut()).getTime() - dateTimeFormat.parse(aForm.getAttendanceBean().getCheckIn()).getTime() >= 24*3600*1000 )
					aForm.setFailedMessage("SERVER: Attendance time must must be lower than 24 hours");
				else if(dateTimeFormat.parse(aForm.getAttendanceBean().getCheckOut()).after(date))
					aForm.setFailedMessage("SERVER: Check-out time cannot be greater than current time");
				else{
					if(aManager.doSelfInputAttendance(session.getAttribute("employeeId").toString(), aForm.getAttendanceBean().getCheckIn() + ":00",
							aForm.getAttendanceBean().getCheckOut() + ":00", aManager.getManager(session.getAttribute("employeeId").toString()).getManagerId().toString() ))
						aForm.setSuccessMessage("Attendance successfully submitted !");
					else 
						aForm.setFailedMessage("Invalid input !");	
					
				}
				aForm.setAttendanceBean(aManager.getManager(session.getAttribute("employeeId").toString()));
				
				aForm.setCurrentSideBar(4);
				return mapping.findForward("selfInputAttendance");
			} else if ("syncDataAttendance".equalsIgnoreCase(aForm.getTask())) {
				aForm.setSyncData(aManager.getMapLastSync());
				
				aForm.setCurrentSideBar(6);
				return mapping.findForward("syncDataAttendance");
				
			} else if ("doSync".equalsIgnoreCase(aForm.getTask())) {
				if (!aForm.getLastSync().equalsIgnoreCase(dateFormat.format(date))){
					if(aManager.syncData(aForm.getLastSync(), session.getAttribute("employeeName").toString()))
						aForm.setSuccessMessage("Succesfully Sync Attendance Data");
					else 
						aForm.setFailedMessage("Failed to Sync");
				}
				else {
					aForm.setFailedMessage("Attendance data is up to date");
				}
					
				aForm.setSyncData(aManager.getMapLastSync());

				aForm.setCurrentSideBar(6);
				return mapping.findForward("syncDataAttendance");
				
			} else if ("doApprove".equalsIgnoreCase(aForm.getTask()) || "doReject".equalsIgnoreCase(aForm.getTask())
					|| "approveAttendance".equalsIgnoreCase(aForm.getTask())) {
				
				if ("doApprove".equalsIgnoreCase(aForm.getTask())) 
					aManager.doApprove(aForm.getId(), "2");
				else if ("doReject".equalsIgnoreCase(aForm.getTask())) 
					aManager.doApprove(aForm.getId(), "3");
					
				aForm.setListAttendance(aManager.getApproval(session.getAttribute("employeeId").toString()));
				aForm.setListHistory(aManager.getHistory(session.getAttribute("employeeId").toString()));

				aForm.setCurrentSideBar(5);
				return mapping.findForward("approveAttendance");
				
			} else if ("generateReportPerEmp".equalsIgnoreCase(aForm.getTask())) {
				request.setAttribute("period", aForm.getMonthPeriod() + " " + aForm.getYearPeriod());
				request.setAttribute("empId", aForm.getEmpId());
				return mapping.findForward("generateReportPerEmp");
				
			} else if ("generateReportDaily".equalsIgnoreCase(aForm.getTask())) {
				request.setAttribute("date", aForm.getSearchByDate());
				return mapping.findForward("generateReportDaily");
				
			} else if ("generateReportPeriod".equalsIgnoreCase(aForm.getTask())) {
				request.setAttribute("period", aForm.getMonthPeriod() + " " + aForm.getYearPeriod());
				return mapping.findForward("generateReportPeriod");
				
			} else if ("logout".equalsIgnoreCase(aForm.getTask())) {
				session = request.getSession(false);
				aManager.updateStatusLogin(session.getAttribute("username").toString(), 0);
				if(session != null)
		    		session.invalidate();
			}
		}
		
		if(!session.getAttribute("roleId").toString().equals("1") && !session.getAttribute("roleId").toString().equals("2")){
			String period = aForm.getMonthPeriod() + " " + aForm.getYearPeriod();

			aForm.setListAttendance(aManager.getDetailAttendance(session.getAttribute("employeeId").toString(), period));
			aForm.setAttendanceBean(aManager.getOneEmployee(session.getAttribute("employeeId").toString()));
			aForm.setTotalAttendance(aManager.getTotalAttendance(session.getAttribute("employeeId").toString(), period));
			aForm.setTotalLate(aManager.getTotalLate(session.getAttribute("employeeId").toString(), period));
			aForm.setTotalWorkingTime(aManager.getTotalWorkingTime(session.getAttribute("employeeId").toString(), period));

			aForm.setCurrentSideBar(0);
			return mapping.findForward("viewAttendancePerEmployee");
		}
		
		aForm.setListAttendance(
				aManager.getEmployees(aForm.getSearchByName(), aForm.getSearchByDept(), aForm.getSearchByLoc()));
		aForm.setCurrentSideBar(1);
		return mapping.findForward("employeeList");
	}
}