
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from '../signup/SignUp'; 



const AppController = () => {
    return (
        <BrowserRouter>
        <Routes>
       
            <Route path='/users' element={<SignUp/>}> </Route>
        
 
        </Routes>
        </BrowserRouter>
    )
}
 
export default AppController