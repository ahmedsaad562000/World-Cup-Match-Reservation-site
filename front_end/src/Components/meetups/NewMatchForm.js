// import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "./NewMatchForm.css";
import { useRef } from 'react';
import Card from "../ui/Card";
import classes from './NewStadiumForm.module.css';

function NewMatchForm(props) {

    console.log(props.time);

    const homeTeamRef = useRef();
    const awayTeamRef = useRef();
    const stadiumRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();
    const mainRefreeRef = useRef();
    const lineManOneRef = useRef();
    const lineManTwoRef = useRef();

    function submitHandler() {
        // event.preventDefault();        
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
        // props.onConfirm();
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
            submitHandler();
        }
    }

    // function EditHandler(event) {
    //     event.preventDefault();       

    //     const HomeTeam = homeTeamRef.current.value;
    //     const AwayTeam = awayTeamRef.current.value;
    //     const Stadium = stadiumRef.current.value;
    //     const MatchDate = dateRef.current.value;
    //     const MatchTime = timeRef.current.value;
    //     const MainRefree = mainRefreeRef.current.value;
    //     const LineManone = lineManOneRef.current.value;
    //     const LineManTwo = lineManTwoRef.current.value;

    //     const meetupData = {
    //         Hteam: HomeTeam,
    //         Ateam: AwayTeam,
    //         Stad: Stadium,
    //         Mdate: MatchDate,
    //         Mtime: MatchTime,
    //         MainRef: MainRefree,
    //         LineManOne: LineManone,
    //         LineManTwo: LineManTwo,
    //     };

    //     props.onAddMeetup(meetupData);
    //     props.onConfirm();
    // }


    return (
        <Card>
            <form className={classes.form} onSubmit={Validate}>
                <div className={classes.control}>
                    <label htmlFor='Hteam'><span className={classes.vip}>Home</span> Team</label>
                    <input type='text' required disabled={props.text==="Edit Match" ? true:false} id='Hteam' ref={homeTeamRef} defaultValue={props.H_team} style={{height: '30px'}} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='Ateam'><span className={classes.vip}>Away</span> Team</label>
                    <input type='text' required disabled={props.text==="Edit Match" ? true:false} id='Ateam' ref={awayTeamRef} defaultValue={props.A_team} style={{height: '30px'}}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='Stad'><span className={classes.vip}>Stadium</span> Name</label>
                    <input type='text' required id='Stad' ref={stadiumRef} defaultValue={props.Stadium} style={{height: '30px'}}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='Mdate'><span className={classes.vip}>Match</span> Date</label>
                    <input type='date' required id='Mdate' ref={dateRef} defaultValue={props.date} style={{height: '30px'}}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='Mtime'><span className={classes.vip}>Match</span> Time</label>
                    <input type='time' required id='Mtime' ref={timeRef} defaultValue={props.time}style={{height: '30px'}} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='MainRef'><span className={classes.vip}>Main</span> Refree</label>
                    <input type='text' required id='MainRef' ref={mainRefreeRef} defaultValue={props.refree} style={{height: '30px'}}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='LineManOne'>Lineman<span className={classes.vip}> 1</span></label>
                    <input type='text' required id='LineManOne' ref={lineManOneRef} defaultValue={props.line1} style={{height: '30px'}}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='LineManTwo'>Lineman<span className={classes.vip}> 2</span></label>
                    <input type='text' required id='LineManTwo' ref={lineManTwoRef} defaultValue={props.line2} style={{height: '30px'}}/>
                </div>
                <div className={classes.actions}>
                    <button>{props.text}</button>
                </div>
            </form>
        </Card>
    );
}
export default NewMatchForm;
