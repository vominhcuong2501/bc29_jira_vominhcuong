import { USER_LOGIN_KEY } from "../constans/common";

// check sau khi login để lấy accesToken 
// request: yêu cầu gửi lên api:  A => interceptors => B
request.interceptors.request.use((config) => {
    let userInfo = localStorage.getItem(USER_LOGIN_KEY);
  
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      // Bearer: tiêu chuẩn json web token
      config.headers.Authorization = `Bearer ${userInfo?.accessToken}`;
    }
  
    return config;
  });
  
  // response: giá trị api trả về: A => interceptors => B
  request.interceptors.response.use((response) => {
    return response;
  });
  