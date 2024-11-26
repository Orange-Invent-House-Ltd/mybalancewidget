import { LucideHelpCircle, ArrowLeft, Rabbit } from "lucide-react";
import amtwallet from "../../../assets/icon/amtwallet.svg";
import amtwithdrawn from "../../../assets/icon/amtwithdrawn.svg";
import shoe from "../../../assets/images/shoe.png";
import ItemsCard from "../../../components/seller/ItemsCard";
import HeroHeader from "../../../components/reuseable/HeroHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMercahntWallet, useProfile, useTransactions, useUserWallet } from "../../../Hooks/query";
import { useStrimKey } from "../../../Hooks/mutate";
import EmptyState from "../../../components/reuseable/EmptyState";
import FormatNumberWithCommas from "../../../components/reuseable/FormatNumberWithCommas";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import Pagination from "../../../components/reuseable/Pagination";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../../../api/axios";
import useStore from "../../../store";
import formatToNairaCurrency from "../../../util/formatNumber";
import { formatToDollarCurrency } from "../../../components/reuseable/formatCurrency";

const Dashboard = () => {
  const [currency, setCurrency] = useState('')
  // const { key }: any = useParams();
  const queryClient = useQueryClient()
  const [page, setPage] = useState<number>(1);
  const { mutate } = useStrimKey();

  // const [profile, setProfile] = useState({})
  // API CALL
  const { data: profile } = useProfile();
  const {data:userWallet, isPending: isPendingUserWallet} = useUserWallet(profile?.userId)
  const { data: transactions, isPending } = useTransactions({ page });
  const email = localStorage.getItem("email");
  const urlWithUserEmail = `https://mybalanceapp.netlify.app/passwordless-otp-verification?email=${email}`;
  const navigate = useNavigate();
  const store = useStore()
  
  const ngnWallet = userWallet?.find((wallet: any) => wallet?.currency === "NGN");
  const usdWallet = userWallet?.find((wallet: any) => wallet?.currency === "USD");

  const goTo = (): void => {
    navigate("/seller/withdraw");
  };

  const handlePageChange = (selected: any) => {
    setPage(selected);
  };

  // const getProfile = async()=>{
  //   try {
  //     const res = await privateApi.get("/auth/profile")
  //     setProfile(res?.data?.data)

  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // }

  const strimkey = async (key:any) => {
    mutate(
      { 
        key: key 
      },
      {
        onSuccess: () => {
          // queryClient.invalidateQueries(["profile"] as InvalidateQueryFilters);
          queryClient.invalidateQueries({ queryKey: ['profile'] });
          queryClient.invalidateQueries(["transactions"] as InvalidateQueryFilters);
        }
      }
    );
  };

  useEffect(() => {
    // Get the current URL using window.location.href
    const currentURL = window.location.href;
    const startString = "dashboard/";
    // Find the index of the starting string
    const startIndex = currentURL.indexOf(startString);
    // Calculate the start of the substring (position after "unlock-fund/")
    const extractStartIndex = startIndex + startString.length;
    // Extract the substring from the calculated start index to the end of the URL
    const key = currentURL.substring(extractStartIndex);
    store.setCount((prev:any) => prev + 1)
    if (store.count < 1){
      strimkey(key);
    }
    console.log(key);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {isPending && <LoadingOverlay />}
      <div className="px-[5%] pt-[30px] pb-10 backdrop-blur-lg bg-opacity-50">
        <div className=" mt-7">
          <div className="flex justify-between">
            <div>
              <div className=" font-semibold text-xl">Dashboard</div>
              <div className=" text-xs mt-2 text-slate-500">An overview.</div>
            </div>
            <button
              className="text-sm text-white bg-[#FD7E14] p-[1px] px-16 rounded-md"
              onClick={goTo}
            >
              Make a Withdrawal
            </button>
          </div>
          {/*  */}
          <div className="lg:flex md:flex block items-center gap-3">
            <div className="flex flex-auto justify-between shadow-lg rounded-[25px] p-9 mt-[2rem] border border-slate-100">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-xs text-slate-500">Amount in wallet</p>
                  <select value={currency} onChange={(e)=> setCurrency(e.target.value)} className='h-6 bg-transparent outline-none text-sm'>
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                
                <div className="font-semibold text-lg">
                  {userWallet ? (
                    currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.balance) : 
                    formatToDollarCurrency(usdWallet?.balance)
                  ) : (
                    "Loading..."
                  )}
                </div>
                {/* <p className="text-xs text-slate-500 mt-5">since last month</p> */}
              </div>
              <div>
                <img src={amtwallet} alt="" />{" "}
              </div>
            </div>
            <div className="flex flex-auto justify-between shadow-lg  rounded-[25px] p-9 mt-[2rem] border border-slate-100">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-xs text-slate-500">Amount withdrawn</p>
                  <select value={currency} onChange={(e)=> setCurrency(e.target.value)} className='h-6 bg-transparent outline-none text-sm'>
                    <option value="NGN">NGN</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <div className="font-semibold text-lg">
                  {userWallet ? (
                    currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.withdrawnAmount) : 
                    formatToDollarCurrency(usdWallet?.withdrawnAmount)
                  ) : (
                    "Loading..."
                  )}
                </div>
                {/* <p className="text-xs text-slate-500 mt-5">since last month</p> */}
              </div>
              <div>
                <img src={amtwithdrawn} alt="" />{" "}
              </div>
            </div>
          </div>
          {/*  */}
          <HeroHeader />
          <div className="flex flex-col md:flex-row lg:flex-row text-center justify-between align-items-center  mt-10">
            <div className="flex lg:justify-normal justify-center items-center gap-4">
              <div className="text-2xl font-semibold">Transaction history</div>
            </div>

            <div className="flex justify-center items-center gap-3 px-1 mt-4">
              <div className="flex lg:items-center md:items-center items-start gap-2">
                <a
                  href={urlWithUserEmail}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <LucideHelpCircle size="20" name="help" className="inline" />
                  <div className="text-sm font-medium inline ml-2">
                    View Transaction History
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {transactions?.data?.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              img={<Rabbit size={100} className="" />}
              title={`No Lock found`}
              text={`opps, it seems you don't have any transaction yet.`}
            />
          </div>
        ) : (
          transactions?.data?.map(
            (cartData: any, index: any, arr: any, key: any) => (
              <div
                className={arr.length - 1 === index ? "" : "mb-4"}
                key={cartData?.id}
              >
                <ItemsCard cartData={cartData} />
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
  );
};

export default Dashboard;

const cartDatas = [
  {
    name: "Blue Vintage Sneakers",
    description: "Lorem ipsum dolor sit amet consectetur. Sed erat ...",
    img: shoe,
    price: "54,000.00",
  },
  {
    name: "Off-White Snapback",
    description: "Lorem ipsum dolor sit amet consectetur. Sed erat ...",
    img: shoe,
    price: "15,000.00",
  },
  {
    name: "Yellow Wool Beanie",
    description: "Lorem ipsum dolor sit amet consectetur. Sed erat ...",
    img: shoe,
    price: "30,000.00",
  },
];
