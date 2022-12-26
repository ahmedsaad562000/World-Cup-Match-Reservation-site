// import Todo from "./Todo";

import { Route, Routes } from 'react-router-dom';

import AllMeetupsPage from "./pages/AllMeetups";
import NewStaium from "./pages/NewStadium";
import Login from "./pages/Login";
import MatchesPage from "./pages/Matches"
import Profile from "./pages/Profile"
import NewMatch from "./pages/NewMatch"
import YourTickets from "./pages/YourTickets"
import Layout from "./Components/layout/Layout"


function App() {
  /* Confirmation code */
  // return (
  //   <div>
  //     <Todo text='Group Stage' text1='Moroco' />
  //     <Todo text='Round Of 16' text1='Tunisia' />
  //     <Todo text='Qaurter Final' text1='Egypt' />
  //   </div>
  // );

  /*Routing Code */
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<AllMeetupsPage />} />
        <Route path='/new-stadium' element={<NewStaium />} />
        <Route path='/Matches' element={<MatchesPage />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/NewMatch' element={<NewMatch />} />
        <Route path='/YourTickets' element={<YourTickets />} />
      </Routes>
    </Layout>
  );

}

export default App;