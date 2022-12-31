import { useNavigate } from 'react-router-dom';
import NewMatchForm from './NewMatchForm'

function EditMatch(props) {

    const history = useNavigate();

    function editMatchupHandler(meetupData) {
      fetch(
        'http://localhost:8000/api/addmatch',
        {
          method: 'PATCH',
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
          history('/Matches');
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    function confirmHandler()
    {
        props.onConfirm();
    }
    
    return (
        <div className="ShowMore">
            <NewMatchForm onConfirm={confirmHandler} onAddMeetup={editMatchupHandler} text="Edit Match"/>
        </div>
    );
}

export default EditMatch;