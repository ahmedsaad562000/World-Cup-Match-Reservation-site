import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Reservation from '../Components/meetups/CinemaMode';
import Spinner from 'react-bootstrap/Spinner';


function Seats() {

  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  const { state } = useLocation();
  const { matchID, rows, seats_per_row } = state; // Read values passed on state

  var LoggedIn = localStorage.getItem('LoggedIn');
  LoggedIn = JSON.parse(LoggedIn);
  var TheRole;

  if (LoggedIn) {
    TheRole = LoggedIn[0]["role"];
  }
  else {
    TheRole = 'G';
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:8000/api/seats/${matchID}`
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
      <section>
        <Spinner animation="border" />
      </section>
    );
  }
  return (
    <section
      style={{
        backgroundImage:
          "url('https://d3hnfqimznafg0.cloudfront.net/images/Article_Images/ImageForArticle_365(1).jpg')",
        height: "100vh",
        overflow: "hidden",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <Reservation no={rows} seatsPerRow={seats_per_row} role={TheRole} matchData={loadedMeetups} />
    </section>
  );
}

export default Seats;