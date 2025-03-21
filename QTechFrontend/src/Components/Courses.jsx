import { useNavigate } from "react-router-dom";
import cimage1 from "../assets/cimage.jpg";
import javascript from "../assets/javascript.jpg";
import python from "../assets/Python.jpg";
import react from "../assets/react.jpg";
import datascience from "../assets/datascience.jpg";
import machinelearning from "../assets/machinelearning.jpg";
import webdevelopment from "../assets/webdevelopment.jpg";
import android from "../assets/android.jpg";

const Courses = () => {
  const navigate = useNavigate();

  const courses = [
    { image: cimage1, title: "C# Tutorial" },
    { image: javascript, title: "JavaScript Basics" },
    { image: python, title: "Python for Beginners" },
    { image: react, title: "React Development" },
    { image: datascience, title: "Data Science with R" },
    { image: machinelearning, title: "Machine Learning" },
    { image: webdevelopment, title: "Web Development" },
    { image: android, title: "Android Development" },
  ];

  return (
    <div className="p-4">
      <h1 className="font-bold text-purple-800 text-3xl pl-14 text-center">
        Popular Courses
      </h1>
      <ul className="flex flex-wrap gap-13 items-center pl-14 pt-8 border-black cursor-pointer">
        {courses.map((course, index) => (
          <li
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform transform hover:-translate-y-1 hover:shadow-violet-600"
            onClick={() => navigate("/login")} // Navigate to login on click
          >
            <img className="w-50 h-40 rounded-lg" src={course.image} alt={course.title} />
            <p className="mt-2 text-xl font-bold text-center">{course.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
