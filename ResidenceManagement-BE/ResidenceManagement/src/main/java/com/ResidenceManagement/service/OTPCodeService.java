package com.ResidenceManagement.service;


import com.ResidenceManagement.entity.OTPCode;
import org.springframework.stereotype.Service;

@Service
public interface OTPCodeService {
    OTPCode findOTPCode(String mail, String data);
    void saveOTPCode(OTPCode otpCode);
}
