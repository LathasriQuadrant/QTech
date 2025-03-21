import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaPlus, FaEdit, FaTimes } from 'react-icons/fa';
 
const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '' });
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [showAddPlaylistModal, setShowAddPlaylistModal] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: '', url: '', imageUrl: '' });
  const [newDocument, setNewDocument] = useState({ title: '', content: '', url: '' });
  const [newPlaylist, setNewPlaylist] = useState({ title: '', description: '', imageUrl: '' });
  const [activePlaylistId, setActivePlaylistId] = useState(null);
 
  useEffect(() => {
    fetchAllData();
  }, []);
  
  const fetchAllData = () => {
    // Fetch playlists
    axios.get('http://localhost:5104/api/Qtech/Playlists')
      .then(res => setPlaylists(res.data))
      .catch(err => alert("Error fetching playlists: " + err.message));
 
    // Fetch videos
    axios.get('http://localhost:5104/api/Qtech/Videos')
      .then(res => {
        console.log("Fetched Videos:", res.data); // Debugging log
        setVideos(res.data);
        
        // Update filtered videos if a playlist is selected
        if (selectedPlaylistId) {
          setFilteredVideos(res.data.filter(video => video.playlistId === selectedPlaylistId));
        }
      })
      .catch(err => console.error("Error fetching videos:", err));
 
    // Fetch documents
    axios.get('http://localhost:5104/api/Qtech/Documentations')
      .then(res => {
        setDocuments(res.data);
        
        // Update filtered documents if a playlist is selected
        if (selectedPlaylistId) {
          setFilteredDocuments(res.data.filter(doc => doc.playlistId === selectedPlaylistId));
        }
      })
      .catch(err => alert("Error fetching documents: " + err.message));
  };

  const deletePlaylist = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this playlist? This action cannot be undone.");
    
    if (confirmDelete) {
      axios.delete(`http://localhost:5104/api/Qtech/Playlists/${id}`)
        .then(() => {
          alert("Deleted successfully");
          setPlaylists(playlists.filter(playlist => playlist.playlistId !== id));
        })
        .catch((err) => alert("Error: " + err.message));
    }
  };
 
  // const deletePlaylist = (id) => {
  //   axios.delete(`http://localhost:5104/api/Qtech/Playlists/${id}`)
  //     .then(() => {
  //       alert("Deleted successfully");
  //       setPlaylists(playlists.filter(playlist => playlist.playlistId !== id));
  //     })
  //     .catch((err) => alert("Error: " + err.message));
  // };
 
  const handleViewClick = (id) => {
    if (selectedPlaylistId === id) {
      setSelectedPlaylistId(null);
      setFilteredVideos([]);
      setFilteredDocuments([]);
    } else {
      setSelectedPlaylistId(id);
      setFilteredVideos(videos.filter(video => video.playlistId === id));
      setFilteredDocuments(documents.filter(doc => doc.playlistId === id));
    }
  };
 
  const handleEditClick = (playlist) => {
    if (editingId === playlist.playlistId) {
      setEditingId(null);
    } else {
      setEditingId(playlist.playlistId);
      setEditData({ 
        title: playlist.title, 
        description: playlist.description,
        imgUrl: playlist.imageUrl || '' // Make sure to use the correct property name from your data
      });
    }
  };
 
  const handleEditSave = (id) => {
    axios.patch(`http://localhost:5104/api/Qtech/Playlists/Edit/${id}`, editData)
      .then(() => {
        alert("Updated successfully");
        setEditingId(null);
        setPlaylists(playlists.map(pl => pl.playlistId === id ? { ...pl, ...editData } : pl));
      })
      .catch((err) => alert("Error: " + err.message));
  };
  
  // Add Video functions
  const openAddVideoModal = (playlistId) => {
    setActivePlaylistId(playlistId);
    setShowAddVideoModal(true);
    setNewVideo({ title: '', url: '', imageUrl: '' });
  };
  
  const handleVideoChange = (e) => {
    setNewVideo({ ...newVideo, [e.target.name]: e.target.value });
  };
  
  const handleAddVideo = async () => {
    if (!newVideo.title || !newVideo.url) {
      alert("Please fill in the required fields (title and URL)");
      return;
    }
    
    try {
      await axios.post("http://localhost:5104/api/Qtech/Videos", {
        playlistId: activePlaylistId,
        title: newVideo.title,
        url: newVideo.url,
        imageUrl: newVideo.imageUrl || "https://via.placeholder.com/150"
      });
      
      alert("Video added successfully!");
      setShowAddVideoModal(false);
      fetchAllData(); // Refresh all data
    } catch (err) {
      console.error("Error adding video:", err);
      alert("Failed to add video: " + err.message);
    }
  };
  
  // Add Document functions
  const openAddDocumentModal = (playlistId) => {
    setActivePlaylistId(playlistId);
    setShowAddDocumentModal(true);
    setNewDocument({ title: '', content: '', url: '' });
  };
  
  const handleDocumentChange = (e) => {
    setNewDocument({ ...newDocument, [e.target.name]: e.target.value });
  };
  
  const handleAddDocument = async () => {
    if (!newDocument.title || !newDocument.content || !newDocument.url) {
      alert("Please fill all fields");
      return;
    }
    
    try {
      await axios.post("http://localhost:5104/api/Qtech/Documentations", {
        playlistId: activePlaylistId,
        title: newDocument.title,
        content: newDocument.content,
        url: newDocument.url
      });
      
      alert("Document added successfully!");
      setShowAddDocumentModal(false);
      fetchAllData(); // Refresh all data
    } catch (err) {
      console.error("Error adding document:", err);
      alert("Failed to add document: " + err.message);
    }
  };

  // Add Playlist functions
  const openAddPlaylistModal = () => {
    setShowAddPlaylistModal(true);
    setNewPlaylist({ title: '', description: '', imageUrl: '' });
  };
  
  const handlePlaylistChange = (e) => {
    setNewPlaylist({ ...newPlaylist, [e.target.name]: e.target.value });
  };
  
  const handleAddPlaylist = async () => {
    if (!newPlaylist.title || !newPlaylist.description) {
      alert("Please fill in the required fields (title and description)");
      return;
    }
    
    try {
      await axios.post("http://localhost:5104/api/Qtech/Playlists", {
        title: newPlaylist.title,
        description: newPlaylist.description,
        imageUrl: newPlaylist.imageUrl || "https://via.placeholder.com/150"
      });
      
      alert("Playlist added successfully!");
      setShowAddPlaylistModal(false);
      fetchAllData(); // Refresh all data
    } catch (err) {
      console.error("Error adding playlist:", err);
      alert("Failed to add playlist: " + err.message);
    }
  };
 
  
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-violet-800 text-center">Playlists</h1>
        <button 
          onClick={openAddPlaylistModal}
          className="flex items-center gap-2 px-4 py-1 bg-violet-500 text-white rounded-lg hover:bg-violet-800 transition shadow-md"
        >
          <FaPlus /> Add Playlist
        </button>
      </div>
      
      <div className="flex flex-col gap-6">
        {playlists.map((playlist) => (
          <div key={playlist.playlistId} className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all duration-300 w-full">
            <h3 className="text-base font-semibold text-gray-900 mb-3">{playlist.title}</h3>
            <p className="text-gray-700 mb-4 text-xs">{playlist.description}</p>
            <div className="flex gap-4 mt-4">
              {/* <button
                onClick={() => handleViewClick(playlist.playlistId)}
                className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <FaEye /> {selectedPlaylistId === playlist.playlistId ? 'Hide' : 'View'}
              </button> */}
              <button
                onClick={() => deletePlaylist(playlist.playlistId)}
                className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-800 transition text-s"
              >
                <FaTrash /> Delete
              </button>
              <button
                onClick={() => handleEditClick(playlist)}
                className="flex items-center gap-2 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-800 transition text-s"
              >
                <FaEdit /> {editingId === playlist.playlistId ? 'Cancel' : 'Edit'}
              </button>
              <button 
                onClick={() => openAddDocumentModal(playlist.playlistId)}
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition text-s"
              >
                <FaPlus /> Add Document
              </button>
              <button 
                onClick={() => openAddVideoModal(playlist.playlistId)}
                className="flex items-center gap-2 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-800 transition text-s"
              >
                <FaPlus /> Add Video
              </button>
            </div>
            {selectedPlaylistId === playlist.playlistId && (
              <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold mb-2">Videos:</h3>
                {filteredVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredVideos.map((video, index) => (
                      <div key={index} className="border rounded-lg p-4 shadow-md bg-white">
                        <h4 className="font-medium">{video.title}</h4>
                        <a href={video.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          Watch Video
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No videos available</p>
                )}
 
                <h3 className="text-lg font-semibold mt-4 mb-2">Documents:</h3>
                {filteredDocuments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocuments.map((doc, index) => (
                      <div key={index} className="border rounded-lg p-4 shadow-md bg-white">
                        <h4 className="font-medium">{doc.title}</h4>
                        <a href={doc.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          View Document
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No documents available</p>
                )}
              </div>
            )}
            {editingId === playlist.playlistId && (
              <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow-inner">
                <input
                  type="text"
                  className="border p-3 w-full mb-3 rounded"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  placeholder="Title"
                />
                <textarea
                  className="border p-3 w-full mb-3 rounded"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Description"
                />
                <input
                  type="text"
                  className="border p-3 w-full mb-3 rounded"
                  value={editData.imgUrl}
                  onChange={(e) => setEditData({ ...editData, imgUrl: e.target.value })}
                  placeholder="Image URL"
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEditSave(playlist.playlistId)}
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Add Video Modal */}
      {showAddVideoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Video</h2>
              <button onClick={() => setShowAddVideoModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Video Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newVideo.title}
                  onChange={handleVideoChange}
                  className="border p-3 w-full rounded"
                  placeholder="Enter video title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL *</label>
                <input
                  type="text"
                  name="url"
                  value={newVideo.url}
                  onChange={handleVideoChange}
                  className="border p-3 w-full rounded"
                  placeholder="Enter video URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newVideo.imageUrl}
                  onChange={handleVideoChange}
                  className="border p-3 w-full rounded"
                  placeholder="Enter thumbnail URL (optional)"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddVideo}
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full"
                >
                  Add Video
                </button>
                <button
                  onClick={() => setShowAddVideoModal(false)}
                  className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Document Modal */}
      {showAddDocumentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Document</h2>
              <button onClick={() => setShowAddDocumentModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newDocument.title}
                  onChange={handleDocumentChange}
                  className="border p-3 w-full rounded"
                  placeholder="Enter document title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Content *</label>
                <textarea
                  name="content"
                  value={newDocument.content}
                  onChange={handleDocumentChange}
                  className="border p-3 w-full rounded min-h-32"
                  placeholder="Enter document content"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document URL *</label>
                <input
                  type="text"
                  name="url"
                  value={newDocument.url}
                  onChange={handleDocumentChange}
                  className="border p-3 w-full rounded"
                  placeholder="Enter document URL"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddDocument}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
                >
                  Add Document
                </button>
                <button
                  onClick={() => setShowAddDocumentModal(false)}
                  className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Playlist Modal */}
      {showAddPlaylistModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Playlist</h2>
              <button onClick={() => setShowAddPlaylistModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Playlist Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newPlaylist.title}
                  onChange={handlePlaylistChange}
                  className="border p-3 w-full rounded"
                  placeholder="Enter playlist title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={newPlaylist.description}
                  onChange={handlePlaylistChange}
                  className="border p-3 w-full rounded min-h-24"
                  placeholder="Enter playlist description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newPlaylist.imageUrl}
                  onChange={handlePlaylistChange}
                  className="border p-3 w-full rounded"
                  placeholder="Enter image URL (optional)"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddPlaylist}
                  className="px-5 py-2 bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition w-full"
                >
                  Add Playlist
                </button>
                <button
                  onClick={() => setShowAddPlaylistModal(false)}
                  className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition w-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default Playlists;