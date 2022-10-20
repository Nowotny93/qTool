import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllPOs(){
    return await api.get(host + `/data/POs?sortBy=_createdOn%20desc`);
}

export async function createPO(data){
    return await api.post(host + `/data/POs`, data );
}

export async function getPOById(id) {
    return await api.get(host + `/data/POs/${id}`);
}

export async function editPO(id, data){
    return await api.put(host + `/data/POs/${id}`, data)
}

export async function deletePO(id) {
    return await api.del(host + `/data/POs/${id}`);
}

export async function getUserPOs(userId){
    return await api.get(host+ `/data/POs?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function searchByPO(query){
    return await api.get(host + `/data/POs?where=PO_Number%3D${query}`)
}