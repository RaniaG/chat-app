import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('chatApp')}`;
debugger;


export const login = (userCredentials) => {
    return axios.post('/users/login', userCredentials);
}
export const checkUsername = (username) => {
    return axios.post('/users/username', { username });
}
export const signup = (userCredentials) => {
    return axios.post('/users', userCredentials);
}
export const editMessage = (id, message) => {
    return axios.patch('/messages', { id, message }, { headers: { "Authorization": `Bearer ${localStorage.getItem('chatApp')}` } });
}
export const getSentMessages = () => {
    return axios.get('/messages/sent', { headers: { "Authorization": `Bearer ${localStorage.getItem('chatApp')}` } });
}
export const getRecievedMessages = () => {
    return axios.get('/messages/recieved', { headers: { "Authorization": `Bearer ${localStorage.getItem('chatApp')}` } });
}
export const getAllUsers = () => {
    debugger;
    return axios.get('/users', { headers: { "Authorization": `Bearer ${localStorage.getItem('chatApp')}` } });
}
export const getUserInfo = () => {
    return axios.get('/users/info', { headers: { "Authorization": `Bearer ${localStorage.getItem('chatApp')}` } });
}
export const updateUserInfo = (userInfo) => {
    return axios.patch('/users', userInfo, { headers: { "Authorization": `Bearer ${localStorage.getItem('chatApp')}` } });
}
export const changePassword = (passwords) => {
    return axios.patch('/users/pass', passwords, { headers: { "Authorization": `Bearer ${localStorage.getItem('chatApp')}` } });
}
export const sendMessage = (reciever, message) => {
    return axios.post('/messages', { reciever, message }, { headers: { "Authorization": `Bearer ${localStorage.getItem('chatApp')}` } });
}
export const deleteMessage = (id) => {
    debugger;
    return axios.delete('/messages', { data: { id }, headers: { "Authorization": `Bearer ${localStorage.getItem('chatApp')}` } });
}