// src/news/EventDetails.js
import React from 'react';
import { Typography } from 'antd';
import '../css/news/UpcomingEventDetails.css';

const { Title, Paragraph } = Typography;

const UpcomingEventDetails = ({ event }) => {
  if (!event) return null; // Return null if no event is selected

  return (
    <div className="event-details">
      <Title level={3}>{event.title}</Title>
      <Paragraph><strong>Date:</strong> {event.date}</Paragraph>
      <Paragraph><strong>Description:</strong> {event.description}</Paragraph>

      {event.trailerUrl && (
        <div className="event-trailer">
          <iframe 
            width="100%" 
            height="315" 
            src={event.trailerUrl} 
            title={event.title}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default UpcomingEventDetails;
