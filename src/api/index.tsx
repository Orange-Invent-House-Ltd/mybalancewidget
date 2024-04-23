import { privateApi, publicApi } from "./axios";

export const passwordlessLogin = async (data: string) => {
  const res = await publicApi.post("/auth/send-login-otc", data);
  return res.data;
};
export const passwordlessOtpVerification = async (data: any) => {
  const res = await publicApi.post("/auth/verify-login-otc", data);
  return res.data;
};


// Private APIs
// Queries
export const getTransactions = async ({search, page, size}:{search?: string; page?: number; size?: number;}) => {
  const res = await privateApi.get("/merchants/customer-transactions", {
    params:{
      search,
      page,
      size
    }
  });
  return res.data;
};
