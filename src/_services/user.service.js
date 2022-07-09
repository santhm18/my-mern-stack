import axios from "axios";
const url = 'http://localhost:5000';

export const fetchMemories = (headers) => axios.get(`${url}/memory/getMemories`,{headers:headers});
export const createMemory = (memory,headers) => axios.post(`${url}/memory/createMemory`, memory, {headers:headers});
export const updateMemory = (id, updatedMemory,headers) => axios.patch(`${url}/memory/getMemory/${id}`, updatedMemory, {headers:headers});
export const deleteMemory = (id,headers) => axios.delete(`${url}/memory/getMemory/${id}`, {headers:headers});
export const contactUsDetails = (contactDetails,headers) => axios.post(`${url}/send`,contactDetails, {headers:headers});
export const registerUser = (user) => axios.post(`${url}/user/register`, user);
export const loginUser = (user) => axios.post(`${url}/user/login`, user);
export const logoutUser = (token,headers) => axios.post(`${url}/user/logout`, token, {headers:headers});