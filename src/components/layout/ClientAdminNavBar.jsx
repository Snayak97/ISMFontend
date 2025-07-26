// import React, { useContext } from "react";
// import { FullscreenContext } from "../../context/FullscreenContext";
// import {
//   FiSearch,
//   FiMoon,
//   FiMaximize2,
//   FiBell,
//   FiMinimize2,
//   FiMessageSquare,
//   FiSun,
//   FiList,
// } from "react-icons/fi";
// import { FaGlobe } from "react-icons/fa";

// import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "../Lang/LanguageSwitcher";
// import UserMenu from "../ui/Usermenu";
// import useAuth from "../../hooks/useAuth";

// const ClientAdminNavBar = ({ darkMode, togleDarkMode }) => {
//   const { isFullscreen, toggleFullscreen } = useContext(FullscreenContext);
//   const { t, i18n } = useTranslation();
//   const {auth} = useAuth();

//   return (
//     <div className="bg-white shadow-md h-16 flex items-center px-4 md:px-8 justify-between w-full">
//       <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="bg-transparent outline-none text-sm flex-grow"
//         />
//         <FiSearch className="text-gray-500" />
//       </div>

//       <div className="flex items-center gap-4 md:ml-4 ">
//         {/* <div className="hidden md:flex items-center gap-1 text-gray-600 text-sm">
//           <FaGlobe className="text-xl" />
//           English
//         </div> */}
//         <div className="flex items-center gap-4">
//           <h1>{t("welcome")}</h1>
//           <LanguageSwitcher />
//           {/* other icons */}
//         </div>

//         <button
//           onClick={togleDarkMode}
//           className="text-xl text-gray-600 hover:text-black"
//         >
//           {darkMode ? (
//             <FiSun className="text-xl" />
//           ) : (
//             <FiMoon className="text-xl" />
//           )}
//         </button>
//         {/* <button className="text-xl text-gray-600 hover:text-black">
//           <FiMaximize2 />
//         </button> */}
//         <button
//           onClick={toggleFullscreen}
//           className="text-xl text-gray-600 hover:text-gray-300 transition"
//           aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
//         >
//           {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
//         </button>
//         <div className="relative">
//           <FiBell className="text-xl text-gray-600" />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//             1
//           </span>
//         </div>
//         <div className="relative">
//           <FiMessageSquare className="text-xl text-gray-600" />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//             2
//           </span>
//         </div>
//         <FiList className="text-xl text-gray-600" />
//         {/* Welcome + User Menu */}
//         <div className="flex items-center gap-5">
//           <UserMenu user={auth?.user}  />
//         </div>
//         {/* <img
//           src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           alt="avatar"
//           className="mr-3 w-9 h-9 rounded-full object-cover "
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default ClientAdminNavBar;
import React, { useContext } from "react";
import { FullscreenContext } from "../../context/FullscreenContext";
import {
  FiSearch,
  FiMoon,
  FiMaximize2,
  FiBell,
  FiSun,
  FiMinimize2,
  FiMessageSquare,
  FiList,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Lang/LanguageSwitcher";
import UserMenu from "../ui/Usermenu";
import useAuth from "../../hooks/useAuth";

const ClientAdminNavBar = ({ darkMode, togleDarkMode }) => {
  const { isFullscreen, toggleFullscreen } = useContext(FullscreenContext);
  const { t } = useTranslation();
  const { auth } = useAuth();

  return (
    <div className="bg-white shadow-md h-auto px-4 md:px-6 py-2 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 w-full">
      {/* Left Section: Search Input */}
      <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-full sm:max-w-[200px] md:max-w-xs">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm flex-grow"
        />
        <FiSearch className="text-gray-500" />
      </div>

      {/* Right Section: Icons & Controls */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-2 sm:gap-4 w-full sm:w-auto">
        {/* Welcome + Language Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-sm font-medium hidden sm:inline">
            {t("welcome")}
          </span>
          <LanguageSwitcher />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={togleDarkMode}
          className="text-xl text-gray-600 hover:text-black"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="text-xl text-gray-600 hover:text-black transition"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <FiBell className="text-xl text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            1
          </span>
        </div>

        {/* Message Icon */}
        <div className="relative">
          <FiMessageSquare className="text-xl text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            2
          </span>
        </div>

        {/* Sidebar Toggle (FiList) */}
        <FiList className="text-xl text-gray-600" />

        {/* User Menu */}
        <div className="flex items-center">
          <UserMenu user={auth?.user} />
        </div>
      </div>
    </div>
  );
};

export default ClientAdminNavBar;
