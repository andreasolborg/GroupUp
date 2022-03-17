import { IconButton } from '@mui/material';
import React from "react";
import'./groupCard.css'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';


///code from: https://www.youtube.com/watch?v=Q3I_NwaCZI8
function GroupCard({leader, interest, location, matchDate, ageGroup, imageURL, ratingValue}) {
  return (
    <div className='card-container'>
      <div className="image-container">
        <img src={imageURL} alt=''/>
      </div>
      <div className="card-content">
        <div className="card-interest">
          <h2>{interest}</h2>
        </div>
        <div className="card-leader">
          <p>{leader}</p>
        </div>
        <div className="card-location">
          <p>{location}</p>
        </div>
        <div className="card-matchDate">
          <p>{matchDate}</p>
        </div>
        <div className="age-group">
          <p>{ageGroup}</p>
        </div>
        <div className="chat-btn">
            <Link to="/chat">
                <IconButton size="large" className="icon-button" disableRipple>
                    <ChatBubbleIcon ></ChatBubbleIcon>
                    Chat
                </IconButton>
            </Link>
        </div>
        <div className="card-rating">
        <Rating name="read-only" value={ratingValue} readOnly />
        </div>
      </div>
      </div>
      
  )
}

export default GroupCard;
