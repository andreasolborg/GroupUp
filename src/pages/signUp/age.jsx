import { Grid, TextField } from "@mui/material";
import { isAdult } from "./signupValidation";

export default function Age({ error, setError }) {

    const checkInput = (e) => {
        setError(!isAdult(parseInt(e.target.value)));
    }

    return (
        <Grid item xs={12}>
            <TextField
                required
                fullWidth
                name="age"
                label="Age"
                id="age"
                type="number"
                autoComplete='age'
                onChange={checkInput}
                error={error}
                helperText={error ? "You must be at least 18 to use this website" : ""}
            />
        </Grid>
    );
}