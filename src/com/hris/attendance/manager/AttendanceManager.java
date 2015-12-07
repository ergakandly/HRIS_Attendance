package com.hris.attendance.manager;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hris.attendance.ibatis.IbatisHelperAccess;
import com.hris.attendance.ibatis.IbatisHelperOracle;
import com.hris.attendance.model.AttendanceBean;
import com.hris.attendance.model.AttendanceMonthlyBean;
import com.hris.attendance.model.EmployeeImage;
import com.ibatis.sqlmap.client.SqlMapClient;

public class AttendanceManager {
	private SqlMapClient ibatis;
	private SqlMapClient ibatisAccess;

	public AttendanceManager() {
		new IbatisHelperOracle();
		ibatis = IbatisHelperOracle.getSqlMapInstance();

		new IbatisHelperAccess();
		ibatisAccess = IbatisHelperAccess.getSqlMapInstance();
	}

	public AttendanceBean getManager(String employeeId) {
		AttendanceBean bean = new AttendanceBean();

		try {
			bean = (AttendanceBean) ibatis.queryForObject("employee.getManager", employeeId);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return bean;
	}

	/**
	 * 
	 * @param searchByName
	 * @param searchByDept
	 * @param searchByLoc
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<AttendanceBean> getEmployees(String searchByName, String searchByDept, String searchByLoc) {
		List<AttendanceBean> list = null;

		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("searchByName", searchByName);
		parameter.put("searchByDept", searchByDept);
		parameter.put("searchByLoc", searchByLoc);

		try {
			list = ibatis.queryForList("employee.getEmployees", parameter);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

	/**
	 * 
	 * @param employeeId
	 * @return
	 */
	public AttendanceBean getOneEmployee(String employeeId) {
		AttendanceBean bean = null;
		try {
			bean = (AttendanceBean) ibatis.queryForObject("employee.getOneEmployee", employeeId);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return bean;
	}

	/**
	 * 
	 * @param employeeId
	 * @param period
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<AttendanceBean> getDetailAttendance(String employeeId, String period) {
		List<AttendanceBean> list = null;

		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("employeeId", employeeId);
		parameter.put("period", period);

		try {
			list = ibatis.queryForList("attendance.getDetailAttendance", parameter);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

	/**
	 * 
	 * @param employeeId
	 * @param period
	 * @return
	 */
	public Integer getTotalAttendance(String employeeId, String period) {
		Integer totalAttendance = null;

		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("employeeId", employeeId);
		parameter.put("period", period);

		try {
			totalAttendance = (Integer) ibatis.queryForObject("attendance.getTotalAttendance", parameter);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return totalAttendance;
	}

	/**
	 * 
	 * @param employeeId
	 * @param period
	 * @return
	 */
	public Integer getTotalLate(String employeeId, String period) {
		Integer totalLate = null;

		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("employeeId", employeeId);
		parameter.put("period", period);

		try {
			totalLate = (Integer) ibatis.queryForObject("attendance.getTotalLate", parameter);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				ibatis.endTransaction();
			} catch (SQLException e) {
				e.printStackTrace();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		return totalLate;
	}

	/**
	 * 
	 * @param employeeId
	 * @param period
	 * @return
	 */
	public String getTotalWorkingTime(String employeeId, String period) {
		String totalWorkingTime = null;

		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("employeeId", employeeId);
		parameter.put("period", period);

		try {
			totalWorkingTime = (String) ibatis.queryForObject("attendance.getTotalWorkingTime", parameter);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return totalWorkingTime;
	}

	/**
	 * 
	 * @param searchByDate
	 * @param searchByName
	 * @param searchByDept
	 * @param searchByLoc
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<AttendanceBean> getAllAttendanceDaily(String searchByDate, String searchByName, String searchByDept,
			String searchByLoc) {
		List<AttendanceBean> list = null;
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("searchByDate", searchByDate);
		parameter.put("searchByName", searchByName);
		parameter.put("searchByDept", searchByDept);
		parameter.put("searchByLoc", searchByLoc);

		try {
			list = ibatis.queryForList("attendance.getAllAttendanceDaily", parameter);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

	/**
	 * 
	 * @param period
	 * @param searchByName
	 * @param searchByDept
	 * @param searchByLoc
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<AttendanceMonthlyBean> getAllAttendancePeriod(String period, String searchByName, String searchByDept,
			String searchByLoc) {
		List<AttendanceMonthlyBean> list = null;
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("period", period);
		parameter.put("searchByName", searchByName);
		parameter.put("searchByDept", searchByDept);
		parameter.put("searchByLoc", searchByLoc);

		try {
			list = ibatis.queryForList("attendance.getAllAttendancePeriod", parameter);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

	/**
	 * 
	 * @param attendanceDate
	 * @param checkIn
	 * @param checkOut
	 */
	public boolean doSelfInputAttendance(String employeeId, String checkIn, String checkOut, String approver) {
		boolean flag = true;
		Map<String, String> parameter = new HashMap<String, String>();
		parameter.put("employeeId", employeeId);
		parameter.put("checkIn", checkIn);
		parameter.put("checkOut", checkOut);
		parameter.put("approver", approver);

		try {
			ibatis.startTransaction();
			ibatis.insert("attendance.doSelfInputAttendance", parameter);
			ibatis.commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
			flag = false;
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				ibatis.endTransaction();
			} catch (SQLException e) {
				e.printStackTrace();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		return flag;
	}

	/**
	 * 
	 * @return
	 */
	public Map<?, ?> getMapLastSync() {
		Map<?, ?> result = null;

		try {
			result = (Map<?, ?>) ibatis.queryForObject("sync.getLastSync", "");
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return result;
	}

	/**
	 * 
	 * @param date
	 * @param username
	 */
	@SuppressWarnings("unchecked")
	public boolean syncData(String date, String username) {
		boolean flag = true;
		List<AttendanceBean> result = null;
		String[] dateArray = date.split("/");
		date = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
		try {
			result = ibatisAccess.queryForList("accessDB.syncDB", date);
			ibatis.startTransaction();
			for (int i = 0; i < result.size(); i++) {
				Map<String, Object> parameter = new HashMap<String, Object>();
				parameter.put("employeeId", result.get(i).getEmployeeId());
				parameter.put("checkIn", result.get(i).getAttendanceDate() + " " + result.get(i).getCheckIn() + ":00");
				parameter.put("checkOut",
						result.get(i).getAttendanceDate() + " " + result.get(i).getCheckOut() + ":00");
				try {
					ibatis.insert("sync.syncInsert", parameter);
				} catch (SQLException e) {
					e.printStackTrace();
				} catch (Exception ex) {
					ex.printStackTrace();
				}
			}
			ibatis.insert("sync.syncLog", username);
			ibatis.commitTransaction();
			
		} catch (SQLException e) {
			e.printStackTrace();
			flag = false;
		} catch (Exception ex) {
			ex.printStackTrace();
			flag = false;
		} finally {
			try {
				ibatis.endTransaction();
			} catch (SQLException e) {
				e.printStackTrace();
				flag = false;
			}
		}
		return flag;
	}

	/**
	 * 
	 * @param approvedBy
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<AttendanceBean> getApproval(String approvedBy) {
		List<AttendanceBean> list = null;

		try {
			list = ibatis.queryForList("attendance.getApproval", approvedBy);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

	/**
	 * 
	 * @param approvedBy
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<AttendanceBean> getHistory(String approvedBy) {
		List<AttendanceBean> list = null;
		try {
			list = ibatis.queryForList("attendance.getHistory", approvedBy);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return list;
	}

	/**
	 * 
	 * @param attendanceId
	 * @param approvalStatus
	 */
	public void doApprove(String attendanceId, String approvalStatus) {
		Map<String, String> parameter = new HashMap<String, String>();
		parameter.put("attendanceId", attendanceId);
		parameter.put("approvalStatus", approvalStatus);
		try {
			ibatis.startTransaction();
			ibatis.update("attendance.doApprove", parameter);
			ibatis.commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				ibatis.endTransaction();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 
	 * @param employeeId
	 * @return
	 */
	public byte[] getImage(String employeeId) {
		byte[] imageByte = null;
		try {
			EmployeeImage empBean = (EmployeeImage) ibatis.queryForObject("employee.getEmployeeImage", employeeId);
			imageByte = empBean.getEmployeePhoto();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return imageByte;
	}

	/**
	 * 
	 * @param employeeId
	 * @param date
	 * @return
	 */
	public boolean checkInputAttendance(String employeeId, String date) {
		boolean flag = true;
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put("employeeId", employeeId);
		parameter.put("date", date);
		try {
			Integer count = (Integer) ibatis.queryForObject("attendance.checkInputAttendance", parameter);
			if (count > 0) {
				flag = false;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return flag;
	}

	/**
	 * 
	 * @param attendanceId
	 */
	public void readNotification(String attendanceId) {
		try {
			ibatis.startTransaction();
			ibatis.update("notification.readNotification", attendanceId);
			ibatis.commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				ibatis.endTransaction();
			} catch (SQLException e) {
				e.printStackTrace();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
	}

	/**
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	public boolean isAuthorized(String username, String password) {
		Map<String, String> user = new HashMap<String, String>();
		user.put("username", username);
		user.put("password", password);

		int result = 0;
		try {
			result = (Integer) ibatis.queryForObject("users.isAuthorized", user);
			if (result == 1)
				return true;
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return false;
	}

	/**
	 * 
	 * @param username
	 * @param status
	 */
	public void updateStatusLogin(String username, int status) {
		Map<String, String> user = new HashMap<String, String>();
		user.put("username", username);
		user.put("status", String.valueOf(status));

		try {
			ibatis.startTransaction();
			ibatis.update("users.updateStatusLogin", user);
			ibatis.commitTransaction();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				ibatis.endTransaction();
			} catch (SQLException e) {
				e.printStackTrace();
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
	}
	
	/**
	 * 
	 * @return
	 */
	public String getPortalUrl() {
		String url = null;
		try {
			url = (String) ibatis.queryForObject("users.getPortalUrl", "");
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return url;
	}

}
