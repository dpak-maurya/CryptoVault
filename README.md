# CryptoVault


A React + Spring Boot app for secure text encryption/decryption using AES-GCM.

## Features
- End-to-End Encryption with AES-GCM 256-bit
- No data storage
- Responsive UI
- Copy encrypted/decrypted text

## Tech Stack
- Frontend: React, MUI, Lucide Icons
- Backend: Spring Boot, Java, Gradle
- Encryption: AES-GCM, PBKDF2

## Installation
1. Clone: `git clone https://github.com/dpak-maurya/CryptoVault`
2. Backend: `cd backend && ./gradlew build && ./gradlew bootRun`
3. Frontend: `cd frontend && npm install && npm start`

## Usage
- Enter text to encrypt/decrypt
- Click "Encrypt" or "Decrypt"
- Copy results with the "Copy" button

## Security
- Demo uses hardcoded keys/salts. Use secure keys in production.

## License
[MIT](LICENSE)

## Contact
- GitHub: [dpak-maurya](https://github.com/dpak-maurya)
- Issues: [Here](https://github.com/dpak-maurya/CryptoVault/issues)

Last updated: 07:41 PM IST, June 25, 2025