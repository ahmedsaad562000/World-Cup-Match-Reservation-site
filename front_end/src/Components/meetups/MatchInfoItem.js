import { useState } from 'react';
import Card from '../ui/Card'
import classes from './MatchInfoItem.module.css';

import Modal from "../../Modal";
import Backdrop from "../../Backdrop";
import EditMatch from './EditMatch';

function MatchInfoItem(props) {

    const [modalIsOpen, SetModalIsOpen] = useState(false);
    const [EditIsOpen, SetEditIsOpen] = useState(false);

    const [Manager, Setmanager] = useState(false);
    const [Fan, SetFan] = useState(false);


    function buyHandler() {
        SetModalIsOpen(true);
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

    function editmatch()
    {
        SetEditIsOpen(true);
    }


    function closeeditMatch()
    {
        SetEditIsOpen(false);
    }


    function WhatUser() {
        if (!Manager) {
            return (
                <div className={classes.actions}>
                    <button className="btn" onClick={editmatch}>Edit Info</button>
                    <button className="btn--alt" onClick={buyHandler}>Seats Status</button>

                    {EditIsOpen && <EditMatch  onConfirm={closeeditMatch} />}
                    {EditIsOpen && <Backdrop oncCancel={closeeditMatch} />}
                </div>
            );

        } else if (Fan) {
            return (
                <div className={classes.actions}>
                    <button className="btn" onClick={buyHandler}>Buy Now</button>
                    {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} />}
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
                    <img src={props.image} alt={props.title} />
                    <img src={props.image} alt={props.title} />
                </div>
                <div className={classes.Teams}>
                    <h2>{props.title}</h2>
                    <h2>{props.address}</h2>
                </div>
                <div className={classes.content}>
                    <h4>{props.stad_name}</h4>
                    <address>Date</address>
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