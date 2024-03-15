import React from "react";
import Layout from "../components/layout/Layout";
import Logo from "../images/logo.png"
import Profile from "../images/profile-admin.jpeg"
import Profile1 from "../images/SundaiPichai.jpg"
import Profile2 from "../images/Elon musk.jpg"

const About = () => {
  return (
    <Layout title={"About us - CEASAR STORES"}>
      <div className="d-flex justify-content-center">
        <img
          src={Logo}
          alt="logo"
          className="about-us-image"
        />
      </div>
      <div className="about-us-description">
        <img
          src={Profile}
          alt="logo"
          className="about-us-image"
        />
      </div>
      <div className="about-us-description mb-5">
        <h1>Lingutla Likhith Kumar </h1>
        <p>Founder  Of  <b>CEASAR STORES</b></p>
      </div>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="about-us-description">
              <img
                src={Profile1}
                alt="logo"
                className="about-us-image"
              />
            </div>
            <div className="about-us-description">
              <h1>Sundar Pichai</h1>
              <p> CEO  Of  <b>CEASAR STORES</b></p>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="about-us-description">
              <img
                src={Profile2}
                alt="logo"
                className="about-us-image"
              />
            </div>
            <div className="about-us-description">
              <h1>Elon Musk</h1>
              <p>Co - Founder  Of  <b>CEASAR STORES</b></p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center notExisting">Our Top Brands</h1>
      <div className="notExisting">
        <marquee>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4fKOS5BxaQ2ngfzcgmg3zsT0nmAWRtZoruC_XbVberP3RVMl-M2-h1rAH5Zpbmn4PSrk&usqp=CAU" alt="Puma" className="about-us-image" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtiHbDu7DuXpxqT8zS9yzUWNtvL-JNJa3KAw&usqp=CAU" alt="Wrogn" className="about-us-image" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwx2N2_C93rIqM-ortlC5qkQR-PGMroXKg_poHIwLk9vKup1yZz9ZnFCJgiN6-IVRuESE&usqp=CAU" alt="Uspa" className="about-us-image" />
          <img src="https://media.designrush.com/inspiration_images/292255/conversions/levi_logo_4_82250bd000e1-mobile.jpg" alt="Levis" className="about-us-image" />
          <img src="https://1000logos.net/wp-content/uploads/2020/05/Wrangler-Logo-1947.jpg" alt="Wrangler" className="about-us-image" />
          <img src="https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg" alt="adidas" className="about-us-image" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAK0rgQ05B21w1SLCIqKFIy0zXD8HomlYse2sLswnzbbpitzUz73X1fjTjCCS5lZZ6b7Y&usqp=CAU" alt="benetton" className="about-us-image" />
          <img src="https://logomakerr.ai/blog/wp-content/uploads/2022/08/2019-to-Present-Zara-logo-design-1024x538.jpg" alt="Zara" className="about-us-image" />
          <img src="https://media.designrush.com/inspiration_images/134805/conversions/_1512076803_93_Nike-mobile.jpg" alt="Nike" className="about-us-image" />
          <img src="https://static.toiimg.com/thumb/msid-106616095,imgsize-6690,width-400,resizemode-4/106616095.jpg" alt="benetton" className="about-us-image" />
        </marquee>
      </div>
    </Layout>
  );
};

export default About;
