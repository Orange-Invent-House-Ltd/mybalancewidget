import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { login } from "../../api";

export const useCheckPhoneNumber = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.error('user with this phone number already exist. Use another Phone number',{
        toastId: "error1",
      });
    },
    onError: (error: any) => {
      // toast.error(error.response.data.message);
    },
  });
};