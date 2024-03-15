import React from "react";
import Layout from "../components/layout/Layout";
import { BiLogoFacebook, BiLogoInstagram, BiLogoLinkedin, BiLogoTwitter, BiLogoYoutube, BiMobileAlt } from "react-icons/bi";
import { HiClock, HiLocationMarker, HiMail } from "react-icons/hi";
import "./Contact.css"
import contact from "../images/contact-png.png"
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="contact-section">
        <div className="contact-bg">
          <h3>Get in Touch with Us</h3>
          <h2>contact us</h2>
          <div className="line">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda iste facilis quos impedit fuga nobis modi debitis laboriosam velit reiciendis quisquam alias corporis, maxime enim, optio ab dolorum sequi qui.</p>
        </div>
        <div className="contact-body">
          <div className="contact-info">
            <div>
              <span><BiMobileAlt /></span>
              <span>Phone No.</span>
              <span className="text">+91 7X3X2X16X83</span>
            </div>
            <div>
              <span><HiMail /></span>
              <span>E-mail</span>
              <span className="text">lingutlalikithkumar@gmail.com</span>
            </div>
            <div>
              <span><HiLocationMarker /></span>
              <span>Address</span>
              <span className="text">#2 Church Street, MG Road, Bengaluru, Karnataka</span>
            </div>
            <div>
              <span><HiClock /></span>
              <span>Opening Hours</span>
              <span className="text">Monday - Friday (9:00 AM to 5:00 PM)</span>
            </div>
          </div>
          <div className="contact-form">
            <form>
              <div>
                <input type="text" className="form-control" placeholder="First Name" />
                <input type="text" className="form-control" placeholder="Last Name" />
              </div>
              <div>
                <input type="email" className="form-control" placeholder="E-mail" />
                <input type="text" className="form-control" placeholder="Phone" />
              </div>
              <textarea rows={5} placeholder="Message" className="form-control" defaultValue={""} />
              <input type="submit" className="send-btn" defaultValue="send message" />
            </form>

            <div>
              <img src={contact} alt="contact" />
            </div>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9614435843505!2d77.60514137422152!3d12.974317914820404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17a7cdc2f63d%3A0xde06f1c3ecfffca!2sChurch%20Street%20Banglore!5e0!3m2!1sen!2sin!4v1710438306517!5m2!1sen!2sin"
            width="100%"
            height={450}
            frameBorder={0}
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          />
        </div>
        <div className="contact-footer">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="/"><BiLogoFacebook /></a>
            <a href="/"><BiLogoTwitter /></a>
            <a href="/"><BiLogoInstagram /></a>
            <a href="/"><BiLogoLinkedin /></a>
            <a href="/" ><BiLogoYoutube /></a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
