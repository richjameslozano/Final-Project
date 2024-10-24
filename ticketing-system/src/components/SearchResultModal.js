// src/components/SearchResultModal.js
import React from 'react';
import { Modal } from 'antd'; // Example using Ant Design Modal

const SearchResultModal = ({ visible, results, onClose }) => {
    return (
        <Modal
            title="Search Results"
            visible={visible}
            onCancel={onClose}
            footer={null} // Customize footer as needed
        >
            {results.length === 0 ? (
                <p>No results found.</p>
            ) : (
                <ul>
                    {results.map((item) => (
                        <li key={item.id}>{item.name}</li> // Adjust based on your data structure
                    ))}
                </ul>
            )}
        </Modal>
    );
};


export default SearchResultModal;
