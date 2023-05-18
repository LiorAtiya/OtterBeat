import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";

import { HiOutlineHome, HiOutlineUserGroup } from 'react-icons/hi';
import { AiOutlineHeart, AiOutlineBarChart } from 'react-icons/ai';
import { RiLoginBoxFill } from 'react-icons/ri';
import { GoSignOut } from 'react-icons/go';
import { useNavigate } from "react-router-dom";

const NavLinks = ({ handleClick }) => {

  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    const result = confirm('Are you sure you want to sign out?');
    if (result) {
      localStorage.removeItem('user-info');
      localStorage.removeItem('token');
      navigate("/");
      window.location.reload();
    }
  }

  return (
    <div className="mt-10">

      <NavLink to='/'
        className="flex flex-row items-center justify-start my-8 text-sm font-medium text-gray-500 hover:text-white"
        onClick={() => handleClick && handleClick()}>
        <HiOutlineHome className="w-6 h-6 mr-2" />
        Home
      </NavLink>

      {
        userInfo ?
          <NavLink to={`/my-favorite/${userInfo.id}`}
            className="flex flex-row items-center justify-start my-8 text-sm font-medium text-gray-500 hover:text-white"
            onClick={() => handleClick && handleClick()}>
            <AiOutlineHeart className="w-6 h-6 mr-2" />
            My Favorite Songs
          </NavLink>
          :
          null
      }

      <NavLink to='/top-charts'
        className="flex flex-row items-center justify-start my-8 text-sm font-medium text-gray-500 hover:text-white"
        onClick={() => handleClick && handleClick()}>
        <AiOutlineBarChart className="w-6 h-6 mr-2" />
        Top Charts
      </NavLink>

      {
        userInfo ?
          <>
            <h3 className="mt-10 text-white">Hello {userInfo.name} 🤚</h3>

            <NavLink
              className="flex flex-row items-center justify-start my-5 text-sm font-medium text-gray-500 hover:text-white"
              onClick={() => handleSignOut()}>
              <GoSignOut className="w-6 h-6 mr-2" />
              Sign out
            </NavLink>

          </>
          :
          <>
            <h3 className="mt-10 text-white">Hello Guest 🤚</h3>

            <NavLink to='/login'
              className="flex flex-row items-center justify-start my-5 text-sm font-medium text-gray-500 hover:text-white"
              onClick={() => handleClick && handleClick()}>
              <RiLoginBoxFill className="w-6 h-6 mr-2" />
              Login
            </NavLink>

            <NavLink to='/register'
              className="flex flex-row items-center justify-start my-8 text-sm font-medium text-gray-500 hover:text-white"
              onClick={() => handleClick && handleClick()}>
              <HiOutlineUserGroup className="w-6 h-6 mr-2" />
              Register
            </NavLink>
          </>
      }


    </div>
  )
}

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#1a1a1a]">
        <img src={logo} alt="logo" className="object-contain w-full h-14" />
        <h2 className="mt-2 text-xl font-bold text-center text-white">OtterBeat</h2>
        <NavLinks />
      </div>

      <div className="absolute md:hidden blcok top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        ) : <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`} >
        <img src={logo} alt="logo" className="object-contain w-full h-14" />
        <h2 className="mt-2 text-xl font-bold text-center text-white">OtterBeat</h2>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
