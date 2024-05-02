import { privateApi, publicApi } from "./axios";

export const passwordlessLogin = async (data: any) => {
  const res = await publicApi.post("/auth/send-login-otc", data);
  return res.data;
};
export const passwordlessOtpVerification = async (data: any) => {
  const res = await publicApi.post("/auth/verify-login-otc", data);
  return res.data;
};


// Private APIs
// Mutate
export const strimKey = async (data: any) => {
  const res = await publicApi.post("/shared/trim-merchant-token", data);
  return res.data;
};
export const unlockFunds = async (data: any) => {
  const res = await privateApi.post("/merchants/customers/unlock-funds", data, {
    params:{
      merchant: localStorage.getItem('merchant')
    }});
  return res.data;
};


// Queries
export const getTransactions = async ({search, page, size}:{search?: string; page?: number; size?: number;}) => {
  const res = await privateApi.get("/merchants/customer-transactions", 
  {
    params:{
      search,
      page,
      size,
      merchant: localStorage.getItem('merchant')
    }
  });
  return res.data;
};
