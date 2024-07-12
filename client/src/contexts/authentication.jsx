import axios from "axios";
import { jwtDecode } from "jwt-decode";
//import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";

//const navigate = useNavigate();
const AuthContext = createContext();

export function AuthProvider({children}) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const login = async (data) => {
    //  Function `login` ทำหน้าที่สร้าง Request ไปที่ API user/login
    //  ที่สร้างไว้ด้านบนพร้อมกับ Body ที่กำหนดไว้ในตารางที่ออกแบบไว้
    try {
        const result = await axios.post("http://localhost:4000/user/login", data);
        const token =result.data.token;
        localStorage.setItem("token", token);
        const userDataFromToken = jwtDecode(token);
        console.log("userDataFromToken : ",userDataFromToken);
        setState({
          ...state,
          user: userDataFromToken,
        });
        return result;
    } catch (error) {
      console.log("error : ",error);
      return error;
    };
   // navigate("/");
  };

  const register = async (data) => {
    //  Function register ทำหน้าที่สร้าง Request ไปที่ API user/register
    //  ที่สร้างไว้ด้านบนพร้อมกับ Body ที่กำหนดไว้ในตารางที่ออกแบบไว้
    await axios.post("http://localhost:4000/user/register", data);
 //   navigate("/login");
  };

  const logout = () => {
    //  Function logout ทำหน้าที่ในการลบ JWT Token ออกจาก Local Storage
    localStorage.removeItem("token");
    setState({...state, user: null, error: null});
  };

  const isAuthenticated = Boolean(localStorage.getItem("token"));
  

  return (
    <AuthContext.Provider
      value={{ state, login, logout, register, isAuthenticated}}
    >
     {children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
export const useAuth = () => useContext(AuthContext);


