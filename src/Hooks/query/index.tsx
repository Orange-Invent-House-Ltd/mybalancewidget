import { useQuery } from "@tanstack/react-query";
import { login } from "../../api";


export const useLogin = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: login,
  });
};