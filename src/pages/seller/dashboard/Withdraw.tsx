import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Stepper from "../../../components/seller/Stepper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Pusher from "pusher-js";

import { useInitiateWithdrawal, useLookUpBank } from "../../../Hooks/mutate";
import formatToNairaCurrency from "../../../util/formatNumber";
import { useBanks } from "../../../Hooks/query";

function Withdraw() {
  const [accNum, setAccNum] = useState("");
  const [code, setCode] = useState("");
  const [modalMessageTitle, setModalMessageTitle] = useState("");
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [modalMessageDescription, setModalMessageDescription] = useState("");
  const [pusherLoading, setPusherLoading] = useState(false);
  const merchantId = localStorage.getItem('merchant')
  const navigate = useNavigate();

  const {mutate: withdrawMutate,
    isPending: withdrawLoading,
    isSuccess: withdrawSuccess,
    data: withdrawData,
  } = useInitiateWithdrawal();

  const subscribeToChannel = (txReference: any) => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: "mt1",
    });

    const channelName = `WALLET_WITHDRAWAL_${txReference}`;
    const channel = pusher.subscribe(channelName);
    setPusherLoading(true);
    console.log("STARTING CONNECTION", channelName);

    channel.bind("WALLET_WITHDRAWAL_SUCCESS", (data: any) => {
      console.log("WALLET_WITHDRAWAL_SUCCESS", data);
      setModalMessageTitle(`${formatToNairaCurrency(data.amount)} Withdrawn!`);
      setModalMessageDescription(
        `Weldone! You have successfully withdrawn ${formatToNairaCurrency(
          data.amount
        )}. You should receive a credit alert in seconds`
      );
      //   setModalMessageAmount(data.amount);
      setPusherLoading(false);
      setIsWithdraw(true);
    });

    channel.bind("WALLET_WITHDRAWAL_FAILURE", (data: any) => {
      console.log("WALLET_WITHDRAWAL_FAILURE", data);
      setModalMessageTitle("Withdrawal failed");
      setModalMessageDescription(`Oops, something went wrong`);

      setPusherLoading(false);

      //   setModalMessageAmount(data.amount);
      //   setIsWithdraw(true);
    });
  };
  //

  
  //

  const { data: banks, isLoading: bankIsLoading } = useBanks();
  const {
    data: LookupData,
    mutate: LookupMutate,
    // isLoading: LookupIsLoading,
  } = useLookUpBank();

  //
  useEffect(() => {
    if (withdrawSuccess) {
      console.log(
        "🚀 ~ file: WithdrawMoney.tsx:77 ~ useEffect ~ withdrawData:",
        withdrawData
      );
      subscribeToChannel(withdrawData?.data?.transactionReference);
      //   setIsWithdraw(true);
    }
  }, [withdrawSuccess]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (accNum.length === 10) {
      LookupMutate({ bankCode: code, accountNumber: accNum });
    }
  }, [accNum, code]);// eslint-disable-line react-hooks/exhaustive-deps
  //

  const {
    register,
    handleSubmit: handleSubmitWithdraw,
    formState: { errors, isSubmitting },
  } = useForm();

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
      console.log(data);
      // Call withdrawMutate asynchronously
      withdrawMutate({
        // ...data,
        accountNumber: accNum,
        bankCode: code,
        amount: Amount,
        merchantId: merchantId,
      });

      // Handle success, navigate to next step or show success message
      navigate("/seller/otp", { state: { progress: 100 } });
    } catch (error) {
      console.error(error);
      // Handle error, display error message or retry logic
    }
  };

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
      <div className="flex mt-[5rem] md:px-[4rem] px-[.5rem]">
        <Stepper isSubmitted={isSubmitted} />
        <div className="w-[60%]">
          <div>
            <p className="text-gray-700 text-[27px] font-bold mb-2">
              Withdraw to Bank
            </p>
            <p className="text-gray-500 text-[15px] font-semibold mb-2">
              Available balance is ₦550,500.90
            </p>
            <p className="text-gray-500 text-[15px] mb-6">
              Use the form below to withdraw funds to your personal account.
            </p>
          </div>
          <form onSubmit={onSubmitWrapper}>
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
                {...register("Amount", { valueAsNumber: true })}
                type="number"
                id=""
                placeholder="e.g 40,000"
                className="border-gray-400 border-2 p-3 w-full rounded-lg outline-none"
              />
              {/* {errors.Amount && (
                <p className="text-red-500 text-[15px] font-semibold mt-2 mb-[-8px]">
                  {errors.Amount.message}
                </p>
              )} */}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="p-3 w-full rounded-lg outline-none text-white font-semibold bg-[#FD7E14] my-6"
            >
              {pusherLoading ? "loading..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
