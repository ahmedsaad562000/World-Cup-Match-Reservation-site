import MatchInfoItem from './MatchInfoItem';
import classes from './MeetupList.module.css';

function MatchInfoList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MatchInfoItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          stad_name={meetup.Sname}
          address={meetup.address}
          description={meetup.description}
        />
      ))}
    </ul>
  );
}

export default MatchInfoList;