import { useNavigate } from 'react-router-dom';
import NewMatchForm from './NewMatchForm'

function EditMatch(props) {

  const history = useNavigate();

  function editMatchupHandler(meetupData) {
    fetch(
      `http://localhost:8000/api/updatematch/${props.matchID}`,
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
        alert("Error: " + res.status);
      }
      else {
        history('/Matches');
        props.onConfirm();
        window.location.reload(false);
      }
    }).catch((err) => {
      console.log(err);
    });
  }


  return (
    <div className="ShowMore">
      <NewMatchForm onAddMeetup={editMatchupHandler} text="Edit Match"
        matchID={props.matchID} H_team={props.H_team}
        A_team={props.A_team} Stadium={props.Stadium}
        date={props.date} time={props.time} refree={props.refree}
        line1={props.line1} line2={props.line2}
      />
    </div>
  );
}

export default EditMatch;