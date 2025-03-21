import { useState } from "react";
import AdminUsers from "./AdminUsers";
import Playlists from "./Playlists";
import AdminVideos from "./AdminVideos";
import AdminDocs from "./AdminDocs";
import Admin from "./Admin";
import MangerCouses from "./MangerCouses";
import ManagerUsers from "./ManagerUsers";
import DashBoardHeader from "./DashBoardHeader";

const ManagerDashBoard = () => {
  const [selectedComponent, setSelectedComponent] = useState("courses");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "users":
        return <ManagerUsers />;
      case "playlists":
        return <Playlists />;
      case "videos":
        return <AdminVideos />;
      case "documents":
        return <AdminDocs />;
      case "Admin":
        return <Admin />;
      default:
        return <Admin />;
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
        <div className="w-1/5 fixed top-23 left-0 h-[calc(100vh-4rem)] bg-white shadow-md border-r border-gray-300 flex flex-col">
          <MangerCouses setSelectedComponent={setSelectedComponent} selectedComponent={selectedComponent} />
        </div>

        {/* Main Content (Scrollable) */}
        <div className="w-4/5 ml-[20%] p-6 bg-white h-[calc(100vh-4rem)] overflow-y-auto">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashBoard;
