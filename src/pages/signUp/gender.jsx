import { FormControlLabel, FormLabel, Grid, RadioGroup, Radio, FormControl } from "@mui/material";

export default function Gender() {
    return (
        <Grid item xs={12}>
            <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup name="gender" required row autoComplete="sex">
                    <FormControlLabel value="Male" control={<Radio required={true} />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio required={true} />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio required={true} />} label="Other" />
                </RadioGroup>
            </FormControl>
        </Grid>
    );
}