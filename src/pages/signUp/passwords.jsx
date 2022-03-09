import { Grid, TextField } from "@mui/material";


export default function Passwords() {
    
    
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
                    helperText="Password must have at least 3 numbers and 3 letters"
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
                    helperText="Password must have at least 3 numbers and 3 letters"
                />
            </Grid>
        </>
    )
}