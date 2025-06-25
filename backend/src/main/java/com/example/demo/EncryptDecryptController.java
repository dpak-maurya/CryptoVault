package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class EncryptDecryptController {
    private final EncryptDecryptService encryptDecryptService;

    @Autowired
    public EncryptDecryptController(EncryptDecryptService encryptDecryptService) {
        this.encryptDecryptService = encryptDecryptService;
    }

    @PostMapping("/encrypt")
    public String encrypt(@RequestBody String input) {
        try {
            return encryptDecryptService.encrypt(input);
        } catch (Exception e) {
            // You may want to log the exception here
            return "Encryption failed: " + e.getMessage();
        }
    }

    @PostMapping("/decrypt")
    public String decrypt(@RequestBody String input) {
        try {
            return encryptDecryptService.decrypt(input);
        } catch (Exception e) {
            // You may want to log the exception here
            return "Decryption failed: " + e.getMessage();
        }
    }
} 