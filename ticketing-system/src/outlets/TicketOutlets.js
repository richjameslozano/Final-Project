// src/components/Outlets.js
import React from 'react';
import '../css/outlets/TicketOutlets.css'
import Header from '../components/Header';

const TicketOutlets = () => {
    return (
        <div className="outlets-container">
            <Header/>
            <h2>SM TICKET OUTLETS</h2>
            <p>
                SM Tickets has outlets in <strong>SM Cinema branches</strong> (ticket booth), select <strong>The SM Store</strong> (SM Department Store) branches, and <strong>Eastwood Mall</strong>, as well as at the box office of <strong>Mall of Asia Arena</strong>.
            </p>
            
            <div className="outlet-section">
                <img src='images/olivia.jpg' alt="Mall of Asia Arena Logo" className="outlet-logo" />
                <h3>SM Mall of Asia Arena Box Office (Cash and Card Transactions)</h3>
                <div className="outlet-details">
                    <div className="outlet-location">
                        <strong>Marina Way</strong>
                        <p>Box office hours: 10:00AM until 7:00PM end time of event</p>
                    </div>
                    <div className="outlet-location">
                        <strong>Coral Way</strong>
                        <p>Box office hours: 10:00AM until 7:00PM end time of event</p>
                    </div>
                </div>
            </div>

            <div className="outlet-section">
                <img src='images/olivia.jpg' alt="SM Cinema Logo" className="outlet-logo" />
                <h3>SM Cinema Outlets (Cash and Card Transactions)</h3>
                <input type="text" placeholder="Search for SM Cinema Outlet" className="search-bar" />
                <div className="outlet-details">
                    <div className="outlet-location">
                        <strong>Angono</strong>
                        <p>2/F SM Center Angono, Manila East Road, Brgy. San Isidro, 1930 Angono, Rizal</p>
                    </div>
                    {/* Add more outlet-location divs for additional locations */}
                </div>
            </div>
        </div>
    );
};

export default TicketOutlets;
