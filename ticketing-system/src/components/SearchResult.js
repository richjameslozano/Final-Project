// src/components/SearchResult.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/componentsStyle/SearchResult.css'; // Optional: Create a CSS file for styling

const SearchResult = ({ searchTerm }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8031/search?query=${searchTerm}`);
                setResults(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching search results.');
                setLoading(false);
            }
        };

        if (searchTerm) {
            fetchResults();
        } else {
            setLoading(false);
        }
    }, [searchTerm]);

    if (loading) return <div>Loading results...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="search-result-container">
            {results.length === 0 ? (
                <div>No results found.</div>
            ) : (
                results.map((item) => (
                    <div key={item._id} className="search-result-item">
                        <img src={item.image} alt={item.name} />
                        <div className="search-result-info">
                            <h3>{item.name}</h3>
                            <p>{item.genre}</p>
                            <p>{item.price}</p>
                            <p>{item.date}</p>
                            <button>Add to Cart</button> {/* Add functionality as needed */}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchResult;
