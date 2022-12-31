import "./container.css";
import Container from "./Container";
import Vedio from "../../imgs/videoplayback.webm";
function Reservation(props) {
    const arr = [];
    for (var i = 0; i < props.no; i++) {
      arr.push(i);
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
          <Container no={10} row={user}>
            {" "}
          </Container>
        ))}
        <button className="btnCheck">Purchase</button>
      </div>
    </div>
  );
}
export default Reservation;
