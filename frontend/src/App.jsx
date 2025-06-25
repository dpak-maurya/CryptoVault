import { useState } from 'react';
import { encryptText, decryptText } from './apiService';
import {
  Lock,
  Unlock,
  ClipboardCopy,
  ShieldCheck,
  KeyRound,
  EyeOff,
} from 'lucide-react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Alert,
  Chip,
  Stack,
  Link,
  Divider,
} from '@mui/material';

function App() {
  const [plainText, setPlainText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEncrypt = async () => {
    setLoading(true);
    setError('');
    setDecryptedText('');
    try {
      const encrypted = await encryptText(plainText);
      setEncryptedText(encrypted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async () => {
    setLoading(true);
    setError('');
    try {
      const decrypted = await decryptText(encryptedText);
      setDecryptedText(decrypted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component='main'
      sx={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        height: '100%',
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 4, md:2 },
      }}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='flex-start'
    >
      {/* Compact Hero Section */}
      <Box width='100%' maxWidth={1200} textAlign='center' mb={3} mt={2}>
        <Stack
          direction='row'
          spacing={1}
          alignItems='center'
          justifyContent='center'
        >
          <Lock
            size={36}
            color='#fff'
            style={{
              background: '#1976d2',
              borderRadius: '50%',
              padding: 6,
              boxShadow: '0 2px 8px #1976d2aa',
            }}
          />
          <Typography
            variant='h4'
            component='h1'
            fontWeight='bold'
            color='white'
            sx={{ letterSpacing: 1 }}
          >
            CryptoVault
          </Typography>
        </Stack>
        <Typography
          variant='subtitle1'
          color='#e3f2fd'
          sx={{ fontSize: 16, mt: 0.5 }}
        >
          Encrypt & Decrypt messages instantly. No sign-up. No data stored.
        </Typography>
      </Box>

      {/* Feature Chips (compact) */}
      <Stack direction='row' spacing={1} justifyContent='center' mb={4}>
        <Chip
          icon={<ShieldCheck color='#388e3c' size={18} />}
          label='AES-GCM 256-bit'
          color='success'
          size='small'
        />
        <Chip
          icon={<KeyRound color='#1976d2' size={18} />}
          label='No Data Stored'
          color='primary'
          size='small'
        />
        <Chip
          icon={<EyeOff color='#fbc02d' size={18} />}
          label='Private & Secure'
          sx={{ bgcolor: '#fffde7', color: '#333' }}
          size='small'
        />
      </Stack>

      {/* Main App Section - Top of Page */}
      <Box width='100%' mt={2} mb={1} maxWidth={1200}>
        <Grid container spacing={2} width='100%' flex justifyContent='center'>
          {/* Encrypt Section */}
          <Grid item xs={12} md={6} width={500} display="flex">
            <Paper
              component="section"
              elevation={8}
              sx={{
                p: 4,
                borderRadius: 4,
                border: '1px solid #90a4ae',
                backgroundColor: '#fff',
                boxShadow: '0 8px 32px #1976d233',
                transition: 'box-shadow 0.3s',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                minWidth: '400px',
                
                justifyContent: 'flex-start',
                '&:hover': { boxShadow: '0 12px 48px #1976d244' },
              }}
            >
              <Typography
                variant='subtitle1'
                component='h2'
                fontWeight={700}
                color='primary'
                mb={2}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                🔐 Encrypt Text
              </Typography>
              <TextField
                id='encrypt-textarea'
                label='Plaintext for Encryption'
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                disabled={loading}
                multiline
                minRows={5}
                variant='outlined'
                fullWidth
                sx={{ mb: 2, bgcolor: '#f5f7fa' }}
              />
              <Button
                onClick={handleEncrypt}
                disabled={loading || !plainText}
                variant='contained'
                startIcon={<Lock />}
                aria-label='Encrypt Text'
                sx={{
                  mt: 1,
                  fontWeight: 700,
                  backgroundColor: '#1976d2',
                  fontSize: 18,
                  py: 1.2,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px #1976d2aa',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                {loading ? 'Encrypting...' : 'Encrypt'}
              </Button>

              {encryptedText && (
                <Box
                  mt={3}
                  p={2}
                  bgcolor='#e3f2fd'
                  borderRadius={2}
                  border='1px solid #90caf9'
                  position='relative'
                  sx={{ maxHeight: 120, overflowY: 'auto', mt: 2 }}
                >
                  <Typography
                    component='h3'
                    fontWeight={600}
                    color='primary.main'
                    mb={0.5}
                  >
                    Encrypted Output
                  </Typography>
                  <Typography
                    variant='body2'
                    fontFamily='monospace'
                    sx={{ wordBreak: 'break-all', lineHeight: 1.5 }}
                  >
                    {encryptedText}
                  </Typography>
                  <Button
                    size='small'
                    variant='outlined'
                    aria-label='Copy Encrypted Text'
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      minWidth: 0,
                      px: 1.5,
                      py: 0.5,
                    }}
                    onClick={() => navigator.clipboard.writeText(encryptedText)}
                    startIcon={
                      <ClipboardCopy style={{ width: 18, height: 18 }} />
                    }
                  >
                    Copy
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
          

          {/* Decrypt Section */}
          <Grid item xs={12} md={6} width={500} display="flex">
            <Paper
              component="section"
              elevation={8}
              sx={{
                p: 4,
                borderRadius: 4,
                border: '1px solid #90a4ae',
                backgroundColor: '#fff',
                boxShadow: '0 8px 32px #388e3c33',
                transition: 'box-shadow 0.3s',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                minWidth: '400px',
                justifyContent: 'flex-start',
                '&:hover': { boxShadow: '0 12px 48px #388e3c44' },
              }}
            >
              <Typography
                variant='subtitle1'
                component='h2'
                fontWeight={700}
                color='success.main'
                mb={2}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                🔓 Decrypt Text
              </Typography>
              <TextField
                id='decrypt-textarea'
                label='Ciphertext for Decryption'
                value={encryptedText}
                onChange={(e) => {
                  setEncryptedText(e.target.value);
                  setDecryptedText('');
                }}
                disabled={loading}
                multiline
                minRows={5}
                variant='outlined'
                fullWidth
                sx={{ mb: 2, bgcolor: '#f5f7fa' }}
              />
              <Button
                onClick={handleDecrypt}
                disabled={loading || !encryptedText}
                variant='contained'
                aria-label='Decrypt Text'
                startIcon={<Unlock />}
                sx={{
                  mt: 1,
                  fontWeight: 700,
                  backgroundColor: '#43a047',
                  fontSize: 18,
                  py: 1.2,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px #43a04788',
                  '&:hover': { backgroundColor: '#2e7d32' },
                }}
              >
                {loading ? 'Decrypting...' : 'Decrypt'}
              </Button>

              {decryptedText && (
                <Box
                  mt={3}
                  p={2}
                  bgcolor='#e8f5e9'
                  borderRadius={2}
                  border='1px solid #81c784'
                  position='relative'
                  sx={{ maxHeight: 120, overflowY: 'auto', mt: 2 }}
                >
                  <Typography
                    component='h3'
                    fontWeight={600}
                    color='success.main'
                    mb={0.5}
                  >
                    Decrypted Output
                  </Typography>
                  <Typography
                    variant='body2'
                    fontFamily='monospace'
                    sx={{ wordBreak: 'break-all', lineHeight: 1.5 }}
                  >
                    {decryptedText}
                  </Typography>
                  <Button
                    size='small'
                    variant='outlined'
                    aria-label='Copy Decrypted Text'
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      minWidth: 0,
                      px: 1.5,
                      py: 0.5,
                    }}
                    onClick={() => navigator.clipboard.writeText(decryptedText)}
                    startIcon={
                      <ClipboardCopy style={{ width: 18, height: 18 }} />
                    }
                  >
                    Copy
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {error && (
          <Box mt={4} maxWidth={600} width='100%' mx='auto'>
            <Alert severity='error'>
              <strong>Error:</strong> {error}
            </Alert>
          </Box>
        )}
      </Box>

      {/* Feature Highlights (moved below tool) */}
      <Box width='100%' maxWidth={900} mt={6} mb={2}>
        <Grid container spacing={3} justifyContent='center'>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: '#f5faff',
              }}
            >
              <ShieldCheck
                size={24}
                color='#388e3c'
                style={{ marginBottom: 6 }}
              />
              <Typography variant='subtitle1' fontWeight={600} mb={0.5}>
                End-to-End Encryption
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                AES-GCM, trusted by banks and governments.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: '#f5faff',
              }}
            >
              <KeyRound size={24} color='#1976d2' style={{ marginBottom: 6 }} />
              <Typography variant='subtitle1' fontWeight={600} mb={0.5}>
                No Data Stored
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Your data never leaves your browser.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: '#f5faff',
              }}
            >
              <EyeOff size={24} color='#fbc02d' style={{ marginBottom: 6 }} />
              <Typography variant='subtitle1' fontWeight={600} mb={0.5}>
                Open & Free
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                No sign-up. Always free.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        component='footer'
        mt={4}
        mb={2}
        color='white'
        textAlign='center'
        fontSize={15}
        width='100%'
      >
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 2 }} />
        <Stack direction='row' spacing={2} justifyContent='center' mb={1}>
          <Link
            href='https://github.com/dpak-maurya/CryptoVault'
            target='_blank'
            rel='noopener'
            underline='hover'
            color='inherit'
          >
            GitHub
          </Link>
          <Link href='#' underline='hover' color='inherit'>
            Privacy Policy
          </Link>
          <Link
            href='mailto:dpak.maurya@gmail.com'
            underline='hover'
            color='inherit'
            target='_blank'
            rel='noopener'
          >
            Contact
          </Link>
        </Stack>
        © {new Date().getFullYear()} CryptoVault — Secure Text Encryption Tool
      </Box>
    </Box>
  );
}

export default App;
