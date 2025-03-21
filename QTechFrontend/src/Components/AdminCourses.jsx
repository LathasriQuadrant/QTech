import React from "react";
import { FaUsers, FaList, FaVideo, FaFileAlt } from "react-icons/fa";

const AdminCourses = ({ setSelectedComponent, selectedComponent }) => {
  const menuItems = [
    { id: "users", label: "Users", desc: "Manage Users", icon: <FaUsers /> },
    { id: "playlists", label: "Playlists", desc: "Manage Playlists", icon: <FaList /> },
    { id: "videos", label: "Videos", desc: "Manage Videos", icon: <FaVideo /> },
    { id: "documents", label: "Documents", desc: "Manage Documents", icon: <FaFileAlt /> },
  ];

  return (
    <div className="w-full h-screen sticky top-0 flex flex-col bg-white shadow-md border-r border-gray-300 mt-10">
      {/* Actions Heading */}
      <h2 className="text-xl font-bold text-violet-900 py-3 px-4 border-b border-gray-300 text-center">
        Actions
      </h2>

      <nav className="flex flex-col space-y-2 p-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedComponent(item.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-md text-center transition duration-300 ${
              selectedComponent === item.id
                ? "bg-violet-100 text-violet-900 font-bold border-l-4 border-violet-600 hover:bg-violet-200"
                : "hover:bg-gray-100 hover:text-violet-700"
            }`}
          >
            <div className="flex items-center space-x-2 text-lg">
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default AdminCourses;
