import axios from 'axios';
import { useState } from 'react';
import { message } from 'antd';
import ConfirmationModal from './ConfirmationModal'; 

const CartItem = ({ id, ticketname, date, place, image, time, price, quantity, onDelete, onQuantityChange }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update quantity and total price in the parent component
  const handleQuantityChange = (newQuantity) => {
    setSelectedQuantity(newQuantity);
    onQuantityChange(id, newQuantity, price * newQuantity); // Call the parent's quantity change function
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8031/cart/${id}`);
      console.log('Item deleted successfully');
      onDelete(id);
      
      // Show success message using Ant Design's message
      message.success(`Successfully Deleted ${ticketname}`);
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
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <div style={{ paddingTop: '10px', fontWeight: 700, fontSize: '22px', color: 'orange' }}>
                ₱{(price * selectedQuantity).toFixed(2)}
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
