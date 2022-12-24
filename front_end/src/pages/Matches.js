import { useState, useEffect } from 'react';
import MatchInfoList from '../Components/meetups/MatcchInfoList'

function MatchesPage()
{
    const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://test-database-c863c-default-rtdb.firebaseio.com//meetups.json'
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
        <p>Loading...</p>
      </section>
    );
  }
    return (
        <section>
          <h1>Matches</h1>
          <MatchInfoList meetups={loadedMeetups} />
        </section>
      );
}

export default MatchesPage;