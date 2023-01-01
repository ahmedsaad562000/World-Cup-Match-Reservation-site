import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <MainNavigation Ticketsnum={props.TicketsNum} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;