import "./container.css";
import Container from "./Container";
import "../../pages/Globalvariable"
import Vedio from "../../imgs/videoplayback.webm";
function Reservation(props) {

  global.arrreserved=[
    {
      row:0,
      col:0,
      state:false,
      id:-1
    },
    {
      row:0,
      col:1,
      state:false,
      id:-1
    },
    {
      row:0,
      col:2,
      state:false,
      id:-1
    },
    {
      row:0,
      col:3,
      state:false,
      id:-1
    },
    {
      row:0,
      col:4,
      state:false,
      id:-1
    },
    {
      row:1,
      col:0,
      state:false,
      id:-1
    },
    {
      row:1,
      col:1,
      state:false,
      id:-1
    },
    {
      row:1,
      col:2,
      state:false,
      id:-1
    },
    {
      row:1,
      col:3,
      state:false,
      id:-1
    },
    {
      row:1,
      col:4,
      state:true,
      id:-1
    }
   ] 

   function Purchasehandler()
   {
    for(let i=0;i<global.arrreserved.length;i++)
    {
      console.log(global.arrreserved[i].state);
    }

   }
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
          <Container no={5} row={user}>
            {" "}
          </Container>
        ))}
        {props.role === "F" && <button className="btnCheck" onClick={Purchasehandler} >Purchase</button>}
      </div>
    </div>
  );
}
export default Reservation;
