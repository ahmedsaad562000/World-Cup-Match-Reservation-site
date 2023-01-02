import { useNavigate } from 'react-router-dom';
import Layout from '../Components/layout/Layout';

import NewMatchForm from '../Components/meetups/NewMatchForm'


function NewMatch() {
  const history = useNavigate();

  function addMatchupHandler(meetupData) {
    fetch(
      'http://localhost:8000/api/addmatch/',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      console.log(meetupData);
      if (res.status === 403) {
        alert(`There is a clashing match at same stadium` );
      }
      else if(res.status === 401)
      {
        alert(`Cant add a team already playing on same day` );
      }
      else if(res.status === 400)
      {
        alert(` There is a match in the stadium starting at the same time ` );
      }
      else if(res.status === 405)
      {
        alert(` The date is old ` );
      }
      else if(res.status === 500)
      {
        alert(` Error with server ` );
      }
      else if(res.status === 200) {
        history('/Matches');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <Layout>
      <section>
        <h1>Add Match</h1>
        <NewMatchForm onAddMeetup={addMatchupHandler} text="Add Match" />
      </section>
    </Layout>
  );

}

export default NewMatch;