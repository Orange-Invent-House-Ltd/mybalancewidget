import { publicApi } from "./axios";


export const login = async (data: any) => {
  const res = await publicApi.post("/auth/login", data);
  return res.data;
};