// src/components/UpcomingEvents.js
import React, { useState } from 'react';
import { Card, Modal } from 'antd';
import '../../src/css/news/UpcomingEvents.css';
import Header from '../components/Header';
import EventDetails from '../news/UpcomingEventDetails'; // Replace with actual path for the event details component

const events = [
  { 
    title: 'Concert at the Park', 
    date: '2024-11-20', 
    poster: '/images/event1.jpg', 
    trailerUrl: 'https://www.youtube.com/embed/example', 
    description: 'A spectacular concert featuring various artists at the city park.' 
  },
  { 
    title: 'Art Exhibition', 
    date: '2024-11-25', 
    poster: '/images/event2.jpg',
    trailerUrl: 'https://www.youtube.com/embed/example2',
    description: 'Explore contemporary art at the annual art exhibition.' 
  },
];

const UpcomingEvents = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedEvent(null); // Reset selectedEvent when closing modal
  };

  return (
    <div className="upcoming-events">
      <Header />
      <h2>UPCOMING EVENTS</h2>
      <div className="event-grid">
        {events.map((event, index) => (
          <Card
            className="event-card"
            key={index}
            hoverable
            onClick={() => handleCardClick(event)}
          >
            <img src={event.poster} alt={event.title} className="event-poster" />
            <div className="event-title">{event.title}</div>
            <div className="event-date">{event.date}</div>
          </Card>
        ))}
      </div>

      <Modal
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
        width={800}
      >
        {selectedEvent && (
          <EventDetails event={selectedEvent} isVisible={isModalVisible} />
        )}
      </Modal>
    </div>
  );
};

export default UpcomingEvents;
