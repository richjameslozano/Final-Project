import { Layout } from "antd";
import Header from "../components/Header";
import Footer from "../components/Footer";




const News = () =>{

    return(
        <Layout>
        <Header></Header>
        <div>
           <div className='slider-event-bg' style={{ backgroundImage: 'url(/images/bg4.jpg)' }}></div>

            <h2 className='title-main-events'>NEWS</h2>  <div>

            </div>
        </div>

        <Footer></Footer>
        </Layout>
    )

}
export default News;