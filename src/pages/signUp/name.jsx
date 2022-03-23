import { Grid, TextField } from "@mui/material";
import { isValidName } from "./signupValidation";

export default function Name({ errorFirst, setErrorFirst, errorLast, setErrorLast }) {

    const checkInputFirst = (e) => {
        setErrorFirst(!isValidName(e.target.value));
    }

    const checkInputLast = (e) => {
        setErrorLast(!isValidName(e.target.value));
    }


    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoFocus
                    autoComplete="given-name"
                    onChange={checkInputFirst}
                    error={errorFirst}
                    helperText={errorFirst ? "Name must be letters" : ""}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={checkInputLast}
                    error={errorLast}
                    helperText={errorLast ? "Name must be letters" : ""}
                />
            </Grid>
        </>
    );
}