export const BASE_URL = 'https://casestudy.cyberlearn.vn/api';
export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const USER_LOGIN_KEY = "USER_LOGIN_KEY"
const TOKEN = "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtaW5oY3VvbmdAZ21haWwuY29tIiwibmJmIjoxNjYxNDM3MDI2LCJleHAiOjE2NjE0NDA2MjZ9.Jw7uQaCDnuhGaS7MuJ5ZJrqCHKTbwVn19X_OCYbAG9M"
export const AUTHORIZATION = { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN).replace(/['"]+/g, '')}` }