import api from "./axios";

export const getMatches = () => api.get("/matches").then((r) => r.data);
export const getLiveMatches = () =>
  api.get("/matches/live").then((r) => r.data);
export const getMatch = (id: string) =>
  api.get(`/matches/${id}`).then((r) => r.data);
export const getGroups = () => api.get("/matches/groups").then((r) => r.data);
