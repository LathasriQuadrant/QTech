import React, { useState, useEffect } from "react";
import Video from "./Video";
import UserDocument from "./UserDocument";

const UserCourses = () => {
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [activeContent, setActiveContent] = useState(null);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistsResponse = await fetch("http://localhost:5104/api/Qtech/Playlists");
        if (!playlistsResponse.ok) throw new Error("Failed to fetch playlists");
        const playlistsData = await playlistsResponse.json();

        const videosResponse = await fetch("http://localhost:5104/api/Qtech/Videos");
        if (!videosResponse.ok) throw new Error("Failed to fetch videos");
        const videosData = await videosResponse.json();

        const documentResponse = await fetch("http://localhost:5104/api/Qtech/Documentations");
        if (!documentResponse.ok) throw new Error("Failed to fetch documents");
        const documentData = await documentResponse.json();

        setDocuments(documentData);
        setVideos(videosData);

        const combinedData = playlistsData.map((playlist) => ({
          id: playlist.playlistId,
          title: playlist.title,
          description: playlist.description,
          img: playlist.imageUrl || "https://via.placeholder.com/100",
          videos: videosData.filter((video) => video.playlistId === playlist.playlistId),
          documents: documentData.filter((doc) => doc.playlistId === playlist.playlistId),
        }));

        setPlaylists(combinedData);
        setFilteredPlaylists(combinedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPlaylists(playlists);
    } else {
      const filtered = playlists.filter(
        (playlist) =>
          playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          playlist.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlaylists(filtered);
    }
  }, [searchTerm, playlists]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-100 p-1 border-1 border-violet-500 rounded-xl text-sm text-center ml-100"
        />
      </div>

      {filteredPlaylists.length === 0 && searchTerm !== "" && (
        <div className="text-center p-2 text-gray-500 text-sm">
          No playlists found matching "{searchTerm}"
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
        {filteredPlaylists.map((playlist) => (
          <div key={playlist.id} className="border bg-violet-200 p-2 rounded-lg shadow-sm hover:shadow-md transition-all text-sm">
            <img
              src={playlist.img}
              alt={playlist.title}
              className="w-full h-40 rounded-lg object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/100";
              }}
            />
            <p className="mt-1 text-center font-semibold">{playlist.title}</p>
            <p className="text-xs text-gray-600 text-center line-clamp-2">{playlist.description}</p>

            <div className="flex gap-2 justify-center mt-2">
              <button
                className="border border-violet-600 px-2 py-1 rounded text-xs hover:bg-violet-600 hover:text-white transition bg-white"
                onClick={() => setSelectedPlaylist(playlist) || setActiveContent('video')}
                disabled={playlist.videos.length === 0}
              >
                Videos ({playlist.videos.length})
              </button>
              <button
                className="border border-violet-600 px-2 py-1 rounded text-xs hover:bg-violet-600 hover:text-white transition bg-white"
                onClick={() => setSelectedPlaylist(playlist) || setActiveContent('document')}
                disabled={playlist.documents.length === 0}
              >
                Docs ({playlist.documents.length})
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPlaylist && activeContent === 'video' && (
        <Video
          playlistName={selectedPlaylist.title}
          videos={selectedPlaylist.videos}
          onClose={() => setSelectedPlaylist(null) || setActiveContent(null)}
        />
      )}

      {selectedPlaylist && activeContent === 'document' && (
        <UserDocument
          playlistId={selectedPlaylist.id}
          onClose={() => setSelectedPlaylist(null) || setActiveContent(null)}
        />
      )}
    </div>
  );
};

export default UserCourses;