import BouhgtTickets from './boughtTickets';
import classes from './MeetupList.module.css';

function TicketsList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <BouhgtTickets
          key={meetup.id}
          id={meetup.id}  // Match ID Est5dmha zy ma heya
          username={meetup.username}
          first_name={meetup.first_name}
          last_name={meetup.last_name}
          email={meetup.email}
          role={meetup.role}
        />
      ))}
    </ul>
  );
}

export default TicketsList;