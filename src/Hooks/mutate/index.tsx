import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { login, passwordlessLogin, passwordlessOtpVerification } from "../../api";


export const usePasswordlessLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return useMutation({
    mutationFn: passwordlessLogin,
    onSuccess: (data) => {
      localStorage.setItem("tempId", data.data.tempId);
      localStorage.setItem("email", data.data.email);
      toast.success(data.message);

      if (location.state?.from) {
        navigate(location.state.from);
        return;
      }
      if(data?.data?.phoneNumberFlagged){
        navigate("/change-phone-number");
      }else{
        navigate("/passwordless-otp-verification");
      }
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.errors === null ? resMessage = error.response.data.message : 
      resMessage = error.response.data.errors.email[0]
      toast.error(resMessage);
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
      toast.success(data.message);
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
      toast.error(resMessage);
    },
  });
};

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