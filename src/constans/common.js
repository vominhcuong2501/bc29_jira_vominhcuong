export const BASE_URL = 'https://casestudy.cyberlearn.vn/api';
export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const USER_LOGIN_KEY = "USER_LOGIN_KEY"
const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyOSIsIkhldEhhblN0cmluZyI6IjE5LzAxLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NDA4NjQwMDAwMCIsIm5iZiI6MTY0NTk4MTIwMCwiZXhwIjoxNjc0MjM0MDAwfQ.YESwad1hPeFZLi1alQUINpqBwiG-eLBBTADYwGZBfQc"
export const AUTHORIZATION = { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN).replace(/['"]+/g, '')}` }
// "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiIxMTNAZ21haWwuY29tIiwibmJmIjoxNjYyMDAxOTIxLCJleHAiOjE2NjIwMDU1MjF9.fcPGLUydr8CslRsXSrdzrIX3zHUKNV8UpV_b94GjVdo"