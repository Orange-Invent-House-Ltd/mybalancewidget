import { useQuery } from "@tanstack/react-query";
import { getProfile, getBanks, getTransactions } from "../../api";

export const useTransactions = ({
  search,
  page,
  size,
}: {
  search?: string;
  page?: number;
  size?: number;
}) => {
  return useQuery({
    queryKey: ["transactions", search, page, size],
    queryFn: () => getTransactions({ search, page, size }),
  });
};

export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });
};
export const useProfile= () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};
