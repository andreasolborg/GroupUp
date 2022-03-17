import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { textAlign } from '@mui/system';
import { alignProperty } from '@mui/material/styles/cssUtils';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: "100%",
    marginTop: "auto"
  },
  media: {
    height: 140,
  },
  button: {
    display:'flex', justiyContent:'space-between', flexDirection:'row'
  },
});


export default function GroupCard({ image, title, description }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.button}>
        <Button size="small" color="primary">
          Send message
        </Button>
      </CardActions>
    </Card>
  );
}