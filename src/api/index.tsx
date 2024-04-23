import { publicApi } from "./axios";

export const passwordlessLogin = async (data: string) => {
  const res = await publicApi.post("/auth/send-login-otc", data);
  return res.data;
};
export const passwordlessOtpVerification = async (data: any) => {
  const res = await publicApi.post("/auth/verify-login-otc", data);
  return res.data;
};
export const login = async (data: any) => {
  const res = await publicApi.post("/auth/login", data);
  return res.data;
};