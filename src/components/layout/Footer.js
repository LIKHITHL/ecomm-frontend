import React from "react";
import { Link } from "react-router-dom";
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";
import { BiLogoDiscordAlt, BiLogoTwitter } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        {/* <img src={playStore} alt="playStore" />
        <img src={appStore} alt="AppStore" /> */}
        <div className="row">
          <div className="col-lg-6 col-12 image">
            <img src={playStore} alt="playStore" />
          </div>
          <div className="col-lg-6 col-12 image">
            <img src={appStore} alt="AppStore" />
          </div>
        </div>
      </div>
      <div className="midFooter">
        <h4 className="text-center">All Rights Reserved &copy; CEASAR STORES</h4>
        <p className="text-center mt-3">
          <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
          <a href="https://www.termsfeed.com/live/c7c77f23-4cf3-4f74-9e25-61373e6528c3" target="_blank" rel="noreferrer">PRIVACY & POLICY</a>
        </p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <div className="icons">
          <a href="http://discord.com" target="_blank" rel="noreferrer"> <BiLogoDiscordAlt /></a>
          <a href="http://github.com" target="_blank" rel="noreferrer"> <AiFillGithub /></a>
          <a href="http://twitter.com" target="_blank" rel="noreferrer">  <BiLogoTwitter /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
