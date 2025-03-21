import MainHeader from "./MainHeader";
import MainHome from "./MainHome"

// import React from 'react';

// const About = () => {
//   return (
//     <div className="p-8 bg-gray-100">
//       <h1 className="text-4xl font-bold mb-4">About Us</h1>
//       <p className="mb-4">
//         Welcome to <strong>QTech E-Learning</strong>! At QTech E-Learning platform we are dedicated to providing high-quality, accessible, and affordable education to learners around the world. Our mission is to empower individuals with the knowledge and skills they need to succeed in their personal and professional lives.
//       </p>
//       <h2 className="text-2xl font-semibold mb-2">Our Story</h2>
//       <p className="mb-4">
//         Founded in 2025, QTech E-Learning was born out of a passion for education and a desire to make learning more accessible. Our founders, [Founder Names], envisioned a platform where anyone, regardless of their background or location, could access top-notch educational resources.
//       </p>
//       <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
//       <ul className="list-disc list-inside mb-4">
//         <li><strong>Diverse Courses:</strong> We offer a wide range of courses in various fields, including technology, business, arts, and more. Whether you're looking to learn a new skill or advance your career, we have something for everyone.</li>
//         <li><strong>Expert Instructors:</strong> Our courses are taught by industry experts and experienced educators who are passionate about sharing their knowledge.</li>
//         <li><strong>Flexible Learning:</strong> Learn at your own pace, on your own schedule. Our platform is designed to fit into your busy life.</li>
//         <li><strong>Community Support:</strong> Join a community of learners and educators. Share your experiences, ask questions, and collaborate with others.</li>
//       </ul>
//       <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
//       <p className="mb-4">
//         Our team is made up of dedicated professionals who are committed to making education accessible to all. From our instructors to our support staff, everyone at [Your E-Learning Platform Name] is here to help you succeed.
//       </p>
//       <h2 className="text-2xl font-semibold mb-2">Join Us</h2>
//       <p>
//         Ready to start your learning journey? Explore our courses and join the thousands of learners who have already benefited from our platform. Together, we can achieve great things.
//       </p>
//     </div>
//   );
// };

// export default About;

import React from "react";
 
const About = () => {
  return (
    <> 
 {/* <MainHeader/> */}
<div className="max-w-3xl mx-auto p-6 text-center mt-20">
<h2 className="text-3xl font-bold text-purple-800 mb-4">About QTech</h2>
<p className="text-gray-700 text-s mb-4">
        Welcome to <span className="font-semibold">QTech E-Learning</span>, your ultimate destination for high-quality e-learning. 
        We aim to bridge the gap between learners and experts through interactive and engaging courses.
</p>
<h3 className="text-xl font-semibold text-purple-800 mb-3">Our Mission</h3>
<p className="text-gray-700 text-s mb-4">
        Our mission is to empower individuals with knowledge and skills that help them excel in their careers.
        With our carefully curated content, we ensure a seamless and effective learning experience.
</p>
<h3 className="text-xl font-semibold text-purple-800 mb-3">Why Choose Us?</h3>
<ul className="list-disc list-inside text-gray-700 text-s mb-4">
<li>Expert-led courses tailored for all levels</li>
<li>Interactive learning modules </li>
<li>24/7 accessibility across multiple devices</li>

</ul>
<p className="text-gray-700 text-lg">
        Join us today and start your journey toward success with QTech!
</p>
</div>
</>
  );
};
 
export default About;