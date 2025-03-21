import React from 'react';

const AdminCourseDetails = ({ courses }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-violet-800">Popular Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-gray-700">{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourseDetails;