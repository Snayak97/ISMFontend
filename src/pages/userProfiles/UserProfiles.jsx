import React, { useState, useEffect } from "react";

import UserEditProfiles from "./UserEditProfiles";
import PasswordSections from "./PasswordSections ";
import useAuth from "../../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";
import LogOut from "../auth/LogOut/LogOut";

const UserProfiles = () => {
  const { auth } = useAuth();
  const user = auth?.user;
  const [userData, setUserData] = useState(user);

  // Update local state if auth.user changes (important on login/logout refresh)
  useEffect(() => {
    setUserData(user);
  }, [user]);

  if (!userData) return <p>Loading...</p>; // handle loading

  return (
    <div>
      <div className="relative flex items-center bg-white shadow-md rounded-xl p-6 h-32 w-full mx-auto mt-10">
        {/* Logout Button Top Right */}
        <button className="absolute top-3 right-3 flex cursor-pointer  rounded-lg shadow-md transition duration-300">
          <LogOut />
        </button>

        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-3 flex flex-row">
          <img
            src={
              userData.avatar ||
              "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            }
            alt={userData.user_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex justify-center items-start flex-col gap-1 ml-5">
          <h2 className="text-xl font-semibold text-gray-800">
            {userData.user_name}
          </h2>
          <p className="text-gray-500">{userData.email}</p>
        </div>
      </div>

      <div>
        <UserEditProfiles user={userData} setUserData={setUserData} />
      </div>
      <div>
        <PasswordSections />
      </div>
    </div>
  );
};

export default UserProfiles;
