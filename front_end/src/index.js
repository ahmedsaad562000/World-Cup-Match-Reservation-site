import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { TicketsContextProvider } from './pages/store/UserTickets_Context';

/**Routing */
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TicketsContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TicketsContextProvider>
);


