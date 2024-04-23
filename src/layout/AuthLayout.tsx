import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import logo from "../assets/icon/logo.svg";
import phoneImage from "../assets/images/R-phone.png";
import mphone from "../assets/images/m-phone.png";
import facebook from "../assets/icon/Facebook.svg";
import twitter from "../assets/icon/Twitter.svg";
import linkedin from "../assets/icon/LinkedIn.svg";
import Instagram from "../assets/icon/Instagram.svg";
import moment from 'moment'

const AuthLayout = () => {
  const today = moment().format('YYYY-MM-DD')

  return (
    <div className=" md:flex justify-center flex-row-reverse">
      {/* mobile header */}
      <header className="md:hidden ml-[5%] mb-4 mt-[5%] ">
        <a target="_blank" href="https://mybalanceapp.com">
          <img src={logo} alt="my-balance" />
        </a>
      </header>
      {/* mobile phone Image */}
      <img src={mphone} alt="Image of a phone" className="md:hidden w-[100%]  " />
      {/* Desktop Image */}

      <img
        src={phoneImage}
        alt="Image of a phone"
        className="hidden md:flex w-[519px] object-cover min-h-screen"
      />

      <div className="md:w-[52%] lg:w-[65%]">
        {/* Desktop header */}
        <header className="hidden md:flex ml-[5%] mt-[5%]">
          <a target="_blank" href="https://mybalanceapp.com">
            <img src={logo} alt="my-balance" />
          </a>
        </header>

        <div className="  w-full max-w-[354px] px-5 sm:px-0 mx-auto my-6 ">
          <Outlet />
        </div>
        <footer className="px-[5%] w-fit mx-auto mb-7 bg-white gap-3 gap-x-10 flex flex-wrap-reverse ">
          <p className="font-medium">© {today.slice(0,4)} MyBalance. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="https://twitter.com/mybalance_app" target="_blank">
              <img src={twitter} alt="Twitter" />
            </a>
            <a href="https://linkedin.com/company/mybalanceapp" target="_blank">
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a href="https://www.facebook.com/themybalanceapp" target="_blank">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/mybalance_app" target="_blank">
              <img src={Instagram} alt="Instagram" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
