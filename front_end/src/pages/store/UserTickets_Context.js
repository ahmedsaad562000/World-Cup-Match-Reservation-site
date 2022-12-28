import { createContext, useState } from 'react';

const TicketsContext = createContext({
  tickets: [],
  totaltickets: 0,
  addTicket: (boughtTicket) => {},
  removeTicket: (matchID) => {},
  itemIsBought: (matchID) => {}
});

export function TicketsContextProvider(props) {
  const [userTickets, setUserTickets] = useState([]);

  function addTicketeHandler(boughtTicket) {
    setUserTickets((prevUserTickets) => {
      return prevUserTickets.concat(boughtTicket);
    });
  }

  function removeTicketeHandler(matchID) {
    setUserTickets(prevUserTickets => {
        // meetup.id is the match id
      return prevUserTickets.filter(meetup => meetup.id !== matchID);
    });
  }

  function itemIsTicketHandler(matchID) {
    // meetup.id is the match id
    return userTickets.some(meetup => meetup.id === matchID);
  }

  const context = {
    tickets: userTickets,
    totaltickets: userTickets.length,
    addTicket: addTicketeHandler,
    removeTicket: removeTicketeHandler,
    itemIsBought: itemIsTicketHandler
  };

  return (
    <TicketsContext.Provider value={context}>
      {props.children}
    </TicketsContext.Provider>
  );
}

export default TicketsContext;