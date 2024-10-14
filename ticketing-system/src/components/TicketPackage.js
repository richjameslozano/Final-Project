// TicketPackage.js
import React from 'react';
import { Card } from 'antd';
import '../css/componentsStyle/TickektPackage.css';


const TicketPackage = ({ ticket }) => {
  return (
    <div className="ticket-package">
      <Card className="ticket-info">
        <p>{ticket.location}</p>
        <span>{ticket.type}</span>
      </Card>
      <div className="ticket-price">
        <p>{ticket.price}</p>
      </div>
    </div>
  );
};

export default TicketPackage;
