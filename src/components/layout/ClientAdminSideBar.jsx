import React, { useState, useEffect } from "react";
import accurest_logo from "../../assets/accurest_logo.svg";

import { Link, NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BsArrowDownUp } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaDatabase } from "react-icons/fa6";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

// import { useTranslation } from "react-i18next";

const ClientAdminSideBar = () => {
  const [masterTableOpen, setMasterTableOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {auth}  = useAuth()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLink = [
    { icon: <RxDashboard />, text: "DashBoard", link: "/clientadmin/dashboard" },
    { icon: <FaDatabase />, text: "UploadMasters", link: "/clientadmin/uploadmasters" },
    {
      icon: <MdOutlineProductionQuantityLimits />,
      text: "Products",
      link: "/clientadmin/products",
    },
    { icon: <BsArrowDownUp />, text: "Transactions", link: "/clientadmin/transaction" },
  ];

  return (
    <div
      className={`relative bg-white flex flex-col h-screen text-gray-900 shadow-md border-r border-gray-300 transition-width duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      
      <div className="relative flex flex-col items-center pt-4 pb-2">
        <Link to="/clientadmin/dashboard">
          <img
            src={accurest_logo}
            alt="Accurest Logo"
            className="h-14 w-auto mb-0"
          />
        </Link>
        {!collapsed && (
          <h1 className="text-purple-700 font-bold text-md underline text-center mt-1">
           {auth?.user?.username}
          </h1>
        )}
        <hr className="w-full mt-2 border-gray-300" />

        {/* Collapse / Expand Button */}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 transition duration-200 shadow"
        >
          {collapsed ? (
            <FaChevronRight size={16} />
          ) : (
            <FaChevronLeft size={16} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-2 overflow-y-auto">
        {navLink.map((nav) => (
          <NavLink
            to={nav.link}
            key={nav.text}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 mb-1 transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
            end
            title={collapsed ? nav.text : undefined}
          >
            <div className="text-lg">{nav.icon}</div>
            {!collapsed && (
              <span className="text-lg capitalize">{nav.text}</span>
            )}
          </NavLink>
        ))}

        {/* Mastertable Section */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setMasterTableOpen((prev) => !prev)}
            className="flex items-center justify-between w-full rounded-md px-3 py-2 mb-1 hover:bg-gray-100 text-gray-700 cursor-pointer transition-colors duration-200"
            title={collapsed ? "Mastertable Data" : undefined}
          >
            <div className="flex items-center gap-3">
              <FaDatabase className="text-lg" />
              {!collapsed && (
                <span className="text-lg capitalize font-medium">
                  Mastertable Data
                </span>
              )}
            </div>
            {!collapsed && (
              <span>
                {masterTableOpen ? (
                  <FaChevronUp className="text-lg" />
                ) : (
                  <FaChevronDown className="text-lg" />
                )}
              </span>
            )}
          </button>

          {!collapsed && masterTableOpen && (
            <div className="ml-8 flex flex-col gap-1">
              <NavLink
                to="/masterdata/marketplaces"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
                end
              >
                Marketplace Data
              </NavLink>
              <NavLink
                to="/masterdata/shipping-locations"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
                end
              >
                Shipping Location Data
              </NavLink>
              <NavLink
                to="/masterdata/selling-platforms"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
                end
              >
                Selling Platform Data
              </NavLink>
              <NavLink
                to="/masterdata/platforms-master"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
                end
              >
                Platforms Master Data
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 text-center text-sm text-gray-500 border-t border-gray-200">
        {!collapsed && <>&copy; {new Date().getFullYear()} Accurest</>}
      </div>
    </div>
  );
};

export default ClientAdminSideBar;

// import React from "react";
// import accurest_logo from "/logo/accurest_logo.svg";
// import { Link } from "react-router-dom";
// import { RxDashboard } from "react-icons/rx";
// import { BsArrowDownUp } from "react-icons/bs";
// import { MdOutlineProductionQuantityLimits } from "react-icons/md";
// import { FaDatabase } from "react-icons/fa6";
// import { BiSupport } from "react-icons/bi";
// import { NavLink } from "react-router-dom";

// const SideBar = () => {
//   const navLink = [
//     {
//       icon: <RxDashboard />,
//       text: "DashBoard",
//       link: "/",
//     },
//     {
//       icon: <FaDatabase />,
//       text: "UploadMasters",
//       link: "/uploadmasters",
//     },
//     {
//       icon: <MdOutlineProductionQuantityLimits />,
//       text: "Products",
//       link: "/products",
//     },
//     {
//       icon: <BsArrowDownUp />,
//       text: "Transactions",
//       link: "/transaction",
//     },
//   ];

//   return (
//     <div className="bg-white flex flex-col h-screen text-gray-900 w-70 p-3 shadow-md">
//       <div className=" flex-1">
//         <div>
//           <div className="flex flex-col items-center">
//             <Link to="/">
//               <img
//                 src={accurest_logo}
//                 alt="Accurest Logo"
//                 className="h-15 w-auto mb-0"
//               />
//             </Link>
//             <h1 className="text-purple-700 font-bold text-md underline ">
//               Client admin
//             </h1>
//           </div>
//           <hr className="bg-gray-900 border-1 mt-0.5" />
//         </div>
//         <div className="mt-2 mx-6">
//           {navLink.map((nav) => (
//             <NavLink
//               to={nav.link}
//               key={nav.text}
//               className={({ isActive }) =>
//                 `flex items-center mt-5 gap-2 px-3 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
//                   isActive
//                     ? "bg-blue-700 text-white"
//                     : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-400"
//                 }`
//               }
//             >
//               <p className="text-lg">{nav.icon}</p>
//               <p className="text-xl capitalize">{nav.text}</p>
//             </NavLink>
//           ))}
//         </div>
//       </div>

//       <div className="buttom">buttom</div>
//     </div>
//   );
// };

// export default SideBar;
