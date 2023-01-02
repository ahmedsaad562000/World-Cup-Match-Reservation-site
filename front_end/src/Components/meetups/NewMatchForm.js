// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "./NewMatchForm.css";
import { useRef } from 'react';
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import classes from './NewStadiumForm.module.css';

function NewMatchForm(props) {

    const [empdata, empdatachange] = useState(null);

    console.log(props.time);

    const homeTeamRef = useRef();
    const awayTeamRef = useRef();
    const stadiumRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const mainRefreeRef = useRef();
    const lineManOneRef = useRef();
    const lineManTwoRef = useRef();


    useEffect(() => {
        fetch("http://localhost:8000/api/stadiums/").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    function submitHandler() {
        const HomeTeam = homeTeamRef.current.value;
        const AwayTeam = awayTeamRef.current.value;
        const Stadium = stadiumRef.current.value;
        const MatchDate = dateRef.current.value;
        const MatchTime = timeRef.current.value;
        const MainRefree = mainRefreeRef.current.value;
        const LineManone = lineManOneRef.current.value;
        const LineManTwo = lineManTwoRef.current.value;

        const meetupData = {
            h_team: HomeTeam,
            a_team: AwayTeam,
            stadium: Stadium,
            date: MatchDate,
            time: MatchTime,
            refree: MainRefree,
            line1: LineManone,
            line2: LineManTwo
        };

        props.onAddMeetup(meetupData);
    }

    function Validate(event) {
        event.preventDefault();
        if (homeTeamRef.current.value === awayTeamRef.current.value) {
            alert("Same Team Cant be selected more than once");
            console.log("Same Team Cant be selected more than once");
        }
        else if (mainRefreeRef.current.value === lineManOneRef.current.value || lineManTwoRef.current.value === mainRefreeRef.current.value || lineManTwoRef.current.value === lineManOneRef.current.value) {
            alert("Same Refree Cant be selected more than once");
            console.log("Same Refree Cant be selected more than once");
        }
        else {
            if (props.text === "Edit Match" && stadiumRef.current.value !== props.Stadium) {
                alert("Changing match stadium will automatically Delete all match tickets");
            }
            submitHandler();
        }
    }
    // disabled={props.text==="Edit Match" ? true:false}
    return (
        <Card>
            <form className={classes.form} onSubmit={Validate}>
                <div className={classes.control}>
                    <label htmlFor='Hteam'><span className={classes.vip}>Home</span> Team</label>
                    <select name="teams" ref={homeTeamRef} style={{ height: '35px' }} >
                        <option value={props.H_team} selected disabled hidden>{props.H_team}</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Australia">Australia</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Canada">Canada</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="England">England</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Iran">Iran</option>
                        <option value="Japan">Japan</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="South Korea">South Korea</option>
                        <option value="Spain">Spain</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Tunisia">Tunisia</option>
                        <option value="United States">United States</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Wales">Wales</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='Ateam'><span className={classes.vip}>Away</span> Team</label>
                    <select name="teams" ref={awayTeamRef} style={{ height: '35px' }} >
                        <option value={props.A_team} selected disabled hidden>{props.A_team}</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Australia">Australia</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Canada">Canada</option>
                        <option value="Cameroon">Cameroon</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Croatia">Croatia</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="England">England</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Iran">Iran</option>
                        <option value="Japan">Japan</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Morocco">Morocco</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Poland">Poland</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Serbia">Serbia</option>
                        <option value="South Korea">South Korea</option>
                        <option value="Spain">Spain</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="United States">United States</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Wales">Wales</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='Stad'><span className={classes.vip}>Stadium</span> Name</label>
                    <select name="teams" ref={stadiumRef} style={{ height: '35px' }} >
                        <option value={props.Stadium} selected disabled hidden>{props.Stadium}</option>
                        {empdata && empdata.map((item, key) => (
                            <option value={item.name} key={key}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='Mdate'><span className={classes.vip}>Match</span> Date</label>
                    <input type='date' required id='Mdate' ref={dateRef} defaultValue={props.date} style={{ height: '30px' }} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='Mtime'><span className={classes.vip}>Match</span> Time</label>
                    <input type='time' required id='Mtime' ref={timeRef} defaultValue={props.time} style={{ height: '30px' }} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='MainRef'><span className={classes.vip}>Main</span> Refree</label>
                    <select name="teams" ref={mainRefreeRef} style={{ height: '35px' }} >
                        <option value={props.refree} selected disabled hidden>{props.refree}</option>
                        <option value="Kara">Kara</option>
                        <option value="Archie">Archie</option>
                        <option value="Rossy">Rossy</option>
                        <option value="Bethany">Bethany</option>
                        <option value="Pearl">Pearl</option>
                        <option value="Jolyn">Jolyn</option>
                        <option value="Skip">Skip</option>
                        <option value="Tory">Tory</option>
                        <option value="Regen">Regen</option>
                        <option value="Korella">Korella</option>
                        <option value="Abbott">Abbott</option>
                        <option value="Tilda">Tilda</option>
                        <option value="Prue">Prue</option>
                        <option value="Alfred">Alfred</option>
                        <option value="Amargo">Amargo</option>
                        <option value="Anette">Anette</option>
                        <option value="Frank">Frank</option>
                        <option value="Gabbie">Gabbie</option>
                        <option value="Stella">Stella</option>
                        <option value="Dorice">Dorice</option>
                    </select>

                </div>
                <div className={classes.control}>
                    <label htmlFor='LineManOne'>Lineman<span className={classes.vip}> 1</span></label>
                    <select name="teams" ref={lineManOneRef} style={{ height: '35px' }} >
                        <option value={props.line1} selected disabled hidden>{props.line1}</option>
                        <option value="Kara">Kara</option>
                        <option value="Archie">Archie</option>
                        <option value="Rossy">Rossy</option>
                        <option value="Bethany">Bethany</option>
                        <option value="Pearl">Pearl</option>
                        <option value="Jolyn">Jolyn</option>
                        <option value="Skip">Skip</option>
                        <option value="Tory">Tory</option>
                        <option value="Regen">Regen</option>
                        <option value="Korella">Korella</option>
                        <option value="Abbott">Abbott</option>
                        <option value="Tilda">Tilda</option>
                        <option value="Prue">Prue</option>
                        <option value="Alfred">Alfred</option>
                        <option value="Amargo">Amargo</option>
                        <option value="Anette">Anette</option>
                        <option value="Frank">Frank</option>
                        <option value="Gabbie">Gabbie</option>
                        <option value="Stella">Stella</option>
                        <option value="Dorice">Dorice</option>
                    </select>

                </div>
                <div className={classes.control}>
                    <label htmlFor='LineManTwo'>Lineman<span className={classes.vip}> 2</span></label>
                    <select name="teams" ref={lineManTwoRef} style={{ height: '35px' }} >
                        <option value={props.line2} selected disabled hidden>{props.line2}</option>
                        <option value="Kara">Kara</option>
                        <option value="Archie">Archie</option>
                        <option value="Rossy">Rossy</option>
                        <option value="Bethany">Bethany</option>
                        <option value="Pearl">Pearl</option>
                        <option value="Jolyn">Jolyn</option>
                        <option value="Skip">Skip</option>
                        <option value="Tory">Tory</option>
                        <option value="Regen">Regen</option>
                        <option value="Korella">Korella</option>
                        <option value="Abbott">Abbott</option>
                        <option value="Tilda">Tilda</option>
                        <option value="Prue">Prue</option>
                        <option value="Alfred">Alfred</option>
                        <option value="Amargo">Amargo</option>
                        <option value="Anette">Anette</option>
                        <option value="Frank">Frank</option>
                        <option value="Gabbie">Gabbie</option>
                        <option value="Stella">Stella</option>
                        <option value="Dorice">Dorice</option>
                    </select>
                </div>
                <div className={classes.actions}>
                    <button>{props.text}</button>
                </div>
            </form>
        </Card>
    );
}
export default NewMatchForm;
