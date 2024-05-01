import { useQuery } from "@tanstack/react-query";
import { getTransactions} from "../../api";


export const useTransactions = ({search, page, size}:{search?: string; page?: number; size?: number;}) => {
  return useQuery({
    queryKey: ["transactions", search, page, size],
    queryFn: () => getTransactions({search, page, size}),
  });
};