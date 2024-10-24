


const CartItem = ({ticketname, date, place, image, time, price}) => {

    
    return ( 
        <div className='main-cart-item'>
        <div className='cart-item-container'>
                <img className='item-image' src={image}></img>
                  <div className='main-item-details'>
                    <div className='ticket-title'>{ticketname}</div>
                    <hr className='hr'></hr>
                            <div className='ticket-details'>
                                  <div className='detail-one'>
                                    <div>{date}</div>
                                    <div>{place}</div>
                                    <div>{time}</div>
                                  </div>
                                  <div className='detail-two'>
                                    <div style={{marginBottom: '10px'}}>Quantity:</div>
                                      <select className='select-quantity'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                      </select>
                                    <div style={{paddingTop: '10px', fontWeight: 700, fontSize: '22px', color: 'orange'}}>{price}</div>
                                  </div>
                            </div>     
                  </div>   
              </div>

              <div className='trash-container'>
                <img className='trash-icon' src='/images/trash.png'></img>
              </div>
        </div>
     );
}
 
export default CartItem;
