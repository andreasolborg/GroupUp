import * as React from 'react';
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom';
import { createUser } from "../../firestore";
import Interests from './interests';
import Passwords from './passwords';
import Name from './name';
import Gender from './gender';
import Age from './age';
import Email from './email';

//import Alert from '@material-ui/lab/Alert';
import LocalizationProvider, { MuiPickersAdapterContext } from '@mui/lab/LocalizationProvider';

export default function SignUp() {

  const [interests, setInterests] = useState([]);

  const [interestsError, setInterestsError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const theme = createTheme();
  const nav = useNavigate();

  const checkAge = async() =>{

  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(auth.currentUser);
        nav("/user");
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);

      if (interests.length < 1) {
        setInterestsError(true);
        return;
      }

      if (interestsError || passwordError || confirmPasswordError || firstNameError || lastNameError || ageError || emailError) {
        return;
      }

      createUser(
        data.get("firstName"),
        data.get("lastName"),
        data.get("gender"),
        data.get("age"),
        data.get("email"),
        interests,
        data.get("password")
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Name
                errorFirst={ firstNameError }
                setErrorFirst={ setFirstNameError }
                errorLast={ lastNameError }
                setErrorLast={ setLastNameError }
              />

              <Gender/>

              <Interests 
                interests={ interests } 
                setInterests={ setInterests } 
                error = { interestsError }
                setError = { setInterestsError }
              />

              <Age
                error = { ageError }
                setError = { setAgeError }
              />

              <Email
                error = { emailError }
                setError = { setEmailError }
              />

              <Passwords
                error={ passwordError }
                setError = { setPasswordError}
                confirmError = { confirmPasswordError }
                setConfirmError = { setConfirmPasswordError }
              />

            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}