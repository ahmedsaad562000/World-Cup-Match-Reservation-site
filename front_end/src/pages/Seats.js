import { useState, useEffect } from 'react';
import Reservation from '../Components/meetups/CinemaMode';
function Seats() {

  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  var LoggedIn = localStorage.getItem('LoggedIn');
  LoggedIn = JSON.parse(LoggedIn);
  var TheRole;

  if(LoggedIn)
  {
    TheRole=LoggedIn[0]["role"] ;
  }
  else{
    TheRole='G';
  }
  

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
      <Reservation no={2} role={TheRole} />
    </section>
  );
}

export default Seats;