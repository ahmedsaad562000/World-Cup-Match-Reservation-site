import BouhgtTickets from './boughtTickets';
import classes from './MeetupList.module.css';

function TicketsList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <BouhgtTickets
          id={meetup.id}  // Match ID Est5dmha zy ma heya
          match={meetup.match_info}
          row={meetup.row}
          seat={meetup.seat}
        />
      ))}
    </ul>
  );
}

export default TicketsList;