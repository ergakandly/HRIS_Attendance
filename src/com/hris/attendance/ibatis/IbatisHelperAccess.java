package com.hris.attendance.ibatis;

import com.ibatis.sqlmap.client.SqlMapClient;
import java.io.Reader;
import com.ibatis.common.resources.Resources;
import com.ibatis.sqlmap.client.SqlMapClientBuilder;

public class IbatisHelperAccess {
	private static final SqlMapClient sqlMap;

	static {
		try {
			String resource = "SqlMapConfigAccess.xml";
			Reader reader = Resources.getResourceAsReader(resource);
			sqlMap = SqlMapClientBuilder.buildSqlMapClient(reader);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Error initializing IbatisHelperACCESS class. Cause : " + e);
		}
	}

	public static SqlMapClient getSqlMapInstance() {
		return sqlMap;
	}
}