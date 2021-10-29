import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//special requests for this SPA

export async function getAllBooks() {
    return await api.get(host + '/data/books?sortBy=_createdOn%20desc');
}

export async function getBookById(id){
    return await api.get(host + '/data/books/' + id);
}

export async function createBook(data){
    return await api.post(host + '/data/books', data);
}
 
export async function editBook(id, data){
    return await api.put(host + `/data/books/${id}`, data);
}

export async function deleteBook(id){
    return await api.del(host + `/data/books/${id}`);
}

export async function getMyBooks(ownerId){
    return await api.get(host + `/data/books?where=_ownerId%3D%22${ownerId}%22&sortBy=_createdOn%20desc`);
}

//bonus
export async function addLike(id){
    return await api.post(host + `/data/likes`, id);
}

export async function bookLikesById(id) {
    return await api.get(host + `/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function getLikesByUser(id, ownerId){
    return await api.get(host + `/data/likes?where=bookId%3D%22${id}%22%20and%20_ownerId%3D%22${ownerId}%22&count`)
}