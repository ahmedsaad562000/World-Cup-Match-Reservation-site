import { useState } from 'react';
import { useContext } from 'react';
import Card from '../ui/Card'
import classes from './MatchInfoItem.module.css';
import TicketsContext from '../../pages/store/UserTickets_Context';

import Modal from "../../Modal";
import Backdrop from "../../Backdrop";

function BouhgtTickets(props) {

    const BoughtTickets = useContext(TicketsContext);
    const IsBought = BoughtTickets.itemIsBought(props.id);

    const [modalIsOpen, SetModalIsOpen] = useState(false);


    function buyHandler() {
        SetModalIsOpen(true);
    }

    function closeModalHandler() {
        SetModalIsOpen(false);
    }

    function toogleTcketsStateHandler() {
        buyHandler();
    }

    //remove only if confirm deletion
    function ConfirmRemove()
    {
        closeModalHandler();
        if(IsBought)
        {
            BoughtTickets.removeTicket(props.id);
        }

        /*
        * Remove from server
        */
    }



    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.Teams}>
                    <h2>Home</h2>
                    <h2>Away</h2>
                </div>
                <div className={classes.content}>
                    <h4>Stadium</h4>
                    <address>Date</address>
                    <address>Time</address>
                    <div className={classes.LinesMan}>
                        <h5>Seat</h5>
                    </div>
                </div>

                <div className={classes.actions}>
                    <button className="btn" onClick={toogleTcketsStateHandler}>Remove</button>
                    {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={ConfirmRemove} />}
                    {modalIsOpen && <Backdrop oncCancel={closeModalHandler} />}
                </div>

            </Card>
        </li>
    );
}

export default BouhgtTickets;