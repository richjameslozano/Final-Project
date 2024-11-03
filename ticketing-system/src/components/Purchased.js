import React from 'react';
import jsPDF from 'jspdf';
import '../css/componentsStyle/Purchased.css';

const Purchased = ({ ticket, firstName, lastName }) => {
    const totalCost = ticket.price * ticket.quantity;

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Add Logo
        doc.addImage('/images/onepixel.png', 'PNG', 10, 10, 30, 30); // Position and scale logo as needed

        // Card Border and Title
        doc.setLineWidth(0.5);
        doc.rect(10, 45, 190, 120); // Creates a rectangle for a card-like layout
        doc.setFontSize(20);
        doc.text("ONEPIXEL.TICKET", 80, 20);
        doc.text(ticket.eventname, 70, 30);

        // Add Ticket Details in a Card Format
        doc.setFontSize(12);
        doc.text(`Order ID: ${ticket.orderId}`, 20, 60);
        doc.text(`Ordered by: ${firstName} ${lastName}`, 20, 70);
        doc.text(`Mode of Payment: ${ticket.mop}`, 20, 80);
        doc.text(`Event Date: ${ticket.eventdate}`, 20, 90);
        doc.text(`Event Time: ${ticket.eventtime}`, 20, 100);
        doc.text(`Venue: ${ticket.venue}`, 20, 110);
        doc.text(`Quantity: ${ticket.quantity}`, 20, 120);
        doc.text(`Price per Ticket: ₱${ticket.price}`, 20, 130);
        doc.text(`Total Cost: ₱${totalCost}`, 20, 140);

        // Additional styling for Total Cost
        doc.setFontSize(14);
        doc.setTextColor(255, 0, 0); // Red color for emphasis
        doc.text(`Total: ₱${totalCost}`, 20, 160);

        // Save the PDF
        doc.save(`${ticket.eventname}_ticket.pdf`);
    };

    return (
        <div className='outer-container'>
            <div className='title-top'>
                <h2 className='top-name'>{ticket.eventname}</h2>
            </div>
            
            <div className="purchased-container">
                <div className='detailz'>
                    <div className='detail-1'>
                        <p><span style={{fontWeight: 'bold', fontSize: '15px', marginRight: '10px'}}>Order ID:</span> {ticket.orderId}</p>
                        <p><span style={{fontWeight: 'bold', fontSize: '15px', marginRight: '10px'}}>Ordered by:</span> {firstName} {lastName}</p>
                        <p><span style={{fontWeight: 'bold', fontSize: '15px', marginRight: '10px'}}>Mode of Payment:</span> {ticket.mop}</p>
                    </div>
                    <div className='detail-2'>
                        <p>{ticket.eventdate}</p>
                        <p>{ticket.eventtime}</p>
                        <p>{ticket.venue}</p>
                    </div>
                    <div className='detail-3'>
                        <p><span style={{fontWeight: 'bold', fontSize: '15px', marginRight: '10px'}}>Quantity:</span> {ticket.quantity}</p>
                        <p><span style={{fontWeight: 'bold', fontSize: '15px', marginRight: '10px'}}>Price:</span> ₱{ticket.price}</p>
                    </div>
                    <div className='detail-4'>
                        <p style={{ fontWeight: 'bold', marginLeft: '40px'}}>₱{totalCost}</p>
                    </div>
                </div>
            </div>
            <button onClick={handleDownloadPDF} className="download-btn">Download as PDF</button>
        </div>
    );
};

export default Purchased;
