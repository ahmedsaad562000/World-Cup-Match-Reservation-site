import "./style.css"
import { useNavigate } from 'react-router-dom';
import "../../pages/Globalvariable"

function Creditcard(props) {

  const navigate = useNavigate();
  var LoggedIn = localStorage.getItem('LoggedIn');
  LoggedIn = JSON.parse(LoggedIn);


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
      if (res.status === 401) {
        alert("You Already have a ticket of a clashing match");
      }
      else if(res.status !== 200)
      {
        alert("Server Error");
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  function confirmReserve(event) {
    event.preventDefault();
    for (let i = 0; i < global.arrreserved.length; i++) {
      if (global.arrreserved[i].seat_status === true) {
        console.log(global.arrreserved[i]);
        Fetching(global.arrreserved[i]);
      }
    }
    navigate('/Matches');
  }



  return (
    <div className="conte">
      <form action="" style={{ marginTop: "40px" }} onSubmit={confirmReserve}>
        <div style={{ marginTop: "-120px" }}>
          <img
            src="https://www.visa.ca/dam/VCOM/regional/na/canada/card-products/images/visa-gold-card-800x450.jpg"
            alt=""
            style={{ width: "400px", height: "200px", marginLeft: "75px" }}
          />
        </div>
        <div className="inputBox">
          <span>card number</span>
          <input type="text" className="card-number-input" required minLength={14} maxLength={14} />
        </div>
        <div className="inputBox">
          <span>card holder</span>
          <input type="text" className="card-holder-input" required />
        </div>
        <div className="flexbox">
          <div className="inputBox">
            <span>expiration mm</span>
            <select required name="" id="" className="month-input">
              <option value="month" selected disabled>
                month
              </option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className="inputBox">
            <span>expiration yy</span>
            <select required name="" id="" className="year-input">
              <option value="year" selected disabled>
                year
              </option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
          <div className="inputBox">
            <span>cvv</span>
            <input type="text" minLength={3} maxLength={3} className="cvv-input" required />
          </div>
        </div>
        <input type="submit" value="submit" className="submit-btn" />
      </form>
    </div>
  );
}
export default Creditcard;
