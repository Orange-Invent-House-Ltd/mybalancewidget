import { LucideHelpCircle, ArrowLeft, Rabbit, CircleHelp } from "lucide-react";
import amtwallet from "../../../assets/icon/amtwallet.svg";
import amtwithdrawn from "../../../assets/icon/amtwithdrawn.svg";
import shoe from "../../../assets/images/shoe.png";
import ItemsCard from "../../../components/seller/ItemsCard";
import HeroHeader from "../../../components/reuseable/HeroHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProfile, useTransactions, useUserWallet } from "../../../Hooks/query";
import { useStrimKey, useUnlockFunds } from "../../../Hooks/mutate";
import EmptyState from "../../../components/reuseable/EmptyState";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import Pagination from "../../../components/reuseable/Pagination";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import useStore from "../../../store";
import formatToNairaCurrency from "../../../util/formatNumber";
import { formatToDollarCurrency } from "../../../components/reuseable/formatCurrency";
import UnlockFundCard from "../../../components/buyer/UnlockFundCard";
import DashboardCard from "../../../components/seller/DashboardCard";
import wallet from '../../../assets/icon/wallet.svg'
import lock from '../../../assets/icon/lock.svg'
import unlock from '../../../assets/icon/unlock.svg'
import arrowTR from '../../../assets/icon/arrowTR.svg'

const Dashboard = () => {
  const [currency, setCurrency] = useState('NGN')
  const queryClient = useQueryClient()
  const [page, setPage] = useState<number>(1);
  const { mutate } = useStrimKey();
  const [hover, setHover] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [allSelected, setAllSelected] = useState(false)
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const email = localStorage.getItem("email");
  const urlWithUserEmail = `https://mybalanceapp.com/passwordless-otp-verification?email=${email}`;
  const navigate = useNavigate();
  const store = useStore()
  const checkBoxes = store?.checkBoxes

  // API CALL
  const { data: profile } = useProfile();
  const {data:userWallet, isPending: isPendingUserWallet} = useUserWallet(profile?.userId)
  const { data: transactions, isPending } = useTransactions({ page });
  const { mutate: unlockFund, isPending: unlockFundIsPending } = useUnlockFunds();
  
  const ngnWallet = userWallet?.find((wallet: any) => wallet?.currency === "NGN");
  const usdWallet = userWallet?.find((wallet: any) => wallet?.currency === "USD");

  const goTo = (): void => {
    navigate("/seller/withdraw");
  };

  const handlePageChange = (selected: any) => {
    setPage(selected);
  };

  // update check boxes array : CheckBoxes has the data and isChecked status that is either tru or false
  // selectedItems is an array of data and isChecked status that is true - items that has been checked
  // set isChecked to true for every checked boxes and VICE VERSA 
  const handleSingleCheckBoxChange = (id: any) => {
    const updatedCheckBoxes = checkBoxes.map((checkbox: any) => {
      if (checkbox.id === id) {
        return { ...checkbox, isChecked: !checkbox.isChecked }; //if isChecked is false set it to true, if it is true set it to false
      }
      return checkbox;
    });
    store.setCheckBoxes(updatedCheckBoxes);
    setSelectedItems(
      updatedCheckBoxes.filter(
        (updatedCheckBoxe: any) => updatedCheckBoxe.isChecked === true
      )
    );
    setAllSelected(
      //set AllSelected to true if all checkboxes are checked and false otherwise.
      updatedCheckBoxes.every((checkbox: any) => checkbox.isChecked) 
    );
  };

  const handleAllChecked = () => {
    if (selectAll) {
      // alert('All')
      const updatedCheckBoxes = checkBoxes.map((checkbox: any) => {
        return { ...checkbox, isChecked: selectAll };
      });
      store.setCheckBoxes(updatedCheckBoxes);
      setSelectedItems(updatedCheckBoxes);
    } else {
      // alert('not all')
      const updatedCheckBoxes = checkBoxes?.map((checkbox: any) => {
        return { ...checkbox, isChecked: selectAll }; //there is a problem here
      });
      store.setCheckBoxes(updatedCheckBoxes);
      setSelectedItems(
        updatedCheckBoxes?.filter(
          (updatedCheckBoxe: any) => updatedCheckBoxe.isChecked === true
        )
      );
      setAllSelected(false); // set all selected to false when selectAll is false
    }
  };

  const strimkey = async (key:any) => {
    mutate(
      { 
        key: key 
      },
      {
        onSuccess: () => {
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

  useEffect(() => {
    // CartDatas
    const itemIds = transactions?.data?.map((cartData: any) =>
      ({...cartData, isChecked: false} )//complete data with checked status
    );
    store.setCheckBoxes(itemIds);
    console.log(itemIds);
    console.log("here you go");
  }, [transactions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
      handleAllChecked()
  }, [selectAll]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {isPending && <LoadingOverlay />}
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
          <div className="flex items-center justify-between gap-4 w-[1080px] mt-8 mb-2">
            <p className="text-[#303030] font-semibold">Balance Breakdown</p>
            <select value={currency} onChange={(e)=> setCurrency(e.target.value)} className='h-6 bg-transparent outline-none text-sm'>
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
            </select>
          </div>
          
          <div className="space-y-3">
            <div className="lg:flex md:flex block items-center gap-3">
              <DashboardCard
                icon={wallet}
                title='Amount in Wallet'
                amount={currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.balance) : formatToDollarCurrency(usdWallet?.balance)}
                currency={currency}
                setCurrency={setCurrency}
              />
              <DashboardCard
                icon={lock}
                title='Amount Locked for you'
                amount={currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.lockedAmountInward) : formatToDollarCurrency(usdWallet?.lockedAmountInward)}
                currency={currency}
                setCurrency={setCurrency}
              />
              <DashboardCard
                icon={lock}
                title='Amount Locked by you'
                amount={currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.lockedAmountOutward) : formatToDollarCurrency(usdWallet?.lockedAmountOutward)}
                currency={currency}
                setCurrency={setCurrency}
              />
            </div>
            <div className="lg:flex md:flex block items-center gap-3">
              <DashboardCard
                icon={wallet}
                title='Pending transaction'
                amount={transactions?.meta?.totalResults}
                currency={currency}
                setCurrency={setCurrency}
              />
              <DashboardCard
                icon={lock}
                title='UnLocked amount'
                amount={currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.unlockedAmount) : formatToDollarCurrency(usdWallet?.unlockedAmount)}
                currency={currency}
                setCurrency={setCurrency}
              />
              <DashboardCard
                icon={arrowTR}
                title='Amount withdrawn'
                amount={currency === 'NGN' ? formatToNairaCurrency(ngnWallet?.withdrawnAmount) : formatToDollarCurrency(usdWallet?.withdrawnAmount)}
                currency={currency}
                setCurrency={setCurrency}
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
                    rel="noopener noreferrer"
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

              {store.isUnlockAll && (
                <div className="animate-jump fixed top-0 left-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px]"> 
                  <div className="py-6 px-6 max-w-[400px] min-h-[246px] rounded-[12px] absolute bg-white top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 z-50">
                    <div className='shadow-3xl'>
                      <h2 className="text-neutral-950 text-[18px] font-semibold">
                        Unlock Funds!
                      </h2>
                      <div className='mt-4 mb-10 leading-tight '>Before proceeding, please confirm if you wish to unlock the funds for your fund(s) with transaction id
                        <div className="mt-2 flex flex-col gap-y-2">
                          { selectedItems.map((seletedItem:any, key:any) => (
                            <p key={key}  className="font-bold">{seletedItem?.id}</p>
                          ))}
                        </div>
                      </div>
                      <button className="w-full rounded-md border border-[#101828] py-3 px-4 capitalize font-bold cursor-pointer transition-all mb-3"
                        onClick={()=>store.setIsUnlockAll(false)}
                      >Cancel</button>
                      <button className="w-full bg-[#039855] text-white rounded-md py-3 px-4 capitalize font-bold cursor-pointer transition-all mb-6"
                        onClick={() => {
                          // selectedIds is an array of selected item ids
                          const seletedItemsIds= selectedItems.map(
                            (seletedItem: any) => seletedItem.id
                          );
                          unlockFund({
                            transactions: seletedItemsIds,
                          });
                        }}
                      >
                        Proceed</button>
                      <p className="text-[10px]">By unlocking the funds, you are accepting responsibility for verifying the quality of the received product. For more details on your buyer obligations, we recommend reviewing our <span className="text-[#FD943C] ">“Terms and Conditions.”</span></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {transactions?.data?.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                img={
                  <Rabbit size={100} className="" />
                }
                title={`No Lock found`}
                text={`opps, it seems you don't have any transaction yet.`}
              />
            </div>
          ) : (
            checkBoxes?.map(
              (cartData: any, index: any, arr: any, key: any) => (
                <div key={key} className={arr.length - 1 === index ? "" : "mb-4"}>
                  <UnlockFundCard
                    cartData={cartData}
                    handleSingleCheckBoxChange={handleSingleCheckBoxChange}
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
