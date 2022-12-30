import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewStadiumForm.module.css';

function NewStadiumForm(props) {
  const nameInputRef = useRef();
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      name: enteredName,
      rows: enteredTitle,
      seats_per_row: enteredImage,
      link: enteredAddress,
      description: enteredDescription,
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
          <input type='text' required id='rows' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='seats_per_row'>Row Number Of Seats</label>
          <input type='text' required id='seats_per_row' ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='link'>Stadium Image</label>
          <input type='url' required id='link' ref={imageInputRef} />
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