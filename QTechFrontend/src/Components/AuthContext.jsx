import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState(null);
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for authentication state
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    const userMail = localStorage.getItem("mail");

    if (token && userRole && userMail) {
      setIsLogged(true);
      setRole(userRole);
      setMail(userMail);
    }
    setLoading(false);
  }, []);

  const login = (token, userRole, userMail) => {
    setIsLogged(true);
    setRole(userRole);
    setMail(userMail);

    // Store in localStorage for persistence
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    localStorage.setItem("mail", userMail);
  };

  const logout = () => {
    setIsLogged(false);
    setRole(null);
    setMail(null);

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("mail");

    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLogged, role, mail, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLogged, setIsLogged] = useState(false);
//   const [role, setRole] = useState(null);
//   const [mail, setMail] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check localStorage for authentication state
//     const token = localStorage.getItem("token");
//     const userRole = localStorage.getItem("role");
//     const userMail = localStorage.getItem("mail");

//     if (token && userRole && userMail) {
//       setIsLogged(true);
//       setRole(userRole);
//       setMail(userMail);
//     }
//   }, []);

//   const login = (token, userRole, userMail) => {
//     setIsLogged(true);
//     setRole(userRole);
//     setMail(userMail);

//     // Store in localStorage for persistence
//     localStorage.setItem("token", token);
//     localStorage.setItem("role", userRole);
//     localStorage.setItem("mail", userMail);
//   };

//   const logout = () => {
//     setIsLogged(false);
//     setRole(null);
//     setMail(null);

//     // Clear localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("mail");

//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ isLogged, role, mail, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;