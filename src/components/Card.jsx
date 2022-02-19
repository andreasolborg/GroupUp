import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import makeStyles from "@material-ui/core/styles"
import CardMedia from '@mui/material/CardMedia';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
      <CardMedia
        component="img"
        height="140"
        image="https://www.britsoc.co.uk/media/23986/adobestock_4437974.jpg"
        alt="activity"
      />
    <CardContent>
      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
        match.name
      </Typography>
      <Typography variant="h5" component="div">
        match.activity
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        match.location
      </Typography>
      <Typography variant="body2">
        You matched on match.matchDate
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Send message</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}