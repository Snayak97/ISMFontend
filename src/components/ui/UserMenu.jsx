import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import LogOut from "../../pages/auth/LogOut/LogOut";
import { Link } from "react-router-dom";

const fallbackAvatar =
  "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";

const UserMenu = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative inline-block text-left ">
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 border border-gray-300 bg-white"
      >
        {/* Avatar image or fallback */}
        <img
          src={user?.avatarUrl || fallbackAvatar}
          alt="Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />

        <IoMdArrowDropdown
          className={`transition-transform duration-300 size-[20px] ${
            menuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute right-0 z-50 mt-2 w-52 rounded-md bg-white shadow-md ring-1 ring-black/10">
          <div className="py-2 text-gray-800">
            <div className="px-4 py-2 border-b text-sm font-semibold">
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatarUrl || fallbackAvatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{user?.user_name || "User"}</span>
              </div>
            </div>

            <Link to="/clientadmin/userProfiles">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              
            >
              View Profile
            </button>
            </Link>
          
            {/* <button
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 text-sm"
              onClick={() => console.log("Logout")}
            >
              Logout
            </button> */}
            <LogOut />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
