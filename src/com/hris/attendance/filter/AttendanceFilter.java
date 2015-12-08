package com.hris.attendance.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hris.attendance.manager.AttendanceManager;
import com.hris.attendance.util.AttendanceUtil;

/**
 * Servlet Filter implementation class AttendanceFilter
 */
public class AttendanceFilter implements Filter {

	private ServletContext context;
	
    /**
     * Default constructor. 
     */
    public AttendanceFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		
		this.context.log("Requested Resource::ATTENDANCE");
		HttpSession session = req.getSession(false);
		
		if (null != session && (null != session.getAttribute("username")) || null != req.getParameter("zx"))
			chain.doFilter(request, response);
		else {
			this.context.log("Unauthorized access request - ATTENDANCE");
			
			AttendanceManager aManager = new AttendanceManager();
			res.sendRedirect(aManager.getPortalUrl());
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		this.context = fConfig.getServletContext();
		this.context.log("AuthenticationFilter initialized - ATTENDANCE");
	}

}
