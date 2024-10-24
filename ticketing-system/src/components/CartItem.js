import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import ConfirmationModal from './ConfirmationModal'; 

const CartItem = ({ id, ticketname, date, place, image, time, price, quantity, onDelete, onQuantityChange }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState(price * quantity); // Calculate initial total price
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onQuantityChangeRef = useRef(onQuantityChange); // Use ref to store the handler

  useEffect(() => {
    console.log(`Price for ${ticketname}: `, price); // Log price for debugging

    // Calculate new total price
    const newTotalPrice = price * selectedQuantity;
    setTotalPrice(newTotalPrice);

    // Call the onQuantityChangeRef instead of onQuantityChange directly to avoid re-render
    onQuantityChangeRef.current(id, selectedQuantity, newTotalPrice); 
  }, [selectedQuantity, id, price]); // Remove onQuantityChange from the dependency array

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8031/cart/${id}`);
      onDelete(id); 
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className='main-cart-item'>
      <div className='cart-item-container'>
        <img className='item-image' src={image} alt={ticketname} />
        <div className='main-item-details'>
          <div className='ticket-title'>{ticketname}</div>
          <hr className='hr' />
          <div className='ticket-details'>
            <div className='detail-one'>
              <div>{date}</div>
              <div>{place}</div>
              <div>{time}</div>
            </div>
            <div className='detail-two'>
              <div style={{ marginBottom: '10px' }}>Quantity:</div>
              <select
                className='select-quantity'
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))} // Ensure quantity is a number
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <div style={{ paddingTop: '10px', fontWeight: 700, fontSize: '22px', color: 'orange' }}>
                ${totalPrice.toFixed(2)} {/* Display total price */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='trash-container' onClick={() => setIsModalOpen(true)}>
        <img className='trash-icon' src='/images/trash.png' alt='Delete' />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleDelete(); 
          setIsModalOpen(false); 
        }}
      />
    </div>
  );
};

export default CartItem;
