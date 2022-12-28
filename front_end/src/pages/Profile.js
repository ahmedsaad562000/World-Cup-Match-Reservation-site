import { useNavigate } from 'react-router-dom';
import Layout from "../Components/layout/Layout";
import EditUser from '../Components/meetups/EditUser';


function Profile() {

    const history = useNavigate();

    function editUser(meetupData) {
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
          history('/Home');
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  
    return (
        <Layout>
        <section>
          <h1>Profile</h1>
          <EditUser onAddMeetup={editUser} />
        </section>
      </Layout>
    );
}

export default Profile;