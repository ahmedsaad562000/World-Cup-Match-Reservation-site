import "./container.css";
import { useNavigate } from 'react-router-dom';
import Container from "./Container";
import "../../pages/Globalvariable"
import Vedio from "../../imgs/videoplayback.webm";

function Reservation(props) {

  global.countofseats=0;

  const navigate = useNavigate();
  global.arrreserved = props.matchData;

  function Purchasehandler() {
    console.log(`The purchase: ${global.countofseats}`);
    if (global.countofseats > 0)
      navigate('/creditCard');
    else {
      alert("You Should Select at least 1 chair to purchase");
    }
  }


  function GoBackHandler() {
    navigate('/Matches');
  }


  const arr = [];
  for (var i = 0; i < props.no; i++) {
    arr.push(i);
  }

  let content;

  if (props.role === 'F') {
    console.log(`the first count is: ${global.countofseats}`);
    content = <div style={{ marginTop: '-3%', width: '20%' }}>
      <button className="btnCheck" onClick={GoBackHandler} style={{ marginBottom: '7%' }}>Go Back</button>
      <button className="btnCheck" onClick={Purchasehandler}>Purchase</button>
    </div>
  }
  else {
    content = <button className="btnCheck" onClick={GoBackHandler} >Go Back</button>
  }

  return (
    <div className="container main-box">
      {/* <video width="700" height="400"  src={Vedio} autoplay loop >
          </video> */}
      <iframe
        width="700"
        height="400"
        type="video/mp4"
        autoplay
        loop
        src={Vedio}
        style={{ border: "none" }}
        className="videoo"
      ></iframe>
      <div className="chairs">
        {arr.map((user) => (
          <Container no={props.seatsPerRow} row={user} role={props.role}>
            {" "}
          </Container>
        ))}
        {content}
      </div>
    </div>
  );
}
export default Reservation;
