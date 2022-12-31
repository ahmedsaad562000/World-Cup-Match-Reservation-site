import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewStadiumForm.module.css';

function NewStadiumForm(props) {
  const nameInputRef = useRef();
  const rowInputRef = useRef();
  const colInputRef = useRef();
  const imgInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredrow = rowInputRef.current.value;
    const enteredcol = colInputRef.current.value;
    const enteredImage = imgInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      name: enteredName,
      rows: enteredrow,
      seats_per_row: enteredcol,
      link: enteredImage,
      description: enteredDescription
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
          <label htmlFor='name'><span className={classes.vip}>Stadium</span> Name</label>
          <input type='text' required id='name' ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='rows'><span className={classes.vip}>VIP</span> Lounge Rows</label>
          <input type='text' required id='rows' ref={rowInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='seats_per_row'>Row Number Of Seats</label>
          <input type='text' required id='seats_per_row' ref={colInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='link'>Stadium Image</label>
          <input type='url' required id='link' ref={imgInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='4'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Stadium</button>
        </div>
      </form>
    </Card>
  );
}

export default NewStadiumForm;