// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { FaPlus, FaTrash, FaEdit, FaVideo, FaSave, FaTimes } from 'react-icons/fa';
 
// const AdminPlaylists = () => {
//   const [list, setList] = useState([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAddingVideo, setIsAddingVideo] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [data, setData] = useState({
//     title: '',
//     content: '',
//     url: '',
//     playlistId: 0
//   });
//   const [vdata, setVdata] = useState({
//     title: '',
//     url: '',
//     playlistId: 0
//   });
//   const [editData, setEditData] = useState({
//     playlistId: 0,
//     title: '',
//     description: ''
//   });
 
//   useEffect(() => {
//     axios.get('http://localhost:5104/api/Qtech/Playlists')
//       .then((res) => setList(res.data));
//   }, []);
 
//   const handleAddClick = (id) => {
//     setData({ title: '', content: '', url: '', playlistId: id });
//     setIsAdding(true);
//     setIsAddingVideo(false);
//     setEditingId(null);
//   };
 
//   const handleVideoClick = (id) => {
//     setVdata({ title: '', url: '', playlistId: id });
//     setIsAdding(false);
//     setIsAddingVideo(true);
//     setEditingId(null);
//   };
 
//   const handleEditClick = (id, title, description) => {
//     setEditData({ playlistId: id, title, description });
//     setEditingId(id);
//     setIsAdding(false);
//     setIsAddingVideo(false);
//   };
 
//   const handleSave = () => {
//     axios.post('http://localhost:5104/api/Qtech/Documentations', data)
//       .then(() => {
//         alert("Document added successfully");
//         setIsAdding(false);
//       })
//       .catch((err) => alert("Error: " + err.message));
//   };
 
//   const handleVideoSave = () => {
//     axios.post('http://localhost:5104/api/Qtech/Videos', vdata)
//       .then(() => {
//         alert("Video added successfully");
//         setIsAddingVideo(false);
//       })
//       .catch((err) => alert("Error: " + err.message));
//   };
 
//   const handleEditSave = () => {
//     axios.put(`http://localhost:5104/api/Qtech/Playlists/${editData.playlistId}`, editData)
//       .then(() => {
//         alert("Updated successfully");
//         setEditingId(null);
//       })
//       .catch((err) => alert("Error: " + err.message));
//   };
 
//   const deletePlaylist = (id) => {
//     axios.delete(`http://localhost:5104/api/Qtech/Playlists/${id}`)
//       .then(() => {
//         alert("Deleted successfully");
//         setList(list.filter(playlist => playlist.playlistId !== id));
//       })
//       .catch((err) => alert("Error: " + err.message));
//   };
 
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center text-violet-700 mb-6">Playlists</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {list.map((d) => (
//           <div key={d.playlistId} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
//             {editingId === d.playlistId ? (
//               <div>
//                 <input type="text" className="border p-2 w-full mb-2" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
//                 <input type="text" className="border p-2 w-full mb-2" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
//                 <div className="flex gap-2">
//                   <button onClick={handleEditSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
//                     <FaSave /> Save
//                   </button>
//                   <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2">
//                     <FaTimes /> Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{d.title}</h3>
//                 <p className="text-gray-600 mb-4">{d.description}</p>
//                 <div className="flex flex-wrap gap-3 mt-4">
//                   <button onClick={() => handleAddClick(d.playlistId)} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
//                     <FaPlus /> Document
//                   </button>
//                   <button onClick={() => handleVideoClick(d.playlistId)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
//                     <FaVideo /> Video
//                   </button>
//                   <button onClick={() => handleEditClick(d.playlistId, d.title, d.description)} className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
//                     <FaEdit /> Edit
//                   </button>
//                   <button onClick={() => deletePlaylist(d.playlistId)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
//                     <FaTrash /> Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
 
// export default AdminPlaylists;


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaVideo, FaSave, FaTimes } from 'react-icons/fa';

const AdminPlaylists = () => {
  const [list, setList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [data, setData] = useState({
    title: '',
    content: '',
    url: '',
    playlistId: 0
  });
  const [vdata, setVdata] = useState({
    title: '',
    url: '',
    playlistId: 0
  });
  const [editData, setEditData] = useState({
    playlistId: 0,
    title: '',
    description: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5104/api/Qtech/Playlists')
      .then((res) => setList(res.data));
  }, []);

  const handleAddClick = (id) => {
    setData({ title: '', content: '', url: '', playlistId: id });
    setIsAdding(true);
    setIsAddingVideo(false);
    setEditingId(null);
  };

  const handleVideoClick = (id) => {
    setVdata({ title: '', url: '', playlistId: id });
    setIsAdding(false);
    setIsAddingVideo(true);
    setEditingId(null);
  };

  const handleEditClick = (id, title, description) => {
    setEditData({ playlistId: id, title, description });
    setEditingId(id);
    setIsAdding(false);
    setIsAddingVideo(false);
  };

  const handleSave = () => {
    axios.post('http://localhost:5104/api/Qtech/Documentations', data)
      .then(() => {
        alert("Document added successfully");
        setIsAdding(false);
      })
      .catch((err) => alert("Error: " + err.message));
  };

  const handleVideoSave = () => {
    axios.post('http://localhost:5104/api/Qtech/Videos', vdata)
      .then(() => {
        alert("Video added successfully");
        setIsAddingVideo(false);
      })
      .catch((err) => alert("Error: " + err.message));
  };

  const handleEditSave = () => {
    axios.put(`http://localhost:5104/api/Qtech/Playlists/${editData.playlistId}`, editData)
      .then(() => {
        alert("Updated successfully");
        setEditingId(null);
      })
      .catch((err) => alert("Error: " + err.message));
  };

  const deletePlaylist = (id) => {
    axios.delete(`http://localhost:5104/api/Qtech/Playlists/${id}`)
      .then(() => {
        alert("Deleted successfully");
        setList(list.filter(playlist => playlist.playlistId !== id));
      })
      .catch((err) => alert("Error: " + err.message));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredList = list.filter(playlist =>
    playlist.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-violet-700 mb-6">Playlists</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((d) => (
          <div key={d.playlistId} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
            {editingId === d.playlistId ? (
              <div>
                <input type="text" className="border p-2 w-full mb-2" value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
                <input type="text" className="border p-2 w-full mb-2" value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} />
                <div className="flex gap-2">
                  <button onClick={handleEditSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                    <FaSave /> Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2">
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{d.title}</h3>
                <p className="text-gray-600 mb-4">{d.description}</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button onClick={() => handleAddClick(d.playlistId)} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
                    <FaPlus /> Document
                  </button>
                  <button onClick={() => handleVideoClick(d.playlistId)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <FaVideo /> Video
                  </button>
                  <button onClick={() => handleEditClick(d.playlistId, d.title, d.description)} className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => deletePlaylist(d.playlistId)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    <FaTrash /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPlaylists;

