import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector  } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {IoLogOutOutline} from 'react-icons/io5'
import { IconContext } from "react-icons";
import {BsHouseDoor} from 'react-icons/bs'


const Nav = (props) => {
  const page = useSelector((store) => store.page);
  const participant = useSelector((store) => store.currentsession.participant_name)
  
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }
  console.log(participant)
 
  if (participant != null){
  return (
    <div className="nav">
      <div className="homelink">
      <Link to="/home">
        <h2 className="nav-title"><BsHouseDoor size='20px'></BsHouseDoor>neurotype</h2>
      </Link>
      </div>
      <div className="pageName">
      <h2>{page}</h2>
      </div>
      <div className="nav-right">
        {/* <Link className="nav-link" to={loginLinkData.path}>
          Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not
          {loginLinkData.text}
        </Link> */}
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            {/* <Link className="nav-link" to="/about">
              About
            </Link>
            <Link className="nav-link" to="/info">
              Info Page
            </Link> */}
            <p className="participantNav">Participant ID: <strong>{participant}</strong></p>
            <LogOutButton className="nav-link" >
                  <IoLogOutOutline size="20px"></IoLogOutOutline>
            </LogOutButton>
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        
      </div>
    </div>
  )} else {
    return(
      <>
        <div className="nav">
      <div className="homelink">
      <Link to="/home">
        <h2 className="nav-title"><BsHouseDoor size='20px'></BsHouseDoor>neurotype</h2>
      </Link>
      </div>
      <div className="pageName">
      <h2>{page}</h2>
      </div>
      <div className="nav-right">
        {/* <Link className="nav-link" to={loginLinkData.path}>
          Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not
          {loginLinkData.text}
        </Link> */}
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            {/* <Link className="nav-link" to="/about">
              About
            </Link>
            <Link className="nav-link" to="/info">
              Info Page
            </Link> */}
            <LogOutButton className="nav-link" >
                  <IoLogOutOutline size="20px"></IoLogOutOutline>
            </LogOutButton>
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        
      </div>
    </div>
      </>
    )
  }
          
};

export default connect(mapStoreToProps)(Nav);
