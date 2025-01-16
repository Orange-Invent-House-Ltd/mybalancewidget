import {Rabbit, CircleHelp } from "lucide-react";
import HeroHeader from "../../components/reuseable/HeroHeader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProfile, useTransactions, useUserWallet } from "../../Hooks/query";
import { useStrimKey, useUnlockFunds } from "../../Hooks/mutate";
import EmptyState from "../../components/reuseable/EmptyState";
import LoadingOverlay from "../../components/reuseable/LoadingOverlay";
import Pagination from "../../components/reuseable/Pagination";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import useStore from "../../store";
import formatToNairaCurrency from "../../util/formatNumber";
import { formatToDollarCurrency } from "../../components/reuseable/formatCurrency";
import UnlockFundCard from "../../components/buyer/UnlockFundCard";
import wallet from '../../assets/icon/wallet.svg'
import lock from '../../assets/icon/lock.svg'
import unlock from '../../assets/icon/unlock.svg'
import arrowTR from '../../assets/icon/arrowTR.svg'
import DashboardCard from "../../components/DashboardCard";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [currency, setCurrency] = useState('NGN');
  const [page, setPage] = useState<number>(1);
  const [hover, setHover] = useState(false);
  const [urlKey, setUrlKey] = useState<string | null>(null);
  const [keyProcessed, setKeyProcessed] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const BASE_URL = import.meta.env.VITE_DOMAIN_URL
  const urlWithUserEmail = `${BASE_URL}/passwordless-otp-verification?email=${email}`;
  
  const {
    setUserID, 
  } = useStore();

  // Extract key from URL
  useEffect(() => {
    const extractKeyFromUrl = () => {
      const path = window.location.pathname;
      const dashboardPrefix = "/dashboard/";
      if (path.startsWith(dashboardPrefix)) {
        const key = path.slice(dashboardPrefix.length).replace(/\/$/, '');
        if (key) {
          setUrlKey(key);
        }
      }
    };
    extractKeyFromUrl();
  }, [setUrlKey]);

   // Process the key using Strim API
   const { mutate: processStrimKey, isSuccess: strimKeySuccess } = useStrimKey();

   useEffect(() => {
     if (urlKey && !keyProcessed) {
       processStrimKey(
         { key: urlKey },
         {
           onSuccess: () => {
             setKeyProcessed(true);
             queryClient.invalidateQueries(["profile"] as InvalidateQueryFilters);
           },
           onError: (error) => {
             toast.error("Failed to process key",{toastId: "error1",});
             console.error("Strim key processing failed:", error);
           }
         }
       );
     }
   }, [urlKey, keyProcessed, processStrimKey, queryClient]);
 
   // Fetch profile data only after key is processed
   const { data: profile } = useProfile();
    // Fetch wallet and transaction data only after profile is available
    const {data:userWallet, isPending: isPendingUserWallet} = useUserWallet(profile?.userId ?? undefined)
   const { data: transactions, isPending } = useTransactions(
    { 
      page,
      currency,
    }
  );

  const ngnWallet = userWallet?.find((wallet: any) => wallet?.currency === "NGN");
  const usdWallet = userWallet?.find((wallet: any) => wallet?.currency === "USD");

  // Set userID when profile is available
  useEffect(() => {
    if (profile?.userId) {
      setUserID(profile.userId);
    }
  }, [profile, setUserID]);
  

  const goTo = (): void => {
    navigate("/seller/withdraw");
  };

  const handlePageChange = (selected: any) => {
    setPage(selected);
  };

  return (
    <div>
      {(isPending || !keyProcessed || !profile) && <LoadingOverlay />}
      <div className="px-[5%] pt-[30px] pb-10 backdrop-blur-lg bg-opacity-50">
        <div className="mt-7">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold text-xl">Dashboard</div>
              <div className="text-sm text-slate-500">An overview.</div>
            </div>
            <button
              className="text-sm text-white bg-[#FD7E14] p-[1px] px-16 rounded-md"
              onClick={goTo}
            >
              Make a Withdrawal
            </button>
          </div>
          <HeroHeader />
          {/*  */}
          <div className="flex items-center justify-between gap-4 max-w-[1080px] mt-8 mb-2">
            <p className="text-[#303030] font-semibold">Balance Breakdown</p>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className='bg-transparent outline-none text-sm'>
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
            </select>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <DashboardCard
                icon={wallet}
                title='Amount in Wallet'
                amount={currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.balance) : formatToDollarCurrency(usdWallet?.balance)}
                isPendingUserWallet={isPendingUserWallet}
              />
              <DashboardCard
                icon={lock}
                title='Amount Locked for you'
                amount={currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.lockedAmountInward) : formatToDollarCurrency(usdWallet?.lockedAmountInward)}
                isPendingUserWallet={isPendingUserWallet}
              />
              <DashboardCard
                icon={lock}
                title='Amount Locked by you'
                amount={currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.lockedAmountOutward) : formatToDollarCurrency(usdWallet?.lockedAmountOutward)}
                isPendingUserWallet={isPendingUserWallet}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 ">
              <DashboardCard
                icon={wallet}
                title='Pending transaction'
                amount={transactions?.meta?.totalResults}
                isPendingUserWallet={isPendingUserWallet}
              />
              <DashboardCard
                icon={unlock}
                title='UnLocked amount'
                amount={currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.unlockedAmount) : formatToDollarCurrency(usdWallet?.unlockedAmount)}
                isPendingUserWallet={isPendingUserWallet}
              />
              <DashboardCard
                icon={arrowTR}
                title='Amount withdrawn'
                amount={currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.withdrawnAmount) : formatToDollarCurrency(usdWallet?.withdrawnAmount)}
                isPendingUserWallet={isPendingUserWallet}
              />
            </div>
          </div>
          {/*  */}
        </div>
        <div className="pt-[30px]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-[#303030] text-[23px] ">Transaction History</h2>
              <p className="max-w-[400px] mb-6">
                Perform transactions such as unlock funds, raise a dispute or view
                transactions details.
              </p>
            </div>
            <div className="flex items-center gap-x-4 cursor-pointer">
              <div className="relative">
                <p
                  className="text-[#FD7E14] text-[14px] font-bold"
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <a
                    href={urlWithUserEmail}
                    target="_blank"
                    // rel="noopener noreferrer"
                  >
                    <CircleHelp className="inline" /> View Transaction History
                  </a>
                </p>
                {hover && (
                  <div className="absolute bottom-10 -right-6 bg-white rounded-[8px] w-[359px] px-4 py-4 shadow-2xl">
                    <p className="mb-2">
                      <span className="font-bold">NB:</span> Note that clicking on
                      “View Transaction History” button will redirect you to
                      MyBalance platform where you can view all your transaction
                      history.
                    </p>
                    <p>Check your email for a One Time Login Password.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {transactions?.data?.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                img={
                  <Rabbit size={100} className="" />
                }
                title={`No Transaction History`}
                text={`opps, you don't have any transaction for your search.`}
              />
            </div>
          ) : (
            transactions?.data?.map(
              (transaction: any, index: any, arr: any, key: any) => (
                <div key={key} className={arr.length - 1 === index ? "" : "mb-4"}>
                  <UnlockFundCard
                    transaction={transaction}
                  />
                </div>
              )
            )
          )}
          {!isPending && transactions?.data.length > 0 && (
            <Pagination
              currentPage={transactions?.meta?.currentPage}
              totalPage={transactions?.meta?.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
