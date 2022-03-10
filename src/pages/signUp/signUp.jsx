import * as React from 'react';
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { NavLink, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore'
import { db } from "../../firebase-config";
import { FormLabel, RadioGroup, FormControl, Radio } from '@mui/material';
import Interests from './interests';
import LocalizationProvider, { MuiPickersAdapterContext } from '@mui/lab/LocalizationProvider';


export default function SignUp() {

  const [date, setDate] = useState();
  const [errorAge, setErrorAge] = React.useState(false);
  const [errorName, setErrorName] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);


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
      if (!checkName(data.get("firstName") || !checkName(data.get("lastName")))) {
        console.log("False in name");
        return;
      } else if (!checkName(data.get("lastName"))) {
        console.log("false in lastname");
        return;
      } else if (!checkAge(data.get("age"))) {
        console.log("False in handleSubmit");
        return;
      } else if (!checkEmail(data.get("email"))) {
        console.log("False in email");
        return;
      } else if (!checkPassword()) {
        console.log("Wrong in password (May be something wrong with the method");
        return;
      }



      await createUserWithEmailAndPassword(
        auth, data.get("email"), data.get("password")
      );
      storeUser(
        data.get("firstName"),
        data.get("lastName"),
        data.get("gender"),
        data.get("age"),
        data.get("email"),
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const storeUser = async (firstName, lastName, gender, age, mail) => {
    await setDoc(doc(db, "profile", mail), {
      testName: firstName,
      testEmail: mail,
      testLastname: lastName,
      testGender: gender,
      testAge: age,
      interest: ["Formel1"]
    });
  }

  const listProfiles = async () => {

  }


  const checkAge = (a) => {
    if (a < 18) {
      console.log("Too low age");
      setErrorAge(true);
      return false;
    }
    setErrorAge(false);
    return true;
  }

  const checkName = (nameString) => {

    if (isNaN(nameString)) {
      setErrorName(false);
      return true;
    } else if (nameString === "") {
      setErrorName(true);
      return false;
    } else {
      setErrorName(true);
      return false;
    }
  }


  /**
   * Very incomplete
   * @param {*} emailString 
   */
  const checkEmail = (emailString) => {
    if (emailString.includes("@") && emailString.includes(".")) {
      setErrorEmail(false);
      return true;
    }
    setErrorEmail(true);
    return false;
  }

  /**
   * Very shady
   */
  const checkPassword = () => {
    if (document.getElementById("password").value == "") {
      setErrorPassword(true);
      return;
    }
    const passwordString = document.getElementById("password").value;
    var numCounter = 0;
    var letterCounter = 0;
    for (var i = 0; i < passwordString.length; i++) {
      console.log("in loop, ", passwordString.charAt(i));
      if (isNaN(passwordString.charAt(i))) {
        letterCounter++;
      } else {
        numCounter++;
      }
    }
    console.log("counters:; ", numCounter, " ", letterCounter);
    if (letterCounter > 2 && numCounter > 2 && matchPassword()) {
      setErrorPassword(false);
      return true;
    } else {
      setErrorPassword(true);
      return false;
    }
  }

  const matchPassword = () => {
    if (document.getElementById("password").value != document.getElementById("confirmPassword").value) {
      return false;
    }
    return true;
  }


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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errorName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  helperText="Name can only be letters"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errorName}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl >
                  <FormLabel >Gender</FormLabel>
                  <RadioGroup name="gender" required row autoComplete="sex">
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Interests name="interests" required />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={errorAge}
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="number"
                  id="age"
                  autoComplete='age'
                  helperText="Age must be over 18"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={errorEmail}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText="Email must contain '@' and '.'"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorPassword}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText="Password must have at least 3 numbers and 3 letters"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errorPassword}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  helperText="Passwords must be equal"
                />
              </Grid>
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