import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import Header from './Header';
import { NavItem } from '@/types/types';

interface LayoutProps {
  children: ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Shop',
    path: '/',
    icon: 'shop-icon.svg',
    header: {
      pathTitle: 'Shop',
      pathDescription: ['Shop'],
    },
    subItems: [
      {
        label: 'Books',
        path: '/shop/books',
        icon: 'shop-icon.svg',
        header: {
          pathTitle: 'Shop',
          pathDescription: ['Shop', 'Books'],
        },
      },
      {
        label: 'Authors',
        path: '/shop/authors',
        icon: 'shop-icon.svg',
        header: {
          pathTitle: 'Shop',
          pathDescription: ['Shop', 'Authors'],
        },
      },
      {
        label: 'Stores',
        path: '/shop/stores',
        icon: 'shop-icon.svg',
        header: {
          pathTitle: 'Shop',
          pathDescription: ['Shop', 'Stores'],
        },
      },
    ],
  },
  {
    label: 'Store',
    path: '/stores',
    icon: 'stores-icon.svg',
    header: {
      pathTitle: 'Shop',
      pathDescription: ['admin', 'stores'],
    },
  },
  {
    label: 'Authors',
    path: '/authors',
    icon: 'authors-icon.svg',
    header: {
      pathTitle: 'Shop',
      pathDescription: ['admin', 'authors'],
    },
  },
  {
    label: 'Books',
    path: '/books',
    icon: 'books-icon.svg',
    header: {
      pathTitle: 'Shop',
      pathDescription: ['admin', 'books'],
    },
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Function to find the active nav link or sub-link
  const getActiveNavLinkOrSubLink = (pathname: string): NavItem | undefined => {
    for (const navItem of navItems) {
      // Check if the main item path matches
      if (navItem.path === pathname) {
        return navItem;
      }

      // Check if any subItem path matches
      if (navItem.subItems) {
        const activeSubItem = navItem.subItems.find(
          (subItem) => subItem.path === pathname
        );
        if (activeSubItem) {
          return activeSubItem; // Return the matching subItem
        }
      }
    }
    return undefined; // No active link found
  };

  const activeNavLink = getActiveNavLinkOrSubLink(pathname);

  if (!activeNavLink) {
    return <>Something Went Wrong!</>;
  }

  return (
    <div className="layout flex flex-row bg-[#F1F1F1] font-poppins h-screen">
      <SideNavbar navItems={navItems} />
      <div className="w-full flex flex-col px-8 py-12">
        <Header {...activeNavLink?.header} />
        <main className="main-content overflow-auto pt-10">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
