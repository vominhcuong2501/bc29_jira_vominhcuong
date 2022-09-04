export const BASE_URL = 'https://casestudy.cyberlearn.vn/api';
export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const USER_LOGIN_KEY = "USER_LOGIN_KEY"
export const AUTHORIZATION = { "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN).replace(/['"]+/g, '')}` }

