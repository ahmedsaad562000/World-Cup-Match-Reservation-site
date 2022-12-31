import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Reservation from '../Components/meetups/CinemaMode';
function Seats(props)
{

    const [isLoading, setIsLoading] = useState(true);
    const [loadedMeetups, setLoadedMeetups] = useState([]);
    const {state} = useLocation();
    const { matchID, rows, seats_per_row } = state; // Read values passed on state
    console.log(`Match id seats: ${matchID} ${rows} ${seats_per_row}`);

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
  
    // if (isLoading) {
    //   return (
    //       <section>
    //         <p>Loading...</p>
    //       </section>
    //   );
    // }
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
        <Reservation no={2} meetups={loadedMeetups} />
      </section>
    );
}

export default Seats;