import React, { useState } from 'react';
import { Button, Modal, message, notification } from 'antd';
import '../css/componentsStyle/SearchResult.css';
import axios from 'axios';

const SearchResult = ({ results }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const showModal = (item) => {
        console.log("Showing modal for:", item); // Debug log
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    };

    const handleAddToCart = async () => {
        const userID = localStorage.getItem("user");
    
        // Check if user is logged in
        if (!userID) {
            message.warning('You need to log in first!');
            handleCancel(); // Close the modal
            return; // Exit if no user is logged in
        }
    
        const userholder = JSON.parse(userID).id;
        const selectedItemId = selectedItem._id;
    
    
        try {
            // Check if the ticket is already in the cart
            const userResponse = await axios.get(`http://localhost:8031/user/${userholder}`);
            const userData = userResponse.data;
    
            if (userData.ticket.some(ticket => ticket._id === selectedItemId)) {
                message.warning('This ticket is already in your cart!');
                handleCancel(); // Close the modal
                return; // Exit if ticket is already in cart
            }
    
            // If not, add the item to the user's cart in MongoDB
            const addEventToUserResponse = await axios.post(`http://localhost:8031/user/${userholder}/add-ticket/${selectedItemId}`);
            console.log('Event added to user tickets:', addEventToUserResponse.data);
    
            // Show success message
            notification.success({
                message: 'Success',
                description: 'Item added to cart and tickets successfully!',
                placement: 'bottomRight',
            });
    
            handleCancel(); // Close the modal
    
        } catch (error) {
            console.error('Failed to add item to cart or user tickets:', error.response ? error.response.data : error.message);
            message.error('Failed to add movie to cart or tickets.');
        } finally {
            
        }
    };
    
    

    return (
        <div className="search-result-container">
            {results.length > 0 ? (
                results.map((item) => (
                    <div key={item._id} className="search-result-item">
                        {item.image && <img src={item.image} alt={item.name} />}
                        <div className="search-result-info">
                            <h3>{item.name}</h3>
                            <p>Genre: {item.genre || 'N/A'}</p>
                            <p>Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</p>
                            <Button onClick={() => showModal(item)}>Add to Cart</Button>
                        </div>
                    </div>
                ))
            ) : (
                <div className="no-results-message">No results found.</div>
            )}

            {selectedItem && (
                <Modal
                    title="Event Details"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" onClick={handleAddToCart}>Add to Cart</Button>,
                    ]}
                    className="custom-modal"
                    width={800}
                >
                    <div className="modal-content-container">
                        <div className="modal-image-container">
                            <img src={selectedItem.image} alt={selectedItem.name} />
                        </div>
                        <div className="modal-details-container">
                            <h1 className='item-title'>{selectedItem.name}</h1>
                            <hr style={{marginTop: '-20px', marginBottom: '40px', height: '1px', backgroundColor: '#37FD12', border: 'none'}} />
                            <p style={{color: 'orange', fontWeight: '700', marginTop: '-30px', fontSize:'30px', marginBottom: '70px'}}> {selectedItem.price || 'N/A'}</p>
                            <p><strong>Date:</strong> {selectedItem.date ? new Date(selectedItem.date).toLocaleDateString() : 'N/A'}</p>
                            <p><strong>Venue:</strong> {selectedItem.place || 'N/A'}</p>
                            <p><strong>Time:</strong> {selectedItem.time || 'N/A'}</p>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default SearchResult;
