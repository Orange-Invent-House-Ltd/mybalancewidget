import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Stepper from "../../../components/seller/Stepper";
import WithdrawalSuccess from "../../../components/seller/WithdrawalSuccess";
import { useInitiateOtpVerification } from "../../../Hooks/mutate";
import OtpInput from "../../../components/reuseable/OtpInput";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import Pusher from "pusher-js";
import formatToNairaCurrency from "../../../util/formatNumber";
import { Button } from "../../../components/reuseable/Buttons";
import check from "../../../assets/icon/check.svg";
import waves from "../../../assets/icon/waves.svg";
import loading from "../../../assets/icon/loadingSpinner.svg";
import warningIcon from "../../../assets/icon/warningIcon.svg";
import { useProfile } from "../../../Hooks/query";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import useStore from "../../../store";

function Verification() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const [filledCount, setFilledCount] = useState(0);
  const [modalMessageTitle, setModalMessageTitle] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isFailWithdraw, setIsFailWithdraw] = useState(false);
  const [modalMessageDescription, setModalMessageDescription] = useState("");
  const [pusherLoading, setPusherLoading] = useState(false);
  const merchantId = localStorage.getItem("merchant");
  const {userID, key} = useStore()
  // API CALL
  const { data: profile } = useProfile();

  const {
    mutate: withdrawMutate,
    isPending: withdrawLoading,
    isSuccess: withdrawSuccess,
    data: withdrawData,
  } = useInitiateOtpVerification();

  const tempId = localStorage.getItem("tempId");
  const email = localStorage.getItem("email");

  const passwordlessOTPVerification = async (otp: string) => {
    if (otp.length < 6) return;
    withdrawMutate(
      { otp: otp, tempId: tempId! },
      // {
      //   onSuccess: () => {
      //     queryClient.invalidateQueries({ queryKey: ["userWallet", userID]});
      //     queryClient.invalidateQueries({ queryKey: ["userWallet", userID]});
      //   }
      // }
    );
  };

  const progressFromWithdraw = location.state?.progress || 0;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setFilledCount(value.length);
  };

  const subscribeToChannel = (txReference: any) => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: "mt1",
    });

    const channelName = `WALLET_WITHDRAWAL_${txReference}`;
    const channel = pusher.subscribe(channelName);
    setPusherLoading(true);
    console.log("STARTING CONNECTION", channelName);
    // success
    channel.bind("WALLET_WITHDRAWAL_SUCCESS", (data: any) => {
      console.log("WALLET_WITHDRAWAL_SUCCESS", data);
      setModalMessageTitle(`${formatToNairaCurrency(data.amount)} Withdrawn!`);
      setModalMessageDescription(
        `Weldone! You have successfully withdrawn ${formatToNairaCurrency(
          data.amount
        )}. You should receive a credit alert in seconds`
      );
      setPusherLoading(false);
      setIsWithdraw(true);
    });
    // Error
    channel.bind("WALLET_WITHDRAWAL_FAILURE", (data: any) => {
      console.log("WALLET_WITHDRAWAL_FAILURE", data);
      setModalMessageTitle("Withdrawal failed");
      setModalMessageDescription(`Oops, something went wrong`);

      setPusherLoading(false);
      setIsFailWithdraw(true);
    });
  };

  useEffect(() => {
    if (withdrawSuccess) {
      console.log(
        "🚀 ~ file: WithdrawMoney.tsx:77 ~ useEffect ~ withdrawData:",
        withdrawData?.data?.transactionReference
      );
      subscribeToChannel(withdrawData?.data?.transactionReference);
      //   setIsWithdraw(true);
    }
  }, [withdrawSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className=" w-full ml-auto px-[5%] pt-[30px] relative">
      {withdrawLoading && <LoadingOverlay />}
      <ArrowLeft
        size={40}
        className="border rounded-[4px] p-2 mb-4 text-[#FD7E14] bg-[#FFF2E8] cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <h2 className="font-semibold text-[#303030] text-[23px]">
        Withdraw Funds
      </h2>
      <p className="mb-6">Make your withdrawals seamlessly</p>
      <div className="block md:flex mt-[5rem] md:px-[3rem] px-[.5rem]">
        <Stepper
          isSubmitted={progressFromWithdraw === 100 || isSubmitted}
          filledCount={filledCount}
        />

        <div className="md:max-w-[600px] w-[80%]">
          <div>
            <p className="text-gray-700 text-[27px] font-bold mb-2">
              Verify OTP
            </p>
            <p className="text-gray-500 max-w-[400px]text-[19px] mb-6">
              Enter the 6-digits OTP that was sent to your email - <span className="text-primary-normal font-semibold">{profile?.email}</span>.
            </p>
          </div>

          <form>
            <OtpInput value={otp} valueLength={6} onChange={handleOtpChange} />
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  passwordlessOTPVerification(otp);
                  setIsSubmitted(true);
                }}
                type="submit"
                className={`p-3 w-full rounded-lg outline-none text-white font-semibold bg-[#FD7E14] my-6 hover:bg-[#c37e46] ${
                  filledCount === 6 ? "opacity-100" : "opacity-35"
                }`}
                disabled={filledCount !== 6}
              >
                Withdraw Now
              </button>
            </div>
            {/* <div className="text-gray-400 text-center">
              Didn’t receive OTP?{" "}
              <a href="" className="text-[#FD7E14] font-bold">
                Click to resend
              </a>
            </div> */}
          </form>
        </div>
      </div>

      {(isWithdraw || isFailWithdraw) && (
        <div className="animate-jump fixed top-0 left-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px]">
          <div className="py-6 px-6 max-w-[400px] min-h-[246px] rounded-[12px] absolute bg-white top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 z-50">
            <img
              className="p-4 bg-[#ECFDF3] rounded-[50%]"
              src={isWithdraw ? check : warningIcon}
              alt="check"
            />
            <h6 className="h6">{modalMessageTitle} 👍🏾</h6>
            <p className="mt-4 text-center text-base font-normal leading-[21.6px]">
              {modalMessageDescription}
            </p>
            <div className=" mt-4">
              {isWithdraw ? (
                <Button
                  fullWidth={true}
                  onClick={() => {
                    setIsWithdraw(false);
                    // navigate(`/dashboard/${key}`);
                    navigate(-2)
                  }}
                >
                  Done
                </Button>
              ) : (
                <Button
                  fullWidth={true}
                  onClick={() => {
                    setIsWithdraw(false);
                  }}
                >
                  Try again
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {pusherLoading && (
        <div className="animate-jump fixed top-0 left-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px]">
          <div className="fixed top-0 left-0 right-0  bottom-0 bg-white flex items-center justify-center z-40">
            <div className="w-screen h-screen flex items-center justify-center">
              <div className="text-center space-y-2 my-auto">
                <img
                  src={loading}
                  className="animate-spin mx-auto "
                  alt="loading spinner"
                />
                <h1 className="font-medium ">
                  Transaction in progress... Please wait.
                </h1>
              </div>
              <img src={waves} className="absolute bottom-0 w-full" alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Verification;
