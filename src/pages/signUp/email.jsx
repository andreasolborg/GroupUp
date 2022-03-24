import { Grid, TextField } from "@mui/material";
import { isValidEmail } from "./signupValidation";


export default function Email({ error, setError }) {
    const checkInput = (e) => {
        setError(!isValidEmail(e.target.value))
    }

    return (
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={checkInput}
                error={error}
                helperText={error ? "Invalid email or already in use" : ""}
            />
        </Grid>
    );
}