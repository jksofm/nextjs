import LoginForm from '@/components/auth/login-form';
import { LoginPayload } from '@/models';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuth } from '../hooks';
import { ToastContainer, toast } from 'react-toastify';
export default function LoginPage() {
  const { profile, login, logout } = useAuth({
    revalidateOnMount: false,
  });
  const router = useRouter();

  const handleLoginClick = async (data: LoginPayload) => {
    try {
      await login(data);
      toast.success('Login successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error:any) {
      const err =JSON.parse(error)
      // console.log('fail to Login', err?.error);
      toast.error(`${err?.error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };
  // Chuyển sang home page khi đăng nhập thành công
  React.useEffect(() => {
    if (profile !== undefined && profile?.hasOwnProperty('username')) {
      router.push('/');
    }
  }, [profile]);

  return (
    <Container>
     
        <>
          <Box>
            <Paper
              elevation={6}
              sx={{
                mx: 'auto',
                mt: 8,
                p: 4,
                maxWidth: '480px',
              }}
            >
              <Typography
                sx={{
                  color: 'Black',
                  fontWeight: '700',
                  textAlign: 'center',
                }}
                variant="h3"
                component="h1"
              >
                Login Page
              </Typography>
              <LoginForm username="" password="" onSubmit={handleLoginClick} />
            </Paper>
          </Box>
        </>
      

      {/* <button onClick={handleGetProfileClick}>Get Profile</button> */}
    </Container>
  );
}
