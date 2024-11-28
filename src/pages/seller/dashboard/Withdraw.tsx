import { SubmitHandler, useForm } from "react-hook-form";
import Stepper from "../../../components/seller/Stepper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useInitiateWithdrawal, useLookUpBank } from "../../../Hooks/mutate";
import formatToNairaCurrency from "../../../util/formatNumber";
import { useBanks, useProfile } from "../../../Hooks/query";
import FormatNumberWithCommas from "../../../components/reuseable/FormatNumberWithCommas";

interface FormValues {
  Amount: number;
  AccountName: string;
  AccountNumber: string;
}

function Withdraw() {
  const [accNum, setAccNum] = useState("");
  const [code, setCode] = useState("");
  const [currency, setCurrency] = useState('')
  const [modalMessageTitle, setModalMessageTitle] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [modalMessageDescription, setModalMessageDescription] = useState("");
  const [pusherLoading, setPusherLoading] = useState(false);
  const merchantId = localStorage.getItem("merchant");
  const navigate = useNavigate();
  const { data: profile } = useProfile();

  const {
    mutate: initiateWithdrawMutate,
    isPending: withdrawLoading,
    isSuccess: withdrawSuccess,
    data: withdrawData,
  } = useInitiateWithdrawal();

  const { data: banks, isLoading: bankIsLoading } = useBanks();
  const {
    data: LookupData,
    mutate: LookupMutate,
    // isLoading: LookupIsLoading,
  } = useLookUpBank();

  const {
    register,
    handleSubmit: handleSubmitWithdraw,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const isButtonEnabled = accNum.length > 0;
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Define onSubmitWrapper to bind form submission event
  const onSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitWithdraw(handleInitiateWithdrawal)(e);
  };

  // Handle form submission asynchronously in onSubmit function
  const handleInitiateWithdrawal = async (data: any) => {
    try {
      setIsSubmitted(true);
      const { bankName, AccountNumber, AccountName, Amount } = data;
      // console.log(data);
      initiateWithdrawMutate({
        // ...data,
        accountNumber: accNum,
        bankCode: code,
        amount: Amount,
        merchantId: merchantId,
        currency,
      });
      // Handle success, navigate to next step or show success message
      navigate("/seller/otp", { state: { progress: 100 } });
    } catch (error) {
      console.error(error);
      // Handle error, display error message or retry logic
    }
  };

  useEffect(() => {
    if (accNum.length === 10) {
      LookupMutate({ bankCode: code, accountNumber: accNum });
    }
  }, [accNum, code]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full px-[5%] pt-[30px]">
      <ArrowLeft
        size={40}
        className="border rounded-[4px] p-2 mb-4 text-[#FD7E14] bg-[#FFF2E8] cursor-pointer "
        onClick={() => navigate(-1)}
      />
      <h2 className="font-semibold text-[#303030] text-[23px] ">
        Withdraw Funds
      </h2>
      <p className="mb-6">Make your withdrawals seamlessly</p>
      <div className=" block md:flex mt-[5rem] md:px-[4rem] px-[.5rem]">
        <Stepper isSubmitted={isSubmitted} />
        <div className="md:w-[60%] w-full">
          <div>
            <p className="text-gray-700 text-[27px] font-bold mb-2">
              Withdraw to Bank
            </p>
            <p className="text-gray-500 text-[15px] font-semibold mb-2">
              Available balance is ₦{" "}
              {profile ? (
                <FormatNumberWithCommas number={profile?.walletBalance} />
              ) : (
                "Loading..."
              )}
            </p>
            <p className="text-gray-500 text-[15px] mb-6">
              Use the form below to withdraw funds to your personal account.
            </p>
          </div>
          <form onSubmit={onSubmitWrapper}>
            <div className=" mt-5">
              <label htmlFor={"selectBank"} className="block">
                Select Currency
              </label>
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
                className="block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] "
              >
                <option value=''>Select Currency</option>
                <option value='NGN'>NGN</option>
                <option value='USD'>USD</option>
              </select>
            </div>
            <div className="w-full mt-5">
              <label htmlFor={"selectBank"} className="block">
                Select bank
              </label>
              <select
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                className="block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] "
              >
                {banks?.data?.map((bank: any) => (
                  <option key={bank.slug} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
                {bankIsLoading && <option value="">loading...</option>}
              </select>
            </div>
            <div className="w-full mt-5">
              <label
                htmlFor=""
                className="block text-gray-600 text-[17px] mb-2"
              >
                Account number
              </label>
              <input
                {...register("AccountNumber")}
                type="text"
                id=""
                value={accNum}
                onChange={(e) => {
                  setAccNum(e.target.value);
                }}
                placeholder="Account number"
                className="border-gray-400 border-2 p-3 w-full rounded-lg outline-none text-gray-600 font-semibold"
              />
              {/* {errors.AccountNumber && (
                <p className="text-red-500 text-[15px] font-semibold mt-2 mb-[-8px]">
                  {errors.AccountNumber.message}
                </p>
              )} */}
            </div>
            <div className="w-full mt-5">
              {/* {LookupIsLoading && <option value="">loading...</option>} */}

              <label
                htmlFor=""
                className="block text-gray-600 text-[17px] mb-2"
              >
                Account name
              </label>
              <input
                {...register("AccountName")}
                type="text"
                id=""
                readOnly={true}
                disabled={true}
                value={LookupData?.data.accountName}
                placeholder="Account name"
                className="hover:cursor-not-allowed border-gray-400 border-2 p-3 w-full rounded-lg outline-none text-gray-600 font-semibold"
              />
              {/* {errors.AccountName && (
                <p className="text-red-500 text-[15px] font-semibold mt-2 mb-[-8px]">
                  {errors.AccountName.message}
                </p>
              )} */}
            </div>
            <div className="w-full mt-5">
              <label
                htmlFor=""
                className="block text-gray-600 text-[17px] mb-2"
              >
                Amount to Withdraw <span className="font-bold">(₦)</span>
              </label>
              <input
                {...register("Amount", {
                  valueAsNumber: true,
                  required: "Amount is required",
                  min: {
                    value: 0,
                    message: "Feild cannot be empty",
                  },
                })}
                type="number"
                id=""
                placeholder="e.g 40,000"
                className="border-gray-400 border-2 p-3 w-full rounded-lg outline-none"
              />
              {errors.Amount && (
                <p className="text-red-500 text-[15px] font-semibold mt-2 mb-[-8px]">
                  {errors.Amount.message}
                </p>
              )}
            </div>
            <button
              disabled={!isButtonEnabled || isSubmitting}
              type="submit"
              className="p-3 w-full rounded-lg outline-none text-white font-semibold bg-[#FD7E14] my-6"
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
