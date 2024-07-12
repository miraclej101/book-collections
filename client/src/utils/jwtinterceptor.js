import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    // เขียน Logic ในการแนบ Token เข้าไปใน Header ของ Request
    // เมื่อมีการส่ง Request จาก Client ไปหา Server
    // ภายใน Callback Function axios.interceptors.request.use
    const hasToken = localStorage.getItem("token");
    if(hasToken) {
      req.headers = {
      ...req.headers,
      authorization: `Bearer ${window.localStorage.getItem("token")}`	
      }
    }
    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      // เขียน Logic ในการรองรับเมื่อ Server ได้ Response กลับมาเป็น Error
      // โดยการ Redirect ผู้ใช้งานไปที่หน้า Login และลบ Token ออกจาก Local Storage
      // ภายใน Error Callback Function ของ axios.interceptors.response.use
        if( error.response.status === 401 && 
            error.response.statusText === "Unauthorizied"
        ) {
          window.localStorage.removeItem("token");
          window.location.replace("/login");
        }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
