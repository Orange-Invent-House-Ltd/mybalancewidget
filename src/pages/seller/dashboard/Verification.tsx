import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Stepper from "../../../components/seller/Stepper";
import WithdrawalSuccess from "../../../components/seller/WithdrawalSuccess";
import { useInitiateOtpVerification } from "../../../Hooks/mutate";
import OtpInput from "../../../components/reuseable/OtpInput";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";

function Verification() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [filledCount, setFilledCount] = useState(0);

  const { mutate, isSuccess } = useInitiateOtpVerification();
  const tempId = localStorage.getItem("tempId");
  const email = localStorage.getItem("email");

  const passwordlessOTPVerification = async (otp: string) => {
    if (otp.length < 6) return;
    mutate({ otp: otp, tempId: tempId! });
  };

  const progressFromWithdraw = location.state?.progress || 0;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    setFilledCount(value.length);
  };

  return (
    <div className=" w-full ml-auto px-[5%] pt-[30px] relative">
      <ArrowLeft
        size={40}
        className="border rounded-[4px] p-2 mb-4 text-[#FD7E14] bg-[#FFF2E8] cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <h2 className="font-semibold text-[#303030] text-[23px]">
        Withdraw Funds
      </h2>
      <p className="mb-6">Make your withdrawals seamlessly</p>
      <div className="flex mt-[5rem] md:px-[3rem] px-[.5rem]">
        <Stepper
          isSubmitted={progressFromWithdraw === 100 || isSubmitted}
          filledCount={filledCount}
        />

        <div className="w-[60%]">
          <div>
            <p className="text-gray-700 text-[27px] font-bold mb-2">
              Verify OTP
            </p>
            <p className="text-gray-500 text-[19px] mb-6">
              Enter the 6-digits OTP that was sent to your email address you
              provided.
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
                  // setOtp("");
                  // setFilledCount(0);
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
            <div className="text-gray-400 text-center">
              Didn’t receive OTP?{" "}
              <a href="" className="text-[#FD7E14] font-bold">
                Click to resend
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* {!isSuccess ? <LoadingOverlay /> : <WithdrawalSuccess />} */}
    </div>
  );
}

export default Verification;
