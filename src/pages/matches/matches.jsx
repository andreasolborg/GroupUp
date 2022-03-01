import React from "react";
import Navbar from "../../components/navbar";
import Grid from '@mui/material/Grid';
import Card from "../../components/Card";
import { makeStyles } from "@material-ui/core";
import cards from "../../components/Card";
import Box from '@mui/material/Box'; 


const useStyles = makeStyles({
  gridContainer: {
  paddingTop: "20px",
  direction: "column",
  alignItems: "stretch",
  display: "flex",
  justifyContent: "center",
  xs: "auto", 
  sm: 6,
  md: 4
  } 
})

const mediaCards = [
  {
    title: 'Fotball',
    image: 'https://www.britsoc.co.uk/media/23986/adobestock_4437974.jpg',
    description:
      'Fotball er en ballidrett mellom to lag, hvert bestående av elleve spillere, hvor formålet er å få ballen flest ganger inn i motstanderlagets mål. Idretten utøves på en rektangulær bane med ett mål i hver kortende, og det laget som har fått flest mål når spilletiden er ute, vinner kampen.',
  },
  {
    title: 'Klatring',
    image: 'https://eu-assets.simpleview-europe.com/lillehammer/imageresizer/?image=%2Fdbimgs%2FLIL-Gallery-TyriliKlatring.jpg&action=WhatsOnFP',
    description:
      'Klatring er en aktivitet som innebærer kroppslig bevegelse i bratt terreng, vanligvis i fjell eller i innendørs klatrehaller.',
  },
  {
    title: 'Basketball',
    image: 'https://cdn.vox-cdn.com/thumbor/ZSH9c_8OQdZXvb25AFmE0G1FTXs=/0x0:4398x2931/920x613/filters:focal(1590x317:2292x1019):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69330596/1316120947.0.jpg',
    description:
      'Basketball eller basket er en lagsport der to lag, bestående av fem spillere, prøver å score poeng mot hverandre ved å kaste en ball gjennom en ring. Dette må skje i tråd med reglene som er forhåndsbestemt før spillet starter.',
  },
  {
    title: 'Langrenn',
    image: 'https://g.acdn.no/obscura/API/dynamic/r1/nadp/tr_2000_2000_s_f/0000/2020/03/03/3423931554/1/original/17039220.jpg?chk=199993',
    description:
      'Langrenn er en konkurranseidrett utviklet fra skigåing. Langrenn utøves på to hovedmåter, klassisk stil og fristil. Når en løper går klassisk, følger skiene et spor, og som regel legges det festesmurning under skiene for at de ikke så lett skal gli når de skyves bakover for fremdrift.',
  },



];


function Matches() {
  const classes = useStyles();
  return (
    <><div className="matches">
    <div><Navbar></Navbar></div>
    <Grid container spacing = {5} className={classes.gridContainer}>
      {mediaCards.map((card, i) => {
            return (
              <Grid key={i} item>
                <Card {...card} />
              </Grid>
            );
          })}
    </Grid>
    </div></>
    
  );
}

export default Matches;