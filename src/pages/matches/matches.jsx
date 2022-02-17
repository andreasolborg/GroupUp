import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import PersonPinIcon from '@mui/icons-material/PersonPin';

//import * as React from 'react';

import './matches.css';
//import Directory from '../../components/directory/directory.component';


export default function IconTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
      <Tab icon={<HomeIcon />} aria-label="home" />
      <Tab icon={<FavoriteIcon />} aria-label="favorite" />
      <Tab icon={<ChatIcon />} aria-label="chat" />
      <Tab icon={<PersonPinIcon />} aria-label="person" iconPosition="end" label="Min profil" />
    </Tabs>
  );
}






