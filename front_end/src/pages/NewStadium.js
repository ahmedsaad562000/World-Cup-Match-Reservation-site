import { useNavigate } from 'react-router-dom';
import Layout from '../Components/layout/Layout';

import NewStadiumForm from '../Components/meetups/NewStadiumForm'


function NewStaium() {
  const history = useNavigate();

  function addStadupHandler(meetupData) {
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
      history('/Home');
    });
  }

  return (
    <Layout>
      <section>
        <h1>Add Stadium</h1>
        <NewStadiumForm onAddMeetup={addStadupHandler} />
      </section>
    </Layout>
  );

}

export default NewStaium;