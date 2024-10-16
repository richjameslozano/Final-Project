import React, { useState } from 'react';
import { Button, Typography, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../css/events/movies/MovieDetails.css';
import Header from '../../components/Header';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const MovieDetails = () => {
  const navigate = useNavigate();

  // Step 1: Use useState to define your showtimes with titles
  const [showtimes] = useState([
    {
      cinema: "Light Residences",
      date: "Wednesday, 16 October 2024",
      times: [
        { time: "12:30 PM", title: "Joker: Folie A Deux" },
        { time: "06:00 PM", title: "Joker: Folie A Deux" },
      ],
    },
    {
      cinema: "Mall of Asia",
      date: "Wednesday, 16 October 2024",
      times: [
        { time: "01:00 PM", title: "Joker: Folie A Deux" },
        { time: "08:00 PM", title: "Some Other Movie Title" },
      ],
    },
    // Add more cinemas and their showtimes here
  ]);

  const handleTimeClick = (location, date, time, title) => {
    const movieData = {
      title, // Using the title passed in
      location,
      date,
      time,
    };
    navigate('/movie-seats', { state: { movie: movieData } });
  };

  return (
    <div className="movie-details-all-cinema">
      <Header />
      <div className="movie-header">
        <img src="/images/ff1.jpg" alt="Movie Poster" className="movie-poster" />
        <div className="movie-info">
          <Title level={2}>Joker: Folie A Deux</Title>
          <Paragraph>Failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while in Arkham State Hospital. Upon release, the pair embark on a doomed romantic misadventure.</Paragraph>
          <div className="movie-meta">
            <p><strong>Cast:</strong> Joaquin Phoenix, Lady Gaga, Zazie Beetz</p>
            <p><strong>Run Time:</strong> 2hr 20min</p>
            <p><strong>Genre:</strong> Thriller</p>
          </div>
        </div>
      </div>

      <div className="cinema-selection">
        <div className="logo-section">
          <img src="/images/2d-logo.png" alt="2D Logo" className="cinema-logo" />
          <img src="/images/directors-club-logo.png" alt="Director's Club Logo" className="cinema-logo" />
          <img src="/images/imax-logo.png" alt="IMAX Logo" className="cinema-logo" />
        </div>

        <div className="showtime-section">
          <Title level={3}>Joker: Folie A Deux Show Times</Title>
          <Select 
            showSearch
            placeholder="Search Cinemas..."
            className="cinema-search"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {showtimes.map((showtime, index) => (
              <Option key={index} value={showtime.cinema}>{showtime.cinema}</Option>
            ))}
          </Select>

          {/* Step 2: Map through the showtimes */}
          {showtimes.map((showtime, index) => (
            <div key={index} className="cinema-schedule">
              <div className="cinema-name">{showtime.cinema}</div>
              <div className="show-date">{showtime.date}</div>
              <div className="showtimes">
                {showtime.times.map((showtimeObj, timeIndex) => (
                  <Button 
                    key={timeIndex} 
                    type="default" 
                    onClick={() => handleTimeClick(showtime.cinema, showtime.date, showtimeObj.time, showtimeObj.title)}
                  >
                    {showtimeObj.time}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
