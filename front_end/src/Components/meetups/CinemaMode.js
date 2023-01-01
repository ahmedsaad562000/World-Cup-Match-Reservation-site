import "./container.css";
// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Container from "./Container";
import "../../pages/Globalvariable"
import Vedio from "../../imgs/videoplayback.webm";
function Reservation(props) {

  const navigate = useNavigate();
  var LoggedIn = localStorage.getItem('LoggedIn');
  LoggedIn = JSON.parse(LoggedIn);


  global.arrreserved = props.matchData;

  function Fetching(DataToFetch) {
    fetch(
      `http://localhost:8000/api/addticket/${LoggedIn[0]["username"]}/`,
      {
        method: 'POST',
        body: JSON.stringify(DataToFetch),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      console.log(DataToFetch);
      if (res.status === 200) {
        navigate('/Matches');
      }
      else {
        console.log(res.state);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  function Purchasehandler() {
    for (let i = 0; i < global.arrreserved.length; i++) {
      if (global.arrreserved[i].seat_status === true) {
        console.log(global.arrreserved[i]);
        Fetching(global.arrreserved[i]);
      }
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
    content = <div style={{marginTop:'-3%', width:'20%'}}><button className="btnCheck" onClick={GoBackHandler}  style={{marginBottom:'1%'}}>Go Back</button>
                <button className="btnCheck" onClick={Purchasehandler} >Purchase</button> </div>
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
