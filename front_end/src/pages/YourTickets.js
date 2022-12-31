import Layout from "../Components/layout/Layout";
import React, { useContext } from "react";
import { useState, useEffect } from 'react';
// import TicketsContext from '../../pages/store/UserTickets_Context';
import TicketsList from "../Components/meetups/TicketsList";
import TicketsContext from "./store/UserTickets_Context";

function YourTickets() {
  const BoughtTickets = useContext(TicketsContext);

  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'http://localhost:8000/api/tickets'
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

  if (isLoading) {
    return (
      <Layout>
        <section>
          <p>Loading...</p>
        </section>
      </Layout>
    );
  }

  let content;

  if (BoughtTickets.totaltickets === 0) {
    content = <div style={{ color: '#9c1458', width: '50%', height: '20vh', textAlign: 'center', margin: 'auto', fontSize: '20px', fontWeight: 'bolder', fontFamily: 'sans-serif', backgroundColor: 'white', paddingTop: '10%' }}>No Tickets yet</div>
  }
  else
  {
    content = <TicketsList meetups={loadedMeetups} />
  }

  return (
    <Layout>
      <section>
        <h1>Your Tickets</h1>
        {content}
      </section>
    </Layout>
  );
}

export default YourTickets;