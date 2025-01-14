import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getProfile, getBanks, getTransactions, getMerchantWallet, getUserWallet, getTransaction } from "../../api";

export const useTransactions = ({
  currency,
  search,
  page,
  size,
}: {
  search?: string;
  page?: number;
  size?: number;
  currency?: string;
}) => {
  return useQuery({
    queryKey: ["transactions", currency, search, page, size],
    queryFn: () => getTransactions({ currency, search, page, size }),
  });
};
export const useTransaction = ({
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
  return useQuery({
    queryKey: ["transaction", id, search, page, size, currency],
    queryFn: () => getTransaction({ id, search, page, size, currency }),
  });
};

export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};
export const useMercahntWallet = () => {
  return useQuery({
    queryKey: ["merchantWallet"],
    queryFn: getMerchantWallet,
  });
};
// Users
export const useUserWallet = (id:number) => {
  return useQuery({
    queryKey: ["userWallet", id],
    queryFn: () => getUserWallet(id),
  });
};
