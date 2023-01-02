import { useContext } from 'react';
import { Link } from 'react-router-dom';
import TicketsContext from '../../pages/store/UserTickets_Context';

import classes from './MainNavigation.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MainNavigation(props) {

  function LoggingOut() {
    localStorage.removeItem('LoggedIn');
  }

  function WhatUser() {
    var LoggedIn = localStorage.getItem('LoggedIn');
    LoggedIn = JSON.parse(LoggedIn);

    if (LoggedIn) {

      if (LoggedIn[0]["role"] === 'M') {
        return (
          <header className={classes.header}>
            <div className={classes.logo}>Marhaba</div>
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
                  <Link to='/' onClick={LoggingOut}>Logout</Link>
                </li>
              </ul>
            </nav>
          </header>
        );

      }

      else if (LoggedIn[0]["role"] === 'F') {
        return (
          <header className={classes.header}>
            <div className={classes.logo}>Marhaba</div>
            <nav>
              <ul>
                <li>
                  <Link to='/Home'>Home</Link>
                </li>

                <li>
                  <Link to='/Profile'>Profile</Link>
                </li>

                <li>
                  <Link to='/Matches'>Matches</Link>
                </li>

                <li>
                  <Link to='/YourTickets'>Your Tickets
                    <span className={classes.badge}>{props.Ticketsnum}</span>
                  </Link>
                </li>

                <li>
                  <Link to='/' onClick={LoggingOut}>Logout</Link>
                </li>
              </ul>
            </nav>
          </header>
        );
      }

    }
    else {
      return (
        <header className={classes.header}>
          <div className={classes.logo}>Marhaba</div>
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