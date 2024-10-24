import '../css/CustomerCare.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CustomerCare = () => {

    return (
        <div>
            <div className="customer-care-container1">
                <Header/>
                <h1 className='h1Text'>Customer Care</h1>
                <p>If you have any questions or concerns, feel free to reach out to us.</p>
                
                <div className="contact-info1">
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> support@example.com</p>
                    <p><strong>Phone:</strong> (123) 456-7890</p>
                </div>

                <div className="faq">
                    <h2 className='h2Text'>Frequently Asked Questions</h2>
                    <ul className='ulText'>
                        <li className='liText'><strong className='strongText'>Q:</strong> How can I reset my password?</li>
                        <li className='liText'><strong className='strongText'>A:</strong> You can reset your password by clicking on "Forgot Password" on the login page.</li>

                        <li className='liText'><strong className='strongText'>Q:</strong> How can I contact support?</li>
                        <li className='liText'><strong className='strongText'>A:</strong> You can reach us via email or phone as listed above.</li>

                        <li className='liText'><strong className='strongText'>Q:</strong> Where can I find the terms and conditions?</li>
                        <li className='liText'><strong className='strongText'>A:</strong> The terms and conditions can be found in the footer of our website.</li>
                    </ul>
                </div>

                
            </div>
            <Footer/>
        </div>

    );
};

export default CustomerCare;
