import Layout from "../Components/layout/Layout";
import React, { useContext } from "react";
import { useState, useEffect } from 'react';
// import TicketsContext from '../../pages/store/UserTickets_Context';
import TicketsList from "../Components/meetups/TicketsList";
import Spinner from 'react-bootstrap/Spinner';


function YourTickets() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  var LoggedIn = localStorage.getItem('LoggedIn');
  LoggedIn = JSON.parse(LoggedIn);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      /*Get user name from local storage */
      `http://localhost:8000/api/tickets/${LoggedIn[0]["username"]}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key]
          };

          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  console.log(loadedMeetups);

  if (isLoading) {
    return (
      <Layout>
        <section>
          <Spinner animation="border" />
        </section>
      </Layout>
    );
  }

  let content;

  if (loadedMeetups.length === 0) {
    content = <div style={{ color: 'white', width: '50%', height: '15vh', textAlign: 'center', margin: 'auto', fontSize: '20px', fontWeight: 'bolder', fontFamily: 'sans-serif', backgroundColor: '#9c1458', paddingTop: '6%', marginTop: '10%', borderRadius: '10px' }}>No Tickets yet</div>
  }
  else {
    content = <TicketsList meetups={loadedMeetups} />
  }

  return (
    <Layout TicketsNum={loadedMeetups.length}>
      <section>
        <h1 style={{ color: '#800040', width: '50%', marginLeft: '30%' }}>Your Tickets</h1>
        {content}
      </section>
    </Layout>
  );
}

export default YourTickets;