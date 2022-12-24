import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation(props) {
 
  const navigate = useNavigate();
  function NavigateHandler(url){
    navigate(url);
  } 
  const [Manager, Setmanager] = useState(false);
  const [Fan, SetFan] = useState(false);
  function Manag() {
    Setmanager(true);
  }
  function user_fan() {
    SetFan(true);
  }

  function CheckUser(){
    
  }

  function WhatUser() {
    if (!Manager) {
      return (
        <header className={classes.header}>
          <div className={classes.logo}>Welcome To Qatar</div>
          <nav>
            <ul>
              <li>
                <Link to='/Home'>Home</Link>
              </li>

              <li>
                <Link to='/Matches'>Matches</Link>
              </li>

              <li>
                <Link to='/NewMatch'>Add Match</Link>
              </li>

              <li>
                <Link to='/new-stadium'>Add Stadium</Link>
              </li>

              <li>
                <Link to='/'>Logout</Link>
              </li>
            </ul>
          </nav>
        </header>
      );

    } 
    
    else if (Fan) {
      return (
        <header className={classes.header}>
          <div className={classes.logo}>Welcome To Qatar</div>
          <nav>
            <ul>
              <li>
                <Link to='/Home'>Home</Link>
              </li>

              <li>
                <Link to='/Matches'>Matches</Link>
              </li>

              <li>
                <Link to='/YourTickets'>Your Tickets</Link>
              </li>

              <li>
                <Link to='/Profile'>Profile</Link>
              </li>

              <li>
                <Link to='/'>Logout</Link>
              </li>
            </ul>
          </nav>
        </header>
      );
    }

    else {
      return (
        <header className={classes.header}>
          <div className={classes.logo}>Welcome To Qatar</div>
          <nav>
            <ul>
              <li>
                <Link to='/Home'>Home</Link>
              </li>

              <li>
                <Link to='/Matches'>Matches</Link>
              </li>

              <li>
                <Link to='/'>LogIn</Link>
              </li>
            </ul>
          </nav>
        </header>
      );
    }
  }

  return (
    <WhatUser />
  );
}

export default MainNavigation;