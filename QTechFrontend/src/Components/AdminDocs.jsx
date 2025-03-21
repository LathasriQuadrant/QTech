import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import cimage from "../assets/cimage.jpg";
import datascience from "../assets/datascience.jpg";
 
const AdminDocs = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [editingDocId, setEditingDocId] = useState(null);
  const [docEditData, setDocEditData] = useState({ title: "", content: "", url: "" });
 
  const docContainerRef = useRef(null);
  const editFormRef = useRef(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistsResponse = await axios.get("http://localhost:5104/api/Qtech/Playlists");
        const documentsResponse = await axios.get("http://localhost:5104/api/Qtech/Documentations");
 
        setPlaylists(playlistsResponse.data.map((playlist, index) => ({
          ...playlist,
          img: playlist.imageUrl || (index % 2 === 0 ? cimage : datascience),
        })));
 
        setDocuments(documentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 
    fetchData();
  }, []);
 
  useEffect(() => {
    if (editingDocId && editFormRef.current) {
      setTimeout(() => {
        editFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [editingDocId]);
 
  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setTimeout(() => {
      docContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };
 
  const handleEditDoc = (doc) => {
    console.log("Editing document:", doc);
    setEditingDocId(doc.docId);
    setDocEditData({
      docId: doc.docId,
      title: doc.title || "",
      content: doc.content || "", // Changed content to description to match input field
      url: doc.url || "",
      playlistId: doc.playlistId || selectedPlaylist?.playlistId,
    });
  };
 
  const handleSaveDoc = async () => {
    try {
      console.log("Saving document with ID:", editingDocId);
      console.log("With data:", docEditData);
 
      const payload = {
        title: docEditData.title,
        content: docEditData.content,
        url: docEditData.url
      };
 
      await axios.patch(`http://localhost:5104/api/Qtech/Documentations/${editingDocId}`, payload);
 
      setDocuments((prevDocs) =>
        prevDocs.map((doc) =>
          doc.docId === editingDocId ? { ...doc, ...docEditData } : doc
        )
      );
 
      setEditingDocId(null);
    } catch (error) {
      console.error("Error saving document:", error);
      alert("Error updating document: " + error.message);
    }
  };
 
  // Fixed delete function
  const handleDeleteDoc = async (documentId) => {
    if (!documentId) {
      alert("Document ID is missing.");
      return;
    }
 
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;
 
    try {
      console.log("Deleting document with ID:", documentId);
      await axios.delete(`http://localhost:5104/api/Qtech/Documentations/${documentId}`);
      setDocuments(documents.filter((doc) => doc.docId !== documentId));
    } catch (error) {
      console.error("Error deleting document:", error.response ? error.response.data : error.message);
      alert("Error deleting document: " + error.message);
    }
  };
 
  return (
    <div className="w-full p-6">
      {/* Playlists Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div key={playlist.playlistId} className="border p-4 rounded-lg shadow-md bg-white">
            <img
              src={playlist.imageUrl || playlist.img}
              alt={playlist.title}
              className="w-full h-40 object-cover rounded-lg"
              onError={(e) => {
                console.error(`Image failed to load: ${playlist.imageUrl}`);
                e.target.src = playlist.img || "/fallback-image.jpg";
              }}
            />
            <p className="mt-2 text-center font-semibold">{playlist.title}</p>
            <p className="text-sm text-gray-600 text-center">{playlist.description}</p>
            <div className="flex gap-4 justify-center mt-3">
              <button
                className="border border-violet-600 px-4 py-2 rounded cursor-pointer hover:bg-violet-600 hover:text-white transition"
                onClick={() => handleSelectPlaylist(playlist)}
              >
                Documents
              </button>
            </div>
          </div>
        ))}
      </div>
 
      {/* Document Container */}
      {selectedPlaylist && (
        <div ref={docContainerRef} className="mt-8 p-6 bg-violet-100 rounded-lg shadow-lg w-full border">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Documents for {selectedPlaylist.title}
          </h3>
 
          {documents.filter(doc => doc.playlistId === selectedPlaylist.playlistId).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {documents.filter(doc => doc.playlistId === selectedPlaylist.playlistId).map((doc) => (
                <div key={doc.documentId} className="border rounded-lg p-4 shadow-md bg-white flex flex-col items-center w-full">
                  <h4 className="font-medium mt-3 text-lg">{doc.title}</h4>
                  <p className="text-sm text-gray-600">{doc.content}</p>
                  <a
                    href={doc.url}
                    className="text-blue-600 hover:underline mt-1 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleEditDoc(doc)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteDoc(doc.docId)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No documents available</p>
          )}
          <button
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={() => setSelectedPlaylist(null)}
          >
            Close
          </button>
        </div>
      )}
 
      {/* Edit Form */}
      {editingDocId && (
        <div ref={editFormRef} className="w-3/4 mx-auto p-6 bg-violet-100 rounded shadow-lg mt-8 border-2">
          <h2 className="text-lg font-semibold mb-4">Edit Document (ID: {editingDocId})</h2>
 
          <input type="text" value={docEditData.title || ""} onChange={(e) => setDocEditData({ ...docEditData, title: e.target.value })} className="border p-3 rounded w-full mb-3 bg-white" placeholder="Title"/>
          <input type="text" value={docEditData.content || ""} onChange={(e) => setDocEditData({ ...docEditData, content: e.target.value })} className="border p-3 rounded w-full mb-3 bg-white" placeholder="content"/>
          <input type="text" value={docEditData.url || ""} onChange={(e) => setDocEditData({ ...docEditData, url: e.target.value })} className="border p-3 rounded w-full mb-3 bg-white" placeholder="Document URL"/>
 
          <div className="flex gap-4">
            <button onClick={handleSaveDoc} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"><FaCheck className="mr-2" /> Save</button>
            <button onClick={() => setEditingDocId(null)} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center"><FaTimes className="mr-2" /> Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default AdminDocs;