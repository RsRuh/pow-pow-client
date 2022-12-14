import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart, AiOutlineLogout } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { VscSignIn } from "react-icons/vsc";
import { IoFastFoodOutline } from "react-icons/io5";
import { AuthContext } from '../context/AuthProvider';

const Main = () => {

  const { user, logout } = useContext(AuthContext);

  const menus = [
    { name: "user", link: "/", icon: AiOutlineUser },
    { name: "dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "Add Food", link: "/add-food", icon: IoFastFoodOutline },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/", icon: FiFolder },
    { name: "Cart", link: "/", icon: FiShoppingCart },
    { name: "Log in", link: "/login", icon: VscSignIn, margin: true },
    { name: "Sign up", link: "/sign-up", icon: FiUserPlus },
  ];
  const [open, setOpen] = useState(false);
  return (
    <section className="flex">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4 `}
      >

        <div className="py-3 lg:sticky lg:top-0 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className="mt-4 flex lg:sticky lg:top-16 flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              onClick={() => setOpen(false)}
              key={i}
              className={` ${menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
          {
            user?.email && <button
              onClick={logout}
              className={'group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'}
            >

              <div><AiOutlineLogout className='text-xl' /></div>
              <h2
                style={{
                  transitionDelay: '700ms',
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                Log Out
              </h2>

            </button>
          }
        </div>
      </div>
      <div className="m-3 flex-1 text-xl text-gray-900 font-semibold">
        <Outlet></Outlet>
        <Footer />
      </div>
    </section>
  );
};

export default Main;