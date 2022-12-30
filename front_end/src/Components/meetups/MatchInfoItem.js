import { useState } from 'react';
import { useContext } from 'react';
import Card from '../ui/Card'
import classes from './MatchInfoItem.module.css';
import TicketsContext from '../../pages/store/UserTickets_Context';

import Modal from "../../Modal";
import Backdrop from "../../Backdrop";
import EditMatch from './EditMatch';

function MatchInfoItem(props) {

    const BoughtTickets = useContext(TicketsContext);

    const [modalIsOpen, SetModalIsOpen] = useState(false);
    const [EditIsOpen, SetEditIsOpen] = useState(false);

    const [Manager, Setmanager] = useState(false);
    const [Fan, SetFan] = useState(false);

    console.log(`"${props.H_team.link}"`);

    function buyHandler() {
        SetModalIsOpen(true);
    }

    function toogleTcketsStateHandler() {
        buyHandler();


    }

        //buy only if confirm purchase
        function ConfirmBuy()
        {
            closeModalHandler();
            BoughtTickets.addTicket({
                //data to be added for tickets list
                id: props.id,
                H_team: props.H_team,
                A_team: props.A_team,
                stadium: props.stadium,
                date: props.date,
                time: props.time,
                refree: props.refree,
                line1: props.line1,
                line2: props.line2,
                //Reserved seats 
            })


        /*
        * Add tp server
        */
       
        }

    function closeModalHandler() {
        SetModalIsOpen(false);
    }

    function Manag() {
        Setmanager(true);
    }

    function user_fan() {
        SetFan(true);
    }

    function editmatch() {
        SetEditIsOpen(true);
    }


    function closeeditMatch() {
        SetEditIsOpen(false);
    }


    function WhatUser() {
        if (Manager) {
            return (
                <div className={classes.actions}>
                    <button className="btn" onClick={editmatch}>Edit Info</button>
                    <button className="btn--alt" onClick={buyHandler}>Seats Status</button>

                    {EditIsOpen && <EditMatch onConfirm={closeeditMatch} />}
                    {EditIsOpen && <Backdrop oncCancel={closeeditMatch} />}
                </div>
            );

        } else if (!Fan) {
            return (
                <div className={classes.actions}>
                    <button className="btn" onClick={toogleTcketsStateHandler}>Buy Now</button>
                    {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={ConfirmBuy} />}
                    {modalIsOpen && <Backdrop oncCancel={closeModalHandler} />}
                </div>
            );
        }

        else {
            return (
                <div className={classes.actions}></div>);
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
                    <h4>{props.stadium}</h4>
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