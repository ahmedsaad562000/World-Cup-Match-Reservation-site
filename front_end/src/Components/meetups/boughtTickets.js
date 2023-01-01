import { useState } from 'react';
import { useContext } from 'react';
import Card from '../ui/Card'
import classes from './MatchInfoItem.module.css';
import TicketsContext from '../../pages/store/UserTickets_Context';

import Modal from "../../Modal";
import Backdrop from "../../Backdrop";

function BouhgtTickets(props) {

    // const BoughtTickets = useContext(TicketsContext);
    // // const IsBought = BoughtTickets.itemIsBought(props.id);

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    const [modalIsOpen, SetModalIsOpen] = useState(false);


    function buyHandler() {
        SetModalIsOpen(true);
        console.log(modalIsOpen);
    }

    function closeModalHandler() {
        SetModalIsOpen(false);
    }

    //remove only if confirm deletion
    function ConfirmRemove(meetupData) {
        closeModalHandler();
        // if (IsBought) {
        //     BoughtTickets.removeTicket(props.id);
        // }

        /*
        * Remove from server
        */
        fetch(
            /*Get user name from local storage */
            `http://localhost:8000/api/deleteticket/${props.id}/`,
            {
                method: 'GET',
                body: JSON.stringify(meetupData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        ).then((res) => {
            console.log(meetupData);
            if (res.status !== 200) {
                alert("Error: " + res.status);
            }
            else {
                alert("Removed Succesfuly");
                window.location.reload(false);
            }
        }).catch((err) => {
            console.log(err);
        });
    }


    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.Teams}>
                    <h2>{props.match.h_team}</h2>
                    <h3 style={{ color: '#9c1458' }}>VS</h3>
                    <h2>{props.match.a_team}</h2>
                </div>
                <div className={`${classes.content} ${classes.divaya}`}>
                    <div className={classes.content} style={{ width: '30%' }}>
                        <h4 style={{ margin: 'auto',color:'#800040' }}>Stadium</h4>
                        <h3 style={{ width: '100%', paddingTop: '8px', fontWeight: 'normal', fontSize: '20px', margin: 'auto' }}>{props.match.stadium}</h3>
                    </div>
                    <div className={classes.content} style={{ width: '30%' }}>
                        <h4 style={{ margin: 'auto',color:'#800040' }}>Date</h4>
                        <h3 style={{ width: '100%', paddingTop: '8px', fontWeight: 'normal', fontSize: '20px', margin: 'auto' }}>{props.match.date}</h3>
                    </div>
                    <div className={classes.content} style={{ width: '30%' }}>
                        <h4 style={{ margin: 'auto',color:'#800040' }}>Seat</h4>
                        <h3 style={{ width: '100%', paddingTop: '8px', fontWeight: 'normal', fontSize: '20px', margin: 'auto' }}>{alphabet[props.row]}{props.seat}</h3>
                    </div>
                </div>

                <div className={`${classes.content} ${classes.divaya}`}>
                    {/* <div className={classes.content} style={{ width: '30%', margin: 'auto', marginTop: '5px' }}>
                    </div> */}
                    <div className={classes.content} style={{ width: '30%', margin: 'auto', marginTop: '5px' }}>
                        <h4 style={{ margin: 'auto',color:'#800040' }}>Time</h4>
                        <h5 style={{ width: '100%', margin: 'auto' }}>{props.match.time}</h5>
                    </div>
                    <div className={classes.content} style={{ width: '30%', margin: 'auto', marginTop: '5px' }}>
                        <h4 style={{ margin: 'auto' ,color:'#800040'}}>Ticket ID</h4>
                        <h5 style={{ width: '100%', margin: 'auto' }}>{props.id}</h5>
                    </div>
                </div>

                <div className={classes.actions}>
                    <button className="btn" onClick={buyHandler}>Remove</button>
                    {modalIsOpen && <Modal onCancel={closeModalHandler} onConfirm={ConfirmRemove} />}
                    {modalIsOpen && <Backdrop oncCancel={closeModalHandler} />}
                </div>

            </Card>
        </li>
    );
}

export default BouhgtTickets;