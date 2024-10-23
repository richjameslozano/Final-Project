
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from '../signup/SignUp'; 
import Login from '../login/Login';  
import ContactUs from '../contact/ContactUs';
import ConcertList from '../events/concerts/ConcertList';
import ConcertDetails from '../events/concerts/ConcertDetails';
import MovieList from '../events/movies/MovieList';
import UpcomingMovies from '../news/UpcomingMovies';
import UpcomingMovieTrailer from '../news/UpcomingMoviesTrailer';
import UpcomingEvents from '../news/UpcomingEvents';
import MovieDetails from '../events/movies/MovieDetails';
import MovieSeats from '../events/movies/MovieSeats';
import HomePage from '../home/HomePage'; 

const AppController = () => {
    return (
        <BrowserRouter>
        <Routes>
       
            <Route path='/signup' element={<SignUp/>}> </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/concerts" element={<ConcertList />} />
            <Route path="/concert-details" element={<ConcertDetails />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movie-details" element={<MovieDetails />} />
            <Route path="/movie-seats" element={<MovieSeats />} />
            <Route path="/upcoming-events" element={<UpcomingEvents />} />
            <Route path="/upcoming-movies" element={<UpcomingMovies />} />
            <Route path="/trailer" element={<UpcomingMovieTrailer />} />
 
        </Routes>
        </BrowserRouter>
    )
}
 
export default AppController