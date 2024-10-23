import '../css/componentsStyle/Footer.css';
const Footer = () => {
    return(
        <div className="footer-container" style={{backgroundImage: 'url(/images/HomeImages/footer-bg.png)'}}>
            <div className='footer-details-container'>
                <div className='about-us-container'>
                    <h1 className='footer-title'>About us</h1>
                    <div>Who we are</div>
                    <div>Our Mission & Vision</div>
                </div>
                <div className='customer-care-container'>
                    <h1 className='footer-title'>Customer Care</h1>
                    <div>Feedback & Inquiry</div>
                    <div>FAQs</div>
                    <div>Calendar of Events</div>
                </div>
                <div className='partnerships-container'>
                    <h1 className='footer-title'>Partnerships</h1>
                    <div>National University - MOA</div>
                    <div>Mark Anthony Gipit</div>
                    <div>ChatGPT</div>
                </div>
                <div className='ticket-outlets-container'>
                    <h1 className='footer-title'>Ticket Outlets</h1>
                        <div>NU MOA</div>
                        <div>NU Dasmarinas</div>
                        <div>NU Clark</div>
                        <div>NU Laguna</div>
                        <div>NU Manila</div>
                        <div>NU Fairview</div>
                        <div>NU Lipa</div>
                        <div>NU Bacolod</div>
        
                </div>
            </div>
        </div>
    );
}

export default Footer;