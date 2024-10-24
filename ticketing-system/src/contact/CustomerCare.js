import '../css/CustomerCare.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Layout } from 'antd';

const CustomerCare = () => {

    return (
        <Layout>
            <Header></Header>
             
             <div className="main-container-customer">
                <div className='feedback-container'>
                    <div> FEED BACK AND INQUIRY</div>
                    <div>FEEDBACK 1</div>
                    <div>FEEDBACK 2</div>
                    Feed back and Inquiry
                </div>

                <div className='faq-container'>
                    Frequently Asked Question
                </div>
              
           
         </div>


            <Footer></Footer>
        </Layout>
        

    );
};

export default CustomerCare;
