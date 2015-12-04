package com.hris.attendance.model;

import java.io.Serializable;

@SuppressWarnings("serial")
public class EmployeeImage implements Serializable {
	private byte[] employeePhoto;

	public byte[] getEmployeePhoto() {
		return employeePhoto;
	}

	public void setEmployeePhoto(byte[] employeePhoto) {
		this.employeePhoto = employeePhoto;
	}

}
