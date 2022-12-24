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
      Sname: enteredName,
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
          <label htmlFor='Sname'><span className={classes.vip}>Stadium</span> Name</label>
          <input type='text' required id='Sname' ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='title'><span className={classes.vip}>VIP</span> Lounge Rows</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Row Number Of Seats</label>
          <input type='text' required id='address' ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Stadium Image</label>
          <input type='url' required id='image' ref={imageInputRef} />
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