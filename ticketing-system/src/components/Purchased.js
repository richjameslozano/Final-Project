import '../css/componentsStyle/Purchased.css';

const Purchased = ({ ticket, firstName, lastName }) => {
    const totalCost = ticket.price * ticket.quantity;

    return ( 
        <div className='outer-container'>
            <div className='title-top'>
                <h2 className='top-name'>{ticket.eventname}</h2>
            </div>
                
        <div className="purchased-container">

            <div className='detailz'>
                <div className='detail-1'>
                    <p ><span style={{fontWeight:'bold', fontSize: '15px', marginRight: '10px'}}>Order ID: </span> {ticket.orderId}</p>
                    <p ><span style={{fontWeight:'bold', fontSize: '15px', marginRight: '10px'}}>Ordered by: </span> {firstName} {lastName}</p>
                    <p ><span style={{fontWeight:'bold', fontSize: '15px', marginRight: '10px'}}>Mode of Payment:</span> {ticket.mop}</p>
                    <p></p>
                   
                    
                </div>
                
                <div className='detail-2'>
                    <p>{ticket.eventdate} </p>
                    <p>{ticket.eventtime}</p>
                    <p>{ticket.venue}</p>
                    
                </div>

                <div className='detail-3'>
                    <p><span style={{fontWeight:'bold', fontSize: '15px', marginRight: '10px'}}>Quantity:</span> {ticket.quantity}</p>
                    <p><span style={{fontWeight:'bold', fontSize: '15px', marginRight: '10px'}}>Price:</span> ₱{ticket.price}</p>
                    
                </div>

                <div className='detail-4'>
                    <p style={{ fontWeight: 'bold', marginLeft: '40px'}}>₱{totalCost}</p>
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default Purchased;
