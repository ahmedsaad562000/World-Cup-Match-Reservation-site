import { useNavigate } from 'react-router-dom';

import NewMatchForm from '../Components/meetups/NewMatchForm'


function NewMatch()
{
  const history = useNavigate();

  function addMatchupHandler(meetupData) {
    fetch(
      'https://test-database-c863c-default-rtdb.firebaseio.com/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(() => {
      history('/Matches');
    });
  }

    return(
        <section>
        <h1>Add Match</h1>
        <NewMatchForm onAddMeetup={addMatchupHandler} text="Add Match"/>
      </section>
    );
  
}

export default NewMatch;