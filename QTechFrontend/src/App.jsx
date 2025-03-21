// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import '../src/index.css';
// import Login from './Components/Login';
// import ChangePassword from './Components/ChangePassword';
// import Register from './Components/Register';
// import Courses from './Components/Courses';
// import About from './Components/About';
// import AdminDashBoard from './Components/AdminDashBoard';
// import ManagerDashBoard from './Components/ManagerDashBoard';
// import UserDashBoard from './Components/UserDashBoard';
// import AdminUsers from './Components/AdminUsers';
// import Contact from './Components/Contact';
// import Home from './Components/Home';
// import MainHeader from './Components/MainHeader';
// import DashBoardHeader from './Components/DashBoardHeader';
// import { useContext } from 'react';
// import AuthContext from './Components/AuthContext';
// import ProtectedRoute from './Components/ProtectedRoute';

// function App() {
//   const { isLogged } = useContext(AuthContext);

//   return (
//     <>
//       {isLogged ? <DashBoardHeader /> : <MainHeader />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Courses" element={<Courses />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/About" element={<About />} />
//         <Route path="/Contact" element={<Contact />} />
//         <Route path="/Register" element={<Register />} />

//         <Route element={<ProtectedRoute roles={['Admin']} />}>
//           <Route path="/Admin/Home" element={<AdminDashBoard />} />
//           <Route path="/Admin/Actions" element={<AdminDashBoard />} />
//           <Route path="/Admin/Users" element={<AdminUsers />} /> 
//           <Route path="/Admin/courses" element={<UserDashBoard />} /> 
//           <Route path="/Admin/About" element={<About/>} />
//           <Route path="/Admin/Contact" element={<Contact/>} />
//         </Route>

//         <Route element={<ProtectedRoute roles={['Manager']} />}>
//           <Route path="/Manager/Home" element={<ManagerDashBoard />} />
//           <Route path="/Manager/Actions" element={<ManagerDashBoard />} />
//         </Route>

//         <Route element={<ProtectedRoute roles={['User']} />}>
//           <Route path="/UserDashBoard" element={<UserDashBoard />} />
//           <Route path="/User/courses" element={<UserDashBoard />} />
//           <Route path="/User/About" element={<About/>} />
//           <Route path="/User/Contact" element={<Contact/>} />
//         </Route>
//         <Route element={<ProtectedRoute roles={['User','Admin','Manager']} />}>
          
//           <Route path="/User/courses" element={<UserDashBoard />} />
//           <Route path="/User/About" element={<About/>} />
//           <Route path="/Admin/Contact" element={<Contact/>} />
//           <Route path="/Manager/courses" element={<UserDashBoard />} />
//           <Route path="/Manager/About" element={<About/>} />
//           <Route path="/Manager/Contact" element={<Contact/>} />
//         </Route>

//         <Route element={<ProtectedRoute />}>
//           <Route path="/ChangePassword" element={<ChangePassword />} />
//         </Route>
//       </Routes>
//     </>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../src/index.css';
import Login from './Components/Login';
import ChangePassword from './Components/ChangePassword';
import Register from './Components/Register';
import MainHome from './Components/MainHome';
import Courses from './Components/Courses';
import About from './Components/About';
import AdminDashBoard from './Components/AdminDashBoard';
import ManagerDashBoard from './Components/ManagerDashBoard';
import UserDashBoard from './Components/UserDashBoard';
import AdminUsers from './Components/AdminUsers';
import Contact from './Components/Contact';
import Home from './Components/Home';
import MainHeader from './Components/MainHeader';
import { useContext } from 'react';
import AuthContext from './Components/AuthContext';
import DashBoardHeader from './Components/DashBoardHeader';
import ProtectedRoute from './Components/ProtectedRoute';
 
function App() {
  const { isLogged } = useContext(AuthContext);
 
  return (
    <>
      {isLogged ?<DashBoardHeader /> : <MainHeader />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Courses' element={<Courses />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Register' element={<Register />} />
 
        <Route element={<ProtectedRoute roles={['Admin']} />}>
          <Route path='/Admin/Home' element={<AdminDashBoard />} />
          <Route path='/Admin/Actions' element={<AdminDashBoard />} />
          <Route path='/AdminUsers' element={<AdminUsers />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
        </Route>
 
        <Route element={<ProtectedRoute roles={['Manager']} />}>
          <Route path='/Manager/Home' element={<ManagerDashBoard />} />
          <Route path='/Manager/Actions' element={<ManagerDashBoard />} />
          <Route path='/Manager/About' element={<About />} />
          <Route path='/Manager/Contact' element={<Contact />} />
 
        </Route>
 
        <Route element={<ProtectedRoute roles={['User']} />}>
          <Route path='/UserDashBoard' element={<UserDashBoard />} />
         
        </Route>
 
        <Route element={<ProtectedRoute roles={['User','Admin','Manager']}/>}>
        <Route path='/User/courses' element={<UserDashBoard />} />
        <Route path='/User/about' element={<About />} />
        <Route path='/User/contact' element={<Contact />} />
        </Route>
       
        
          <Route path='/ChangePassword' element={<ChangePassword />} />
         
       
      </Routes>
    </>
  );
}
export default App;


