import '../css/componentsStyle/Purchased.css';


const Purchased = () => {
    return ( 
        <div className="purchased-container">
            <p style={{fontWeight: '700', color: 'black', fontSize: '18px', marginBottom:'5px', marginTop: '0'}}>Title goes here...</p>

            <div className='detailz'>
                <div className='detail-1'>
                    <p>Order ID:</p>
                    <p>Ticket ID:</p>
                    <p>Price:</p>
                </div>

                <div className='detail-2'>
                    <p>Order ID:</p>
                    <p>Ticket ID:</p>
                    <p>Price:</p>
                </div>

            </div>
           
        </div>
     );
}
 
export default Purchased;