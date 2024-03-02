import { NavLink } from "react-router-dom";

// import icons
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHeart,FaRegCompass } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";


export default function Sidebar() {
  return (
    <div className="flex flex-col h-screen justify-between items-center p-3 max-md:p-2 max-md:justify-normal max-md:gap-20">
      <img className="w-[150px] max-md:w-[90px]" width="150" src="/recipe_logo.jpg" alt="" />
      <div className="flex flex-col gap-20 lg:p-10">
        <NavLink to={'/'} className='flex gap-4 items-center text-large text-gray-400' >
            <i><IoHomeOutline className="max-md:text-2xl"/></i>
            <span className="max-md:hidden">Homepage</span>
        </NavLink>
        <NavLink to={'/add'} className='flex gap-4 items-center text-large text-gray-400' >
            <i><IoCreateOutline className="max-md:text-2xl"/></i>
            <span className="max-md:hidden">Add new recipe</span>
        </NavLink>
        <NavLink to={'/descover'} className='flex gap-4 items-center text-large text-gray-400'>
            <i><FaRegCompass className="max-md:text-2xl"/></i>
            <span className="max-md:hidden">Explore</span>
        </NavLink>
        <NavLink to={'/likes'} className='flex gap-4 items-center text-large text-gray-400'>
            <i><FaRegHeart className="max-md:text-2xl"/></i>
            <span className="max-md:hidden">Favourites</span>
        </NavLink>
        <NavLink to={'/support'} className='flex gap-4 items-center text-large text-gray-400'>
            <i><CiSettings className="max-md:text-3xl"/></i>
            <span className="max-md:hidden">Support</span>
        </NavLink>
      </div>
      <div className="flex flex-col gap-2 max-md:hidden">
        <p className="font-semibold">Get daily news</p>
        <button className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-400">Subscribe</button>
      </div>
    </div>
  );
}
