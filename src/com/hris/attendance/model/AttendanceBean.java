package com.hris.attendance.model;

import java.io.Serializable;

@SuppressWarnings("serial")
public class AttendanceBean implements Serializable {
	private String attendanceId;
	private String submitDate;
	private Integer employeeId;
	private String NIK;
	private String employeeName;
	private String departmentName;
	private String locationName;
	private String attendanceDate;
	// private String checkInDate;
	private String checkIn;
	// private String checkOutDate;
	private String checkOut;
	private String workingHours;
	private String status;
	private Integer managerId;
	private String managerName;
	private Integer imageLength;
	private String approvalDate;
	private String approvalStatus;
	private String readStatus;

	public String getAttendanceId() {
		return attendanceId;
	}

	public void setAttendanceId(String attendanceId) {
		this.attendanceId = attendanceId;
	}

	public String getSubmitDate() {
		return submitDate;
	}

	public void setSubmitDate(String submitDate) {
		this.submitDate = submitDate;
	}

	public Integer getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}

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

	public String getAttendanceDate() {
		return attendanceDate;
	}

	public void setAttendanceDate(String attendanceDate) {
		this.attendanceDate = attendanceDate;
	}

	// public String getCheckInDate() {
	// return checkInDate;
	// }

	// public void setCheckInDate(String checkInDate) {
	// this.checkInDate = checkInDate;
	// }

	public String getCheckIn() {
		return checkIn;
	}

	public void setCheckIn(String checkIn) {
		this.checkIn = checkIn;
	}

	// public String getCheckOutDate() {
	// return checkOutDate;
	// }

	// public void setCheckOutDate(String checkOutDate) {
	// this.checkOutDate = checkOutDate;
	// }

	public String getCheckOut() {
		return checkOut;
	}

	public void setCheckOut(String checkOut) {
		this.checkOut = checkOut;
	}

	public String getWorkingHours() {
		return workingHours;
	}

	public void setWorkingHours(String workingHours) {
		this.workingHours = workingHours;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getManagerId() {
		return managerId;
	}

	public void setManagerId(Integer managerId) {
		this.managerId = managerId;
	}

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	public Integer getImageLength() {
		return imageLength;
	}

	public void setImageLength(Integer imageLength) {
		this.imageLength = imageLength;
	}

	public String getApprovalDate() {
		return approvalDate;
	}

	public void setApprovalDate(String approvalDate) {
		this.approvalDate = approvalDate;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public String getReadStatus() {
		return readStatus;
	}

	public void setReadStatus(String readStatus) {
		this.readStatus = readStatus;
	}

}
