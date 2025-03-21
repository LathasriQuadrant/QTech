import React, { useState } from "react";
import DashBoardHeader from "./DashBoardHeader";
import AdminCourses from "./AdminCourses";
import AdminDocs from "./AdminDocs";
import AdminVideos from "./AdminVideos";
import AdminUsers from "./AdminUsers";
import Playlists from "./Playlists";

const AdminDashBoard = () => {
  const [selectedComponent, setSelectedComponent] = useState("courses");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "users":
        return <AdminUsers />;
      case "playlists":
        return <Playlists />;
      case "videos":
        return <AdminVideos />;
      case "documents":
        return <AdminDocs />;
      default:
        return <AdminUsers />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        {/* <DashBoardHeader /> */}
      </div>

      {/* Main Content */}
      <div className="flex pt-16 h-screen">
        {/* Sidebar (Fixed & Non-scrollable) */}
        <div className="w-1/5 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-md border-r border-gray-300 flex flex-col">
          <AdminCourses setSelectedComponent={setSelectedComponent} selectedComponent={selectedComponent} />
        </div>

        {/* Main Content (Scrollable) */}
        <div className="w-4/5 ml-[20%] p-4 bg-white h-[calc(100vh-4rem)] overflow-y-auto">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
