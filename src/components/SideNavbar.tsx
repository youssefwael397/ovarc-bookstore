import { NavItem } from '@/types/types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SideNavbarProps {
  navItems: NavItem[];
}

const SideNavbar: React.FC<SideNavbarProps> = ({ navItems }) => {
  const { pathname } = useLocation();
  const isActive = (item: NavItem) =>
    pathname === item.path ||
    item.subItems?.some((item) => item.path === pathname);

  return (
    <nav className="w-[280px] side-nav bg-white flex flex-col h-full">
      <Link
        to="/"
        className="flex flex-row gap-3 justify-center items-center py-14 px-8"
      >
        <img src="/logo.svg" alt="logo" />
        <h1 className="font-bold text-lg">
          Book <span className="font-normal">World</span>
        </h1>
      </Link>

      <div className="flex flex-col flex-grow text-[16px] leading-[24px] ">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`px-8 h-10 flex items-center border-l-[3px] gap-3 ${
              isActive(item)
                ? 'border-darkOrange text-darkOrange'
                : 'border-transparent text-[#131313]'
            }`}
          >
            <img
              src={`${
                isActive(item) ? `/assets/active-icons/` : '/assets/icons/'
              }${item.icon}`}
              alt={item.label}
              className={`w-6 h-6 transition-colors`}
            />
            {item.label}
          </Link>
        ))}
      </div>

      {/* Logout Link at the bottom */}
      <div className="mt-auto">
        <Link
          to="/"
          className="px-8 h-10 flex items-center border-l-[3px] border-transparent gap-3 mb-4 text-[#131313]"
        >
          <img src="/assets/icons/SignOut.svg" alt="logout" />
          Log Out
        </Link>
      </div>
    </nav>
  );
};

export default SideNavbar;
