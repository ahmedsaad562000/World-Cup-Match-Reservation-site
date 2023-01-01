import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card'
import classes from './MatchInfoItem.module.css';
import TicketsContext from '../../pages/store/UserTickets_Context';

import Modal from "../../Modal";
import Backdrop from "../../Backdrop";
import EditMatch from './EditMatch';

function MatchInfoItem(props) {

    const BoughtTickets = useContext(TicketsContext);

    const navigate = useNavigate();

    const [modalIsOpen, SetModalIsOpen] = useState(false);
    const [EditIsOpen, SetEditIsOpen] = useState(false);


    function buyHandler() {
        SetModalIsOpen(true);
    }

    function toogleTcketsStateHandler() {
        // buyHandler();

        navigate('/Seats', { state: { matchID: props.id, rows: props.Stadium.rows, seats_per_row: props.Stadium.seats_per_row } });
    }

    //buy only if confirm purchase
    function ConfirmBuy() {
        closeModalHandler();
        BoughtTickets.addTicket({
            //data to be added for tickets list
            id: props.id,
            // h_team: props.H_team,
            // a_team: props.A_team,
            // stadium: props.stadium,
            // date: props.date,
            // time: props.time,
            // refree: props.refree,
            // line1: props.line1,
            // line2: props.line2,
            //Reserved seats 
        })

        /*
        * Add to server
        */

    }

    function closeModalHandler() {
        SetModalIsOpen(false);
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
                        {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={ConfirmBuy} />}
                        {modalIsOpen && <Backdrop oncCancel={closeModalHandler} />}
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
                    <h2>{props.A_team.name}</h2>
                </div>
                <div className={classes.content}>
                    <h4>{props.Stadium.name}</h4>
                    <address>{props.date}</address>
                    <address className={classes.Time}>{props.time}</address>
                    <div className={classes.LinesMan}>
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