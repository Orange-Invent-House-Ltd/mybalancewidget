import UnlockFundCard from "../../../components/buyer/UnlockFundCard";
import { ArrowLeft, CircleHelp, Rabbit } from "lucide-react";
import shoe from "../../../assets/images/shoe.png";
import { useEffect, useState } from "react";
import { useTransactions } from "../../../Hooks/query";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import moment from "moment";
import { useStrimKey, useUnlockFunds } from "../../../Hooks/mutate";
import { useParams } from "react-router-dom";
import EmptyState from "../../../components/reuseable/EmptyState";
import useStore from "../../../store";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import Pagination from "../../../components/reuseable/Pagination";


const UnlockFund = () => {
  // const { key }: any = useParams();
  const [page, setPage] = useState<number>(1);
  const { mutate } = useStrimKey();
  const { data: transactions, isPending } = useTransactions({ page });
  
  const today = moment().format("YYYY-MM-DD");
  const queryClient = useQueryClient()
  const store = useStore()
  const checkBoxes = store.checkBoxes

  const email = localStorage.getItem("email");
  const urlWithUserEmail = `https://mybalanceapp.netlify.app/passwordless-otp-verification?email=${email}`;
  const [hover, setHover] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [allSelected, setAllSelected] = useState(false)
  // const [checkBoxes, setCheckBoxes] = useState<any>([]); // array of transaction data with check status
  const [selectedItems, setSelectedItems] = useState<any>([]);
  // const [unlockAll, setUnlockAll] = useState(false) //to set unlock all modal
  
  const { mutate: unlockFund, isPending: unlockFundIsPending } = useUnlockFunds();

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
    // setSelectAll(
    //   //set SelectAll to true if all checkboxes are checked and false otherwise.
    //   updatedCheckBoxes.every((checkbox: any) => checkbox.isChecked) 
    // );
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
      // setSelectAll(!selectAll);
    } else {
      // alert('not all')
      const updatedCheckBoxes = checkBoxes?.map((checkbox: any) => {
        return { ...checkbox, isChecked: selectAll }; //there is a problem here
      });
      store.setCheckBoxes(updatedCheckBoxes);
      // setSelectedItems([]);
      setSelectedItems(
        updatedCheckBoxes?.filter(
          (updatedCheckBoxe: any) => updatedCheckBoxe.isChecked === true
        )
      );
      setAllSelected(false); // set all selected to false when selectAll is false
    }
  };

  
  const strimkey = async (key:any) => {
    mutate({ key: key },
      {
        onSuccess: async() => {
          queryClient.invalidateQueries(["profile"] as InvalidateQueryFilters);
          queryClient.invalidateQueries(["transactions"] as InvalidateQueryFilters);
        }
      }
    );
  };

  useEffect(() => {
    // Get the current URL using window.location.href
    const currentURL = window.location.href;
    const startString = "unlock-fund/";
    // Find the index of the starting string
    const startIndex = currentURL.indexOf(startString);
    // Calculate the start of the substring (position after "unlock-fund/")
    const extractStartIndex = startIndex + startString.length;
    // Extract the substring from the calculated start index to the end of the URL
    const key = currentURL.substring(extractStartIndex);
    strimkey(key);
    console.log(key);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // CartDatas
    const itemIds = transactions?.data?.map((cartData: any) =>
      ({...cartData, isChecked: false} )//complete data with checked status
      // ({
      //   //only the data id with check status
      //   id: cartData.id,
      //   isChecked: false,
      // })
    );
    store.setCheckBoxes(itemIds);
    console.log(itemIds);
    console.log("here you go");
  }, [transactions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
      handleAllChecked()
  }, [selectAll]); // eslint-disable-line react-hooks/exhaustive-deps

  // pagination
  const handlePageChange = (selected: any) => {
    setPage(selected);
  };

  return (
    <div>
      {isPending && <LoadingOverlay />}
      <div className="px-[5%] pt-[30px]">
        <h2 className="font-bold text-[#303030] text-[23px] ">Unlock Fund</h2>
        <p className="mb-6">
          Perform transactions such as unlock funds, raise a dispute or view
          transactions details.
        </p>

        <div className="flex items-center justify-between mb-4">
          <input
            type="checkbox"
            name="allSelect"
            checked={selectAll || allSelected}
            onChange={() => {
              setSelectAll((prev) => !prev)
            }}
          />
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
                <div className="absolute top-10 bg-[#d4d4d4] rounded-[8px] w-[359px] px-4 py-4">
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
            <button
              disabled={selectedItems?.length === 0 ? true : false}
              className="rounded-[8px] bg-[#FD7E14] px-[16px] py-[12px] text-[14px] font-bold text-white disabled:cursor-not-allowed text-nowrap"
              onClick={() => store.setIsUnlockAll(true)}
            >
              Unlock Funds
            </button>

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
        {/* {selectedItems.map((value:any)=>(
          <p key={value.id}>{value.id}</p>
        ))} */}
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
  );
};

const cartDatas = [
  {
    id: 1,
    name: "Blue Vintage Sneakers",
    description: "Lorem ipsum dolor sit amet consectetur. Sed erat ...",
    img: shoe,
    price: "54,000.00",
  },
  {
    id: 2,
    name: "Off-White Snapback",
    description: "Lorem ipsum dolor sit amet consectetur. Sed erat ...",
    img: shoe,
    price: "15,000.00",
  },
  {
    id: 3,
    name: "Yellow Wool Beanie",
    description: "Lorem ipsum dolor sit amet consectetur. Sed erat ...",
    img: shoe,
    price: "30,000.00",
  },
  {
    id: 4,
    name: "Black Vintage Beanie",
    description: "Lorem ipsum dolor sit amet consectetur. Sed erat ...",
    img: shoe,
    price: "72,000.00",
  },
];

export default UnlockFund;
