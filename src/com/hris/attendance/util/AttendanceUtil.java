package com.hris.attendance.util;

import java.security.Key;
import java.security.MessageDigest;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpSession;

public class AttendanceUtil {
	private static String key = "hrIS0987HRis4321";
	
	public static void setKey(String key) {
		AttendanceUtil.key = key;
	}
	
	public static String getHash(String pass) throws Exception {
		MessageDigest mDigest = MessageDigest.getInstance("SHA1");
		
		byte[] result = mDigest.digest(pass.getBytes());
        StringBuffer shaResult = new StringBuffer();
        
        for (int i = 0; i < result.length; i++) {
        	shaResult.append(Integer.toString((result[i] & 0xff) + 0x100, 16).substring(1));
        }
        
        return shaResult.toString().toUpperCase();
	}
	
	public static String encrypt(String plainText) {
		String encryptedText = null;
		
		try {
			Key aesKey = new SecretKeySpec(key.getBytes(), "AES");
			Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.ENCRYPT_MODE, aesKey);
			
			byte[] encryptedByte = cipher.doFinal(plainText.getBytes());
			Base64.Encoder encoder = Base64.getEncoder();
			encryptedText = encoder.encodeToString(encryptedByte);
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return encryptedText;
	}

	public static String decrypt(String encryptedText) {
		String decryptedText = null;
		
		try {
			Key aesKey = new SecretKeySpec(key.getBytes(), "AES");
			Cipher cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.DECRYPT_MODE, aesKey);
			
			Base64.Decoder decoder = Base64.getDecoder();
			byte[] decryptedByte = cipher.doFinal(decoder.decode(encryptedText));
			decryptedText = new String(decryptedByte);
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return decryptedText;
	}
	
	public static boolean isBase64(String param) {
		if (param.matches("^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$"))
			return true;
		return false;
	}

	public static String createParameter(HttpSession session) {
		String parameter = session.getAttribute("username")+"##"+session.getAttribute("password")+"##"+session.getAttribute("roleId")+"##"+
						   session.getAttribute("userId")+"##"+session.getAttribute("employeeId")+"##"+session.getAttribute("employeeName");
		
		return encrypt(parameter);
	}
	
}
