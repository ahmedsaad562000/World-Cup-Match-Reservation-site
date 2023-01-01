import MatchInfoItem from './MatchInfoItem';
import classes from './MeetupList.module.css';

function MatchInfoList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MatchInfoItem
          // key={meetup.id}
          id={meetup.id}  // Match ID Est5dmha zy ma heya
          H_team={meetup.H_team}
          A_team={meetup.A_team}
          Stadium={meetup.Stadium}
          date={meetup.date}
          time={meetup.time}
          refree={meetup.refree}
          line1={meetup.line1}
          line2={meetup.line2}
        />
      ))}
    </ul>
  );
}

export default MatchInfoList;