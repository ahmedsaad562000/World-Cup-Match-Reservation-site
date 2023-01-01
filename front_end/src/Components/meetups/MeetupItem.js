import { useState } from 'react';
import Card from '../ui/Card'
import classes from './MeetupItem.module.css';

import ShowMore from './ShowMore';
import Backdrop from '../../Backdrop'

function MeetupItem(props) {

  const [ShowmoreIsopen, SetIsOpen] = useState(false);

  function ShowingMore() {
    SetIsOpen(true);
  }

  function closeModalHandler() {
    SetIsOpen(false);
  }


  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={ShowingMore}>Show More</button>
          {ShowmoreIsopen && <ShowMore text= {props.des} onCancel={closeModalHandler} />}
          {ShowmoreIsopen && <Backdrop oncCancel={closeModalHandler} />}
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;