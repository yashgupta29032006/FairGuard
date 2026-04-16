import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-on-background font-body antialiased">
      <SideNavBar />
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
