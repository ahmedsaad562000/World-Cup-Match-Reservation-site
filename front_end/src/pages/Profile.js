import { useNavigate } from 'react-router-dom';
import Layout from "../Components/layout/Layout";
import EditUser from '../Components/meetups/EditUser';


function Profile() {

    const history = useNavigate();

    var LoggedIn=localStorage.getItem('LoggedIn');
    LoggedIn=JSON.parse(LoggedIn);

    function editUser(meetupData) {
      fetch(
        /*Get user name from local storage */
        `http://localhost:8000/api/updateuser/${LoggedIn[0]["username"]}/`,
        {
          method: 'POST',
          body: JSON.stringify(meetupData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        console.log(meetupData);
        if (res.status !== 200) {
          alert("Error: " + res.status );
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