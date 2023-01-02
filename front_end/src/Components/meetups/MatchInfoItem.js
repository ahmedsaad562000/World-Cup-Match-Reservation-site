import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card'
import classes from './MatchInfoItem.module.css';
import Backdrop from "../../Backdrop";
import EditMatch from './EditMatch';

function MatchInfoItem(props) {

    const navigate = useNavigate();
    const [EditIsOpen, SetEditIsOpen] = useState(false);


    function toogleTcketsStateHandler() {
        navigate('/Seats', { state: { matchID: props.id, rows: props.Stadium.rows, seats_per_row: props.Stadium.seats_per_row } });
    }

    function editmatch() {
        SetEditIsOpen(true);
    }


    function closeeditMatch() {
        SetEditIsOpen(false);
    }


    function WhatUser() {
        var LoggedIn = localStorage.getItem('LoggedIn');
        LoggedIn = JSON.parse(LoggedIn);

        if (LoggedIn) {
            if (LoggedIn[0]["role"] === 'M') {
                return (
                    <div className={classes.actions}>
                        <button className="btn" onClick={editmatch}>Edit Info</button>
                        <button className="btn--alt" onClick={toogleTcketsStateHandler}>Seats Status</button>

                        {EditIsOpen && <EditMatch onConfirm={closeeditMatch} matchID={props.id} H_team={props.H_team.name}
                            A_team={props.A_team.name} Stadium={props.Stadium.name}
                            date={props.date} time={props.time} refree={props.refree}
                            line1={props.line1} line2={props.line2}
                        />}
                        {EditIsOpen && <Backdrop oncCancel={closeeditMatch} />}
                    </div>
                );

            } else if (LoggedIn[0]["role"] === 'F') {
                return (
                    <div className={classes.actions}>
                        <button className="btn" onClick={toogleTcketsStateHandler} >Buy Now</button>
                    </div>
                );
            }
        }
        else {
            return (
                <div className={classes.actions}>
                    <button className="btn--alt" onClick={toogleTcketsStateHandler}>Seats Status</button>
                </div>
            );
        }
    }


    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.H_team.link} alt={props.H_team.name} />
                    <img src={props.A_team.link} alt={props.A_team.name} />
                </div>
                <div className={classes.Teams}>
                    <h2>{props.H_team.name}</h2>
                    <h3 style={{ color: '#9c1458' }}>VS</h3>
                    <h2>{props.A_team.name}</h2>
                </div>
                <div className={`${classes.content} ${classes.divaya}`}>
                    <div className={classes.content} style={{ width: '30%', margin: 'auto', marginTop: '5px' }}>
                        <h5 style={{ color: '#800040' }}>Stadium</h5>
                        <h4 style={{marginTop:'2%'}}>{props.Stadium.name}</h4>
                    </div>

                    <div className={classes.content} style={{ width: '30%', margin: 'auto', marginTop: '5px' }}>
                        <h5 style={{ color: '#800040' }}>Date</h5>
                        <address>{props.date}</address>
                    </div>

                    <div className={classes.content} style={{ width: '30%', margin: 'auto', marginTop: '5px' }}>
                        <h5 style={{ color: '#800040' }}>Time</h5>
                        <address className={classes.Time}>{props.time}</address>
                    </div>

                    <h5 style={{ color: '#800040' }}>Referees</h5>
                    <div className={`${classes.LinesMan} ${classes.divaya}`}>
                        <h5>{props.refree}</h5>
                        <h5>{props.line1}</h5>
                        <h5>{props.line2}</h5>
                    </div>
                </div>

                <WhatUser />

            </Card>
        </li>
    );
}

export default MatchInfoItem;