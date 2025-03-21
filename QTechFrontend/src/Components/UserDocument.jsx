import React, { useState, useEffect } from "react";
import axios from "axios";
 
const UserDocument = ({ playlistId, onClose }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`http://localhost:5104/api/Qtech/Documentations`);
 
        // ✅ Filter documents based on selected playlistId
        const filteredDocs = response.data.filter(doc => doc.playlistId === playlistId);
       
        setDocuments(filteredDocs);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch documents. Please try again.");
        setLoading(false);
        console.error("Error fetching documents:", error);
      }
    };
 
    if (playlistId) {
      fetchDocuments();
    }
  }, [playlistId]);
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
 
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Documents</h1>
 
        {documents.length === 0 ? (
          <p className="text-gray-600 text-center">No documents available for this playlist.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {documents.map((document) => (
              <div key={document.docId} className="border p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">{document.title}</h2>
                <p className="mt-2 text-sm">{document.content}</p>
                <a
                  href={document.url}
                  download
                  className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
                >
                  Download Document
                </a>
              </div>
            ))}
          </div>
        )}
 
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};
 
export default UserDocument;