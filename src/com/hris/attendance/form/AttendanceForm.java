package com.hris.attendance.form;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.struts.action.ActionForm;

import com.hris.attendance.model.AttendanceBean;
import com.hris.attendance.model.AttendanceMonthlyBean;

@SuppressWarnings({ "serial", "rawtypes" })
public class AttendanceForm extends ActionForm {
	private List<AttendanceBean> listAttendance;
	private List<AttendanceBean> listHistory;
	private List<AttendanceBean> listNotification;
	private List<AttendanceMonthlyBean> listAttendanceMonthly;
	private AttendanceBean attendanceBean = new AttendanceBean();
	private Map syncData;

	private Integer currentSideBar = 1;
	private Integer totalAttendance;
	private Integer totalLate;
	private String totalWorkingTime;
	private String searchByName = "";
	private String searchByDept = "All";
	private String searchByLoc = "All";

	private String monthPeriod;
	private String yearPeriod;
	private String currentYear;
	private String searchByDate;
	private String lastSync;
	private String task = "success";
	private String id;

	private String oldPassword;
	private String newPassword;
	private String confirmPassword;
	private String act;
	private String empId;
	private String failedMessage;
	private String successMessage;
	private String parameter;
	
	public AttendanceForm() {
		Date dNow = new Date();
		SimpleDateFormat month = new SimpleDateFormat("MMMM", Locale.ENGLISH);
		SimpleDateFormat year = new SimpleDateFormat("yyyy");
		SimpleDateFormat date = new SimpleDateFormat("dd/MM/yyyy");
		this.monthPeriod = month.format(dNow);
		this.currentYear = year.format(dNow);
		this.yearPeriod = this.currentYear;
		this.searchByDate = date.format(dNow);
	}

	
	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public String getFailedMessage() {
		return failedMessage;
	}

	public void setFailedMessage(String failedMessage) {
		this.failedMessage = failedMessage;
	}

	public String getSuccessMessage() {
		return successMessage;
	}

	public void setSuccessMessage(String successMessage) {
		this.successMessage = successMessage;
	}

	public List<AttendanceBean> getListHistory() {
		return listHistory;
	}

	public void setListHistory(List<AttendanceBean> listHistory) {
		this.listHistory = listHistory;
	}

	public List<AttendanceBean> getListAttendance() {
		return listAttendance;
	}

	public void setListAttendance(List<AttendanceBean> listAttendance) {
		this.listAttendance = listAttendance;
	}

	public List<AttendanceMonthlyBean> getListAttendanceMonthly() {
		return listAttendanceMonthly;
	}

	public void setListAttendanceMonthly(List<AttendanceMonthlyBean> listAttendanceMonthly) {
		this.listAttendanceMonthly = listAttendanceMonthly;
	}

	public AttendanceBean getAttendanceBean() {
		return attendanceBean;
	}

	public void setAttendanceBean(AttendanceBean attendanceBean) {
		this.attendanceBean = attendanceBean;
	}

	public Map getSyncData() {
		return syncData;
	}

	public void setSyncData(Map syncData) {
		this.syncData = syncData;
	}

	public Integer getCurrentSideBar() {
		return currentSideBar;
	}

	public void setCurrentSideBar(Integer currentSideBar) {
		this.currentSideBar = currentSideBar;
	}

	public Integer getTotalAttendance() {
		return totalAttendance;
	}

	public void setTotalAttendance(Integer totalAttendance) {
		this.totalAttendance = totalAttendance;
	}

	public Integer getTotalLate() {
		return totalLate;
	}

	public void setTotalLate(Integer totalLate) {
		this.totalLate = totalLate;
	}

	public String getTotalWorkingTime() {
		return totalWorkingTime;
	}

	public void setTotalWorkingTime(String totalWorkingTime) {
		this.totalWorkingTime = totalWorkingTime;
	}

	public String getSearchByName() {
		return searchByName;
	}

	public void setSearchByName(String searchByName) {
		this.searchByName = searchByName;
	}

	public String getSearchByDept() {
		return searchByDept;
	}

	public void setSearchByDept(String searchByDept) {
		this.searchByDept = searchByDept;
	}

	public String getSearchByLoc() {
		return searchByLoc;
	}

	public void setSearchByLoc(String searchByLoc) {
		this.searchByLoc = searchByLoc;
	}

	public String getMonthPeriod() {
		return monthPeriod;
	}

	public void setMonthPeriod(String monthPeriod) {
		this.monthPeriod = monthPeriod;
	}

	public String getYearPeriod() {
		return yearPeriod;
	}

	public void setYearPeriod(String yearPeriod) {
		this.yearPeriod = yearPeriod;
	}

	public String getCurrentYear() {
		return currentYear;
	}

	public void setCurrentYear(String currentYear) {
		this.currentYear = currentYear;
	}

	public String getSearchByDate() {
		return searchByDate;
	}

	public void setSearchByDate(String searchByDate) {
		this.searchByDate = searchByDate;
	}

	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLastSync() {
		return lastSync;
	}

	public void setLastSync(String lastSync) {
		this.lastSync = lastSync;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getAct() {
		return act;
	}

	public void setAct(String act) {
		this.act = act;
	}

	public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}
}
