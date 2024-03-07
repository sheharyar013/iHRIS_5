import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function SignupView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("")


  const handleClick = () => {
    const payload = {
      "username": username,
      "password": password,
      "email": email,
    }

    axios.post("https://medlytica-backend-alpha.vercel.app/api/user/signup", payload).then((res) => {
      toast.success("Sucessfully logged-In");
      setTimeout(() => {
      router.push('/login');
      }, 1000);
    }).catch((err) => {
      toast.error(err?.message ?? "Please check your connection!");
    })

  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} />
        <TextField name="username" label="User name" onChange={(e) => setUsername(e.target.value)} />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Sign Up
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >

      <Box sx={{
        position: 'fixed',
        top: { xs: 16, md: 24 },
        left: { xs: 16, md: 24 },
      }}>
        <img src="../../../public/assets/iHRIS5Logo.png" alt='...' width={150} />

      </Box>

      <Stack alignItems="center" justifyContent="center" sx={{
        height: 1,
        backgroundColor: "#0d3455 !important",
      }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 5 }}>Sign Up to iHRIS</Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
