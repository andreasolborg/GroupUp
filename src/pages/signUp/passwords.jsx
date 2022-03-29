import { Grid, TextField } from "@mui/material";
import { useState } from "react";
import { isStrongPassword } from "./signupValidation";


export default function Passwords({ error, setError, confirmError, setConfirmError }) {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePassword = (e) => {
        let pass = e.target.value
        setPassword(pass);
        setError(!isStrongPassword(pass));

        setConfirmError(!(pass == confirmPassword));
    }

    const updateConfirmPassword = (e) => {
        let pass = e.target.value;
        setConfirmPassword(pass)
        setConfirmError(!(password == e.target.value));
    }

    return (
        <>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={updatePassword}
                    error={error}
                    helperText={error ? "Password must have at least 3 numbers and 3 letters" : ""}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={updateConfirmPassword}
                    error={confirmError}
                    helperText={confirmError ? "Confirmation password must be same as password" : ""}
                />
            </Grid>
        </>
    )
}