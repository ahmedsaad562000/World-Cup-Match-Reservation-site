import { useNavigate } from 'react-router-dom';
import NewMatchForm from './NewMatchForm'

function EditMatch(props) {

    const history = useNavigate();

    function editMatchupHandler(meetupData) {
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