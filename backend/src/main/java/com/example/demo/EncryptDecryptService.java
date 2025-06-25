package com.example.demo;

import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Arrays;

@Service
public class EncryptDecryptService {
    private static final String SECRET_KEY = "mySecretKey";
    private static final int ITERATIONS = 65536;
    private static final int KEY_LENGTH = 128;
    private static final int IV_LENGTH = 12;
    private static final int SALT_LENGTH = 16; // 128 bits
    private static final int GCM_TAG_LENGTH = 128;

    public String encrypt(String input) throws Exception {
        byte[] iv = generateRandomBytes(IV_LENGTH);  // generate random IV
        byte[] salt = generateRandomBytes(SALT_LENGTH); // generate random salt

        SecretKeySpec key = deriveKey(SECRET_KEY, salt);  // derive key for given salt and password

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, spec);
        byte[] encrypted = cipher.doFinal(input.getBytes(StandardCharsets.UTF_8));

        // Combine salt + iv + ciphertext
        byte[] combined = new byte[salt.length + iv.length + encrypted.length];
        System.arraycopy(salt, 0, combined, 0, salt.length);
        System.arraycopy(iv, 0, combined, salt.length, iv.length);
        System.arraycopy(encrypted, 0, combined, salt.length + iv.length, encrypted.length);

        return Base64.getEncoder().encodeToString(combined);
    }

    public String decrypt(String input) throws Exception {
        byte[] combined = Base64.getDecoder().decode(input);

        if (combined.length < SALT_LENGTH + IV_LENGTH) {
            throw new IllegalArgumentException("Invalid input data");
        }

        byte[] salt = Arrays.copyOfRange(combined, 0, SALT_LENGTH);
        byte[] iv = Arrays.copyOfRange(combined, SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
        byte[] encrypted = Arrays.copyOfRange(combined, SALT_LENGTH + IV_LENGTH, combined.length);

        SecretKeySpec key = deriveKey(SECRET_KEY, salt);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
        cipher.init(Cipher.DECRYPT_MODE, key, spec);
        byte[] decrypted = cipher.doFinal(encrypted);

        return new String(decrypted, StandardCharsets.UTF_8);
    }

    private SecretKeySpec deriveKey(String password, byte[] salt) throws Exception {
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, ITERATIONS, KEY_LENGTH);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        byte[] secret = factory.generateSecret(spec).getEncoded();
        return new SecretKeySpec(secret, "AES");
    }

    private byte[] generateRandomBytes(int length) {
        byte[] bytes = new byte[length];
        new SecureRandom().nextBytes(bytes);
        return bytes;
    }
}