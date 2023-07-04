import * as React from 'react';
import { useForm } from 'react-hook-form';
import { InputField } from '../form';
import { Box, Button, Container,CircularProgress } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '@/hooks';
import { LoginPayload } from '@/models';
import { useRouter } from 'next/router';
import * as yub from "yup"
import { yupResolver } from '@hookform/resolvers/yup';

export interface LoginFormProps {
  onSubmit: (payload: LoginPayload) => void;
  username: string;
  password: string;
}

export default function LoginForm({ onSubmit, username, password }: LoginFormProps) {
  const router = useRouter();
  //Validation
  const schema = yub.object().shape({
    username: yub.string().required("Please enter username").min(4,"Username is too short. Username is required to have at lease 4 characters"),
    password : yub.string().required().min(6,"Password is required to have at lease 6 characters"),
  })

  ///Xử li password input
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  // Xử lí state băng useForm
  const { control, handleSubmit,formState: {
    isSubmitting
  } } = useForm<LoginPayload>({
    defaultValues: {
      username,
      password,
    },
    resolver: yupResolver(schema)
  });
  /// handleSubmit

  const handleLoginSubmit =  async(values: LoginPayload) => {
    console.log(values);
    await onSubmit(values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField placeholder="Nhập vào username" name="username" control={control} />
      <InputField
        placeholder="Nhập vào password"
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Password"
        name="password"
        control={control}
      />

      <Button sx={{
        margin: "12px auto 0"
      }} disabled={isSubmitting } startIcon={isSubmitting? <CircularProgress color= "inherit" /> : null } type="submit"  variant="contained" fullWidth>
        {isSubmitting ? "":"Login"} 
      </Button>

      <Button sx={{
        margin: "12px auto 0"
      }} disabled={isSubmitting } onClick={()=>{
        router.push("/")
      }}   variant="contained" fullWidth>
        GO TO HOME PAGE
      </Button>
    </Box>
  );
}
