import '../css/componentsStyle/Purchased.css';

const Purchased = ({ ticket, firstName, lastName }) => {
    return ( 
        <div className="purchased-container">
            <p style={{fontWeight: '700', color: 'black', fontSize: '18px', marginBottom:'5px', marginTop: '0'}}>
                <h3>{ticket.eventname}</h3>
            </p>

            <div className='detailz'>
                <div className='detail-1'>
                    <p>Ticket Owner: {firstName} {lastName}</p>
                    <p>Order ID: {ticket.orderId}</p>
                    <p>Event Date: {ticket.eventdate}</p>
                    <p>Event Time: {ticket.eventtime}</p>
                    <p>Venue: {ticket.venue}</p>
                    <p>Mode of Payment: {ticket.mop}</p>
                    <p>Price: {ticket.price}</p>
                    <p>Quantity: {ticket.quantity}</p>
                </div>
                
                <div className='detail-2'>

                </div>
            </div>
        </div>
    );
}

export default Purchased;
