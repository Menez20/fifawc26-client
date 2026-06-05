import api from './axios';

export const submitPrediction = (data: {
  matchId: string;
  roomId: string;
  predictedHome: number;
  predictedAway: number;
}) => api.post('/predictions', data).then(r => r.data);

export const getMyPredictions = (roomId: string) =>
  api.get(`/predictions/room/${roomId}`).then(r => r.data);

export const getLeaderboard = (roomId: string) =>
  api.get(`/predictions/room/${roomId}/leaderboard`).then(r => r.data);