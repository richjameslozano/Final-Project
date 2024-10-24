import axios from 'axios'; // Import Axios to send HTTP requests
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal

const CartItem = ({ id, ticketname, date, place, image, time, price, onDelete }) => {
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8031/cart/${id}`);
      onDelete(id); // Call the onDelete function to update the UI in the parent
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className='main-cart-item'>
      <div className='cart-item-container'>
        <img className='item-image' src={image} alt={ticketname}></img>
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
              <div style={{ marginBottom: '10px' }}>Quantity:</div>
              <select
                className='select-quantity'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)} // Update quantity on change
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <div style={{ paddingTop: '10px', fontWeight: 700, fontSize: '22px', color: 'orange' }}>
                {price}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='trash-container' onClick={() => setIsModalOpen(true)}>
        <img className='trash-icon' src='/images/trash.png' alt='Delete'></img>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleDelete(); // Delete the item
          setIsModalOpen(false); // Close the modal
        }}
      />
    </div>
  );
};

export default CartItem;
