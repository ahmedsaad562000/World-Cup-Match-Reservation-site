import { useNavigate } from 'react-router-dom';
import Layout from '../Components/layout/Layout';

import NewMatchForm from '../Components/meetups/NewMatchForm'


function NewMatch() {
  const history = useNavigate();

  function addMatchupHandler(meetupData) {
    fetch(
      'http://localhost:8000/api/adduser',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      if (res.status === 500 || res.status === 404) {
        console.log("error");
      }
      else {
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