import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";

const AdminVideos = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [videoEditData, setVideoEditData] = useState({
    title: "",
    url: "",
    imgUrl: "",
  });

  // Refs for scrolling
  const videoContainerRef = useRef(null);
  const editFormRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistsResponse = await axios.get("http://localhost:5104/api/Qtech/Playlists");
        const videosResponse = await axios.get("http://localhost:5104/api/Qtech/Videos");

        setPlaylists(playlistsResponse.data);
        setVideos(videosResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setTimeout(() => {
      videoContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const handleEditVideo = (video) => {
    setEditingVideoId(video.videoId);
    setVideoEditData({
      title: video.title,
      url: video.url,
      imgUrl: video.imgUrl || "",
    });

    // Scroll to edit form
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  const handleSaveVideo = async (videoId) => {
    if (!videoEditData.imgUrl.trim()) {
      alert("Image URL is required!");
      return;
    }

    try {
      console.log("Sending Data:", videoEditData);

      await axios.patch(`http://localhost:5104/api/Qtech/Videos/Edit/${videoId}`, videoEditData, {
        headers: { "Content-Type": "application/json" },
      });

      setVideos((prevVideos) =>
        prevVideos.map((video) => (video.videoId === videoId ? { ...video, ...videoEditData } : video))
      );

      setEditingVideoId(null);
    } catch (error) {
      console.error("Error updating video:", error.response?.data || error.message);
      alert("Error updating video: " + (error.response?.data?.title || error.message));
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    try {
      await axios.delete(`http://localhost:5104/api/Qtech/Videos/${videoId}`);
      setVideos((prevVideos) => prevVideos.filter((video) => video.videoId !== videoId));
    } catch (error) {
      alert("Error deleting video: " + error.message);
    }
  };

  return (
    <div className="w-full p-6">
      {/* Playlists Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {playlists.map((playlist) => (
    <div key={playlist.playlistId} className="border p-3 rounded-lg shadow-sm bg-white w-11/12 mx-auto">
      <img src={playlist.imageUrl} alt={playlist.title} className="w-full h-32 object-cover rounded-md" />
      <p className="mt-2 text-center font-medium text-sm">{playlist.title}</p>
      <p className="text-xs text-gray-600 text-center">{playlist.description}</p>
      <div className="flex gap-2 justify-center mt-2">
        <button
          className="border border-violet-600 px-3 py-1 text-xs rounded cursor-pointer hover:bg-violet-600 hover:text-white transition"
          onClick={() => handleSelectPlaylist(playlist)}
        >
          Videos
        </button>
      </div>
    </div>
  ))}


      </div>

      {/* Video Container */}
        {selectedPlaylist && (
          <div ref={videoContainerRef} className="mt-6 p-4 bg-violet-100 rounded-lg shadow-lg w-full border-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Videos for {selectedPlaylist.title}</h3>
            {videos.filter((video) => video.playlistId === selectedPlaylist.playlistId).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {videos
                  .filter((video) => video.playlistId === selectedPlaylist.playlistId)
                  .map((video) => (
                    <div key={video.videoId} className="border rounded-lg p-3 shadow-md bg-white flex flex-col items-center w-full">
                      <img
                        src={video.ImageUrl || video.imageUrl || "/fallback-image.jpg"}
                        alt={video.title}
                        className="w-full h-36 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "/fallback-image.jpg";
                        }}
                      />
                      <h4 className="font-medium mt-2 text-sm">{video.title}</h4>
                      <a href={video.url} className="text-blue-600 hover:underline mt-1 text-xs" target="_blank" rel="noopener noreferrer">
                        Watch Video
                      </a>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleEditVideo(video)} className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 transition">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteVideo(video.videoId)} className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No videos available</p>
            )}
            <button className="mt-4 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition" onClick={() => setSelectedPlaylist(null)}>
              Close
            </button>
          </div>
        )}


      {/* Edit Form (Scrolls to this when clicking Edit) */}
      {editingVideoId && (
        <div ref={editFormRef} className="w-2/3 mx-auto p-4 bg-violet-100 rounded shadow mt-6 border">
          <h2 className="text-md font-medium mb-3">Edit Video Details</h2>
          <input
            type="text"
            value={videoEditData.title}
            onChange={(e) => setVideoEditData({ ...videoEditData, title: e.target.value })}
            className="border p-2 rounded w-2/3 text-sm block mb-2 bg-white"
            placeholder="Title"
          />
          <input
            type="text"
            value={videoEditData.url}
            onChange={(e) => setVideoEditData({ ...videoEditData, url: e.target.value })}
            className="border p-2 rounded w-2/3 text-sm block mb-2 bg-white"
            placeholder="Video URL"
          />
          <input
            type="text"
            value={videoEditData.imgUrl}
            onChange={(e) => setVideoEditData({ ...videoEditData, imgUrl: e.target.value })}
            className="border p-2 rounded w-2/3 text-sm block mb-2 bg-white"
            placeholder="Image URL"
          />
          <div className="flex gap-3">
            <button onClick={() => handleSaveVideo(editingVideoId)} className="px-4 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 flex items-center">
              <FaCheck className="mr-1" /> Save
            </button>
            <button onClick={() => setEditingVideoId(null)} className="px-4 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 flex items-center">
              <FaTimes className="mr-1" /> Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminVideos;
