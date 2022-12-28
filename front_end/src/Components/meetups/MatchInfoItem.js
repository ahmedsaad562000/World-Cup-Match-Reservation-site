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
                Hteam: props.Hteam,
                Ateam: props.Ateam,
                Stad: props.Stad,
                Mdate: props.Mdate,
                Mtime: props.Mtime,
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
                    <img src={props.username} alt={props.title} />
                    <img src={props.username} alt={props.title} />
                </div>
                <div className={classes.Teams}>
                    <h2>{props.id}</h2>
                    <h2>{props.role}</h2>
                </div>
                <div className={classes.content}>
                    <h4>{props.id}</h4>
                    <address>Date</address>
                    <address className={classes.Time}>Time</address>
                    <div className={classes.LinesMan}>
                        <h5>Main Referee</h5>
                        <h5>Line Man 1</h5>
                        <h5>Line Man 1</h5>
                    </div>
                </div>

                <WhatUser />

            </Card>
        </li>
    );
}

export default MatchInfoItem;