import React from 'react';
import jsPDF from 'jspdf';
import '../css/componentsStyle/Purchased.css';

const Purchased = ({ ticket, firstName, lastName }) => {
    const totalCost = ticket.price * ticket.quantity;

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        
        // Load logo from the public folder
        const logo = new Image();
        logo.src = `${process.env.PUBLIC_URL}/images/onepixel.png`;

        logo.onload = () => {
            let yPosition = 10; // Start y-position for the first card

            for (let i = 0; i < ticket.quantity; i++) {
                // Add logo for each card
                doc.addImage(logo, 'PNG', 10, yPosition, 30, 30); // Adjust as needed

                // Card Border and Title
                doc.setLineWidth(0.5);
                doc.rect(10, yPosition + 35, 190, 120); // Rectangle for card layout
                doc.setFontSize(20);
                doc.text("ONEPIXEL.TICKET", 80, yPosition + 20);
                doc.text(ticket.eventname, 70, yPosition + 30);

                // Add Ticket Details
                doc.setFontSize(12);
                doc.text(`Order ID: ${ticket.orderId}`, 20, yPosition + 50);
                doc.text(`Ordered by: ${firstName} ${lastName}`, 20, yPosition + 60);
                doc.text(`Mode of Payment: ${ticket.mop}`, 20, yPosition + 70);
                doc.text(`Event Date: ${ticket.eventdate}`, 20, yPosition + 80);
                doc.text(`Event Time: ${ticket.eventtime}`, 20, yPosition + 90);
                doc.text(`Venue: ${ticket.venue}`, 20, yPosition + 100);
                doc.text(`Quantity: 1`, 20, yPosition + 110); // Each card represents one ticket
                doc.text(`Price per Ticket: ₱${ticket.price}`, 20, yPosition + 120);
                doc.text(`Total Cost: ₱${ticket.price}`, 20, yPosition + 130); // Display price per ticket on each card

                // Additional styling for Total Cost
                doc.setFontSize(14);
                doc.setTextColor(255, 0, 0); // Red color for emphasis
                doc.text(`Total: ₱${ticket.price}`, 20, yPosition + 140);

                // Adjust yPosition for the next card
                yPosition += 160; // Space between each card
            }

            // Save the PDF
            doc.save(`${ticket.eventname}_tickets.pdf`);
        };
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
