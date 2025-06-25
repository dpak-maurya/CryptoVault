const API_BASE = 'http://localhost:8080/api';

export async function encryptText(plainText) {
  const res = await fetch(`${API_BASE}/encrypt`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: plainText,
  });
  if (!res.ok) throw new Error('Encryption failed');
  return res.text();
}

export async function decryptText(encryptedText) {
  const res = await fetch(`${API_BASE}/decrypt`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: encryptedText,
  });
  if (!res.ok) throw new Error('Decryption failed');
  return res.text();
} 