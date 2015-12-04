package com.hris.attendance.model;

public class AttendanceMonthlyBean {
	private String NIK;
	private String employeeName;
	private String departmentName;
	private String locationName;
	private Integer totalAttendance;
	private Integer totalLate;
	private String totalWorkingTime;

	public String getNIK() {
		return NIK;
	}

	public void setNIK(String nIK) {
		NIK = nIK;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
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

}