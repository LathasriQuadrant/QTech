// import { useState } from "react";
import { Link } from "react-router-dom";

import Courses from "./Courses";
import About from "./About";
import Contact from "./Contact";
import MainHeader from "./MainHeader";


const MainHome = () => {
  return (
    <> 
    {/* <MainHeader/> */}
    <div>
      <Courses/> 
       <About/>  
      <Contact/>
      </div>
    </>
  );
};

export default MainHome;
