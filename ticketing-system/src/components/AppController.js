
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from '../signup/SignUp'; 
import Login from '../login/Login';  
import News from '../news/News';
import HomePage from '../home/HomePage'; 
import MainEvent from '../events/MainEvent';
import UserAccount from '../user/UserAccount';
import Cart from '../cart/Cart';
import CustomerCare from '../contact/CustomerCare';
import UserTickets from '../user/UserTickets';


const AppController = () => {
    
    
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserAccount />} />
            <Route path="/events" element={<MainEvent />} />
            <Route path='/signup' element={<SignUp/>}> </Route>
            <Route path="/" element={<HomePage />} />   
            <Route path="/login" element={<Login />} />+
            <Route path="/customer-care" element={<CustomerCare />} />
            <Route path="/news" element={<News/>} />
            <Route  path='/purchased-tickets' element={<UserTickets/>}></Route>


        </Routes>
        </BrowserRouter>
    )
}
 
export default AppController