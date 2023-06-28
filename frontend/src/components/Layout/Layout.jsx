import React, {useState} from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

const Layout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" bg-[#F9FAFB]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex flex-1 flex-col md:pl-64">{children}</main>
    </div>
  );
};

export default Layout;
