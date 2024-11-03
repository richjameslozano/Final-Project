import { useState, useEffect } from 'react';
import { message, notification } from 'antd';
import ConfirmationModal from './ConfirmationModal';
import '../css/componentsStyle/Header.css'; 
import axios from 'axios'

const CartItem = ({
  id,
  ticketname,
  date,
  place,
  image,
  time,
  price,
  quantity,
  onDelete,
  onQuantityChange,
  userholder,
  eventId
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update the total cost whenever quantity changes
  useEffect(() => {
    onQuantityChange(id, selectedQuantity);
  }, [selectedQuantity, id, onQuantityChange]);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleQuantityChange = async (newQuantity) => {
    setSelectedQuantity(newQuantity);

    const userId = JSON.parse(localStorage.getItem("user")).id;

    try {
        await axios.put(`http://localhost:8031/user/${userId}/update-ticket/${id}`, {
            quantity: newQuantity,
        });
        // notification.success({
        //     message: 'Success',
        //     description: 'Quantity updated successfully!',
        //     placement: 'bottomRight',
        // });
    } catch (error) {
        console.error('Failed to update quantity:', error);
        message.error('Failed to update quantity.');
    }
};


  return (
    <div className="main-cart-item">
      <div className="cart-item-container">
        <img className="item-image" src={image} alt={ticketname} />
        <div className="main-item-details">
          <div className="ticket-title">{ticketname}</div>
          <hr className="hr" />
          <div className="ticket-details">
            <div className="detail-one">
              <div>{date}</div>
              <div>{place}</div>
              <div>{time}</div>
            </div>
            <div className="detail-two">
              <div style={{ marginBottom: '10px' }}>Quantity:</div>
              <select
                className="select-quantity"
                value={selectedQuantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <div
                style={{
                  paddingTop: '10px',
                  fontWeight: 700,
                  fontSize: '22px',
                  color: 'orange',
                }}
              >
                ₱{(price * selectedQuantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trash-container" onClick={() => setIsModalOpen(true)}>
        <img className="trash-icon" src="/images/trash.png" alt="Delete" />
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
