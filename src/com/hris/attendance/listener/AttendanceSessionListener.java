package com.hris.attendance.listener;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import com.hris.attendance.manager.AttendanceManager;

/**
 * Application Lifecycle Listener implementation class AttendanceSessionListener
 *
 */
public class AttendanceSessionListener implements HttpSessionListener {

	private static int totalActiveSession = 0;

	/**
     * @see HttpSessionListener#sessionCreated(HttpSessionEvent)
     */
    public void sessionCreated(HttpSessionEvent event)  { 
    	System.out.println("===============================");
    	System.out.println("sessionCreated - ATTENDANCE");
    	totalActiveSession++;
    	System.out.println("ATTENDANCE - active session: " + totalActiveSession);
    }

	/**
     * @see HttpSessionListener#sessionDestroyed(HttpSessionEvent)
     */
    public void sessionDestroyed(HttpSessionEvent event)  { 
    	HttpSession session = event.getSession();
    	
    	System.out.println("===============================");
    	System.out.println("sessionDestroyed - ATTENDANCE | "+session.getAttribute("username"));
    	if (totalActiveSession > 0)
    		totalActiveSession--;
    	System.out.println("ATTENDANCE - active session: " + totalActiveSession);
    	
    	
    	AttendanceManager aManager = new AttendanceManager();
    	aManager.updateStatusLogin(session.getAttribute("username").toString(), 0);
    }
	
}
