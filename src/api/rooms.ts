import api from './axios';

export const getMyRooms = () => api.get('/rooms').then(r => r.data);
export const getRoom = (id: string) => api.get(`/rooms/${id}`).then(r => r.data);
export const createRoom = (name: string) => api.post('/rooms', { name }).then(r => r.data);
export const joinRoom = (inviteCode: string) => api.post('/rooms/join', { inviteCode }).then(r => r.data);