import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import '../css/componentsStyle/SearchResult.css';

const SearchResult = ({ results }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Show modal and set selected item
    const showModal = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    // Handle modal close
    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    };

    // Handle Add to Cart with login and duplicate check
    const handleAddToCart = () => {
        const userID = localStorage.getItem("user");
        if (!userID) {
            message.warning('You need to log in first!');
            handleCancel();
            return;
        }

        // Check if cart exists in localStorage, if not, initialize it
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if selectedItem is already in the cart
        const itemExists = cart.some((cartItem) => cartItem._id === selectedItem._id);
        
        if (itemExists) {
            message.info('Item already exists in cart!');
        } else {
            // Add the item to the cart and update localStorage
            cart.push(selectedItem);
            localStorage.setItem("cart", JSON.stringify(cart));
            message.success('Item added to cart!');
        }

        handleCancel();
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
