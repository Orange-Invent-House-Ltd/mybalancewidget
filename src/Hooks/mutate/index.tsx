import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { passwordlessLogin, passwordlessOtpVerification, strimKey, unlockFunds} from "../../api";


export const usePasswordlessLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationFn: passwordlessLogin,
    onSuccess: (data) => {
      localStorage.setItem("tempId", data.data.tempId);
      localStorage.setItem("email", data.data.email);
      toast.success(data.message, {
        toastId: 'success1'
      });
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.errors === null ? resMessage = error.response.data.message : 
      resMessage = error.response.data.errors.email[0]
      toast.error(resMessage, {
        toastId: 'error1'
      });
    },
  });
};

export const usePasswordlessOtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationFn: passwordlessOtpVerification,
    onSuccess: (data) => {
      localStorage.setItem("session_token", data.data.token);
      localStorage.setItem("email", data.data.email);
      toast.success(data.message, {
        toastId: 'success1'
      });
      if(data?.data?.phoneNumberFlagged){
        navigate("/change-phone-number");
      }else if(data?.data?.user?.isBuyer) {
        navigate("/buyer/dashboard");
      }else{
        navigate("/seller/dashboard");
      }
      // navigate("/passwordless-otp-verification"); 
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.errors === null ? resMessage = error.response.data.message : 
      resMessage = error.response.data.errors.email[0]
      toast.error(resMessage,{
        toastId: 'error1'
      });
    },
  });
};

export const useStrimKey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationFn: strimKey,
    onSuccess: (data) => {
      localStorage.setItem("session_token", data.data.token)
      localStorage.setItem("merchant", data.data.merchantId);
      localStorage.setItem("email", 'tosxnthedesigner@gmail.com');
      // toast.success(data.message, {
      //   toastId: 'success1'
      // });
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.errors === null ? resMessage = error.response.data.message : 
      resMessage = error.response.data.errors.error[0]
      toast.error(resMessage,{
        toastId: 'error1'
      });
    },
  });
};

export const useUnlockFunds = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: unlockFunds,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['transactions'] as InvalidateQueryFilters)
      toast.success(data.message, {
        toastId: 'success1'
      });
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.errors === null ? resMessage = error.response.data.message : 
      error.response.data.error ? resMessage = error.response.data.error :
      resMessage = error.response.data.errors.error[0] 
      toast.error(resMessage,{
        toastId: 'error1'
      });
    },
  });
};