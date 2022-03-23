import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function InterestList( {interests} ) {
    return (
        <ul>
        <ListSubheader>{"Interests:"}</ListSubheader>
        {interests.map((item) => (
            <ListItem key={`interest-${item}`}>
            <ListItemText primary={item} />
            </ListItem>
        ))}
        </ul>
    )
}