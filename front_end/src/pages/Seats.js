
import { useState, useEffect } from 'react';
import Reservation from '../Components/meetups/CinemaMode';

function Seats()
{

    const [isLoading, setIsLoading] = useState(true);
    const [loadedMeetups, setLoadedMeetups] = useState([]);
  
    useEffect(() => {
      setIsLoading(true);
      fetch(
        'http://localhost:8000/api/seats'
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
    return(
        <section>
            <Reservation meetups={loadedMeetups} />
        </section>
    );
}

export default Seats;