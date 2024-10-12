import React from 'react';
import '../css/Contact.css'; 
import Header from '../components/Header';

const ContactUs = () => {
  return (
    <div className="faq-container">
        <Header/>
      <h1>FAQs</h1>
      <div className="faq-item">
        <h2>How to purchase Tickets?</h2>
        <ul>
          <li>
            You may purchase at any SM Ticket Outlets at selected SM Cinema, SM Store 
            (Customer Service), SM Bowling, SM Skating, Eastwood Mall, Lucky Chinatown 
            Mall concierge, and at the SM Mall of Asia Arena Coral Ticket Booth (outlet 
            online link) and online via SMTICKETS.COM.
          </li>
        </ul>
      </div>
      <div className="faq-item">
        <h2>How to purchase Tickets online?</h2>
        <ul>
          <li>Go to www.smtickets.com.</li>
          <li>Login or sign up.</li>
          <li>Click “Select events” and search for the event you are looking for, then click “Go”.</li>
          <li>Select your desired section and seat/s then click “Add”.</li>
          <li>Review your order summary.</li>
          <li>Choose your payment method: Debit/Credit Card: Visa and MasterCard, GCash, Maya, and GrabPay.</li>
          <li>Agree to full Terms & Conditions and Data Privacy Policy.</li>
          <li>Click “Proceed to payment”.</li>
          <li>Enter your payment information, then click proceed.</li>
          <li>Once successful, tickets will appear under My Account, My Tickets.</li>
          <li>E-Tickets will appear under My Account (My Tickets), My E-Tickets.</li>
        </ul>
      </div>
    </div>
  );
};

export default ContactUs;
