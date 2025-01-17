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
    params: {
      merchant: localStorage.getItem("merchant"),
    },
  });
  return res.data;
};
export const raiseADispute = async ({id, data}:any) => {
  const res = await privateApi.post(`/merchants/customer-transactions/${id}`, data);
  return res.data;
};
export const initiateWithdrawal = async (data: any) => {
  const res = await privateApi.post(
    "/merchants/customers/initiate-withdrawal",
    data,
    {
      params: {
        merchant: localStorage.getItem("merchant"),
      },
    }
  );
  return res.data;
};

export const LookUpBank = async (data: any) => {
  const res = await privateApi.post("/shared/lookup/nuban", data);
  return res.data;
};

export const sellerOtpVerification = async (data: any) => {
  const res = await privateApi.post(
    "/merchants/customers/confirm-withdrawal",
    data
  );
  return res.data;
};

// Queries
// Transactions
export const getTransactions = async ({
  search,
  page,
  size,
  currency,
}: {
  search?: string;
  page?: number;
  size?: number;
  currency?: string;
}) => {
  const res = await privateApi.get("/merchants/customer-transactions", {
    params: {
      search,
      page,
      size,
      currency,
      merchant: localStorage.getItem("merchant"),
    },
  });
  return res.data;
};
export const getTransaction = async ({
  id,
  search,
  page,
  size,
  currency,
}: {
  id: string;
  search?: string;
  page?: number;
  size?: number;
  currency?: string;
}) => {
  const res = await privateApi.get(`/merchants/customer-transactions/${id}`, {
    params: {
      id,
      search,
      page,
      size,
      currency,
      merchant: localStorage.getItem("merchant"),
    },
  });
  return res.data.data;
};
export const getBanks = async () => {
  const res = await publicApi.get("/shared/banks");
  return res.data;
};
export const getProfile = async () => {
  const res = await privateApi.get("/auth/profile");
  return res.data.data;
};
export const getMerchantWallet= async () => {
  const res = await privateApi.get("/merchants/wallets");
  return res.data.data;
};
// Users
export const getUserWallet = async (id:number) => {
  const res = await privateApi.get(`/console/users/${id}/wallets/`);
  return res.data.data;
}; 
// Disputes
export const getDispute = async (id:any) => {
  const res = await privateApi.get(`/dispute/${id}`);
  return res.data.data;
};