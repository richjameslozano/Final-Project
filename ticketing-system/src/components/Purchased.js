import React from 'react';
import jsPDF from 'jspdf';
import '../css/componentsStyle/Purchased.css';

const Purchased = ({ ticket, firstName, lastName }) => {
    const totalCost = ticket.price * ticket.quantity;

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
    
        // Load logo from the public folder
        const logo = new Image();
        logo.src = `${process.env.PUBLIC_URL}/images/HomeImages/ONEPIXEL-LOGO-BLACK.png`;

        const barcode = new Image()
        barcode.src = `${process.env.PUBLIC_URL}/images/qr.png`;

        const cut = new Image();
        cut.src= `${process.env.PUBLIC_URL}/images/cut.png`;

    
        logo.onload = () => {
            // Add logo and main title at the top of the PDF
            doc.addImage(logo, 'PNG', 10, 10, 20, 20); // Smaller logo for compact layout
            doc.setFontSize(20);
            doc.setFont("Times", "bold");
            doc.text("ONEPIXEL.TICKET", 35, 20);
    
            // Title and event name
            doc.setFontSize(14);
            doc.setFont("helvetica", "regular");
            doc.text(ticket.eventname, 35, 30);
    
            // Initial y-position for the first card, adjusted after the header
            let yPosition = 40;
    
            // Loop through quantity to create multiple ticket cards
            for (let i = 0; i < ticket.quantity; i++) {
                // Card border
                doc.setLineWidth(0.3);
                doc.setDrawColor(150); // Light gray border
                doc.rect(10, yPosition, 190, 70); // Compact card dimensions
    
                // Ticket details
                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(0, 0, 0); // Reset color to black
    
                // Section 1 - Basic Info
                doc.text(`Order ID: ${ticket.orderId}`, 15, yPosition + 10);
                doc.text(`Ordered by: ${firstName} ${lastName}`, 15, yPosition + 18);
                doc.text(`Mode of Payment: ${ticket.mop}`, 15, yPosition + 26);
    
                // Section 2 - Event Details
                doc.text(`Event Date: ${ticket.eventdate}`, 15, yPosition + 42);
                doc.text(`Event Time: ${ticket.eventtime}`, 15, yPosition + 34);
                doc.text(`Venue: ${ticket.venue}`, 15, yPosition + 50);
    
                // Section 3 - Pricing
                doc.text(`Quantity: 1`, 15, yPosition + 58); // Display each card as one ticket
                doc.text(`Price per Ticket: ₱${ticket.price}`, 130, yPosition+8);
    
                // Total Cost (emphasized in bold and color)
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.setTextColor(0, 100, 0); // Green color for emphasis
                doc.text(`Total: ₱${ticket.price}`, 152, yPosition + 65);

                doc.addImage(barcode, 'PNG', 145, yPosition + 10, 50, 50);
                doc.addImage(cut, 'PNG', 90, yPosition + 5, 60, 60);
    
                // Adjust yPosition for the next card
                yPosition += 80; // Space between each card
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
