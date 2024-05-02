import UnlockFundCard from "../../../components/buyer/UnlockFundCard";
import { ArrowLeft, CircleHelp } from "lucide-react";
import shoe from "../../../assets/images/shoe.png";
import { useEffect, useState } from "react";
import { useTransactions } from "../../../Hooks/query";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import moment from 'moment'
import { useStrimKey } from "../../../Hooks/mutate";
import { useParams } from "react-router-dom";

const UnlockFund = () => {
  const { key}:any = useParams();
  const {mutate} = useStrimKey()
  // localStorage.setItem("session_token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NjY1OTQwLCJpYXQiOjE3MTQ2NTg3NDAsImp0aSI6IjI1MWZjMzUwZmU2YjQ3MDFhNjk3MTJmOGJjMDkzM2UzIiwidXNlcl9pZCI6MTIsImtleSI6bnVsbH0.zOotcpidjh-W6Rezokzuw0isnJ5W7jU0eesrYHA4N5Y')
  // localStorage.setItem("email", 'omobayode93@gmail.com');
  // localStorage.setItem("merchant", 'adbc5c96-f8ba-4a01-8383-58bf5241b05c');
  const today  = moment().format("YYYY-MM-DD");
  
  const email = localStorage.getItem("email");
  const urlWithUserEmail = `https://mybalanceapp.com/passwordless-otp-verification?email=${email}`
  const [hover, setHover] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkBoxes, setCheckBoxes] = useState<any>([])
  const [selectedItems, setSelectedItems] = useState<any>([])
  const [page, setPage] = useState<number>(1)
  const {data:transactions, isPending} = useTransactions({page}) 

  const handleAllChecked = () => {
    if(!selectAll){
    const updatedCheckBoxes = checkBoxes.map((checkbox:any) => {
      return { ...checkbox, isChecked: !selectAll };
    });
    setCheckBoxes(updatedCheckBoxes);
    setSelectedItems(updatedCheckBoxes)
    setSelectAll(!selectAll);
    }else{
      const updatedCheckBoxes = checkBoxes.map((checkbox:any) => {
        return { ...checkbox, isChecked: !selectAll };
      });
      setCheckBoxes(updatedCheckBoxes);
      setSelectedItems([])
      setSelectAll(!selectAll);
    }
  };

  const handleSingleCheckBoxChange = (id:any)=> {
    const updatedCheckBoxes = checkBoxes.map((checkbox:any) => {
      if (checkbox.id === id) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      }
      return checkbox;
    });
    setCheckBoxes(updatedCheckBoxes);
    setSelectedItems(updatedCheckBoxes.filter((updatedCheckBoxe:any)=>(
      updatedCheckBoxe.isChecked === true
    )))
    setSelectAll(updatedCheckBoxes.every((checkbox:any) => checkbox.isChecked));
  };

  const strimkey = async() => {
    mutate({key: key})
  }

  useEffect(() => {
    // Get the current URL using window.location.href
    const currentURL = window.location.href;
    const startString = "unlock-fund/";
    // Find the index of the starting string
    const startIndex = currentURL.indexOf(startString);
    // Calculate the start of the substring (position after "unlock-fund/")
    const extractStartIndex = startIndex + startString.length;
    // Extract the substring from the calculated start index to the end of the URL
    // const key = currentURL.substring(extractStartIndex);
    
    // localStorage.setItem("key", extractedValue);
    strimkey()
    console.log(key)
    const itemIds = cartDatas.map((cartData:any)=>(
      {...cartData, isChecked: false}
    ))
    setCheckBoxes(itemIds);
    console.log(itemIds)
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {isPending && <LoadingOverlay/>}
      <div className="px-[5%] pt-[30px]">
        <ArrowLeft
          size={40}
          className="border rounded-[4px] text-[#FD7E14] p-2 mb-4"
        />
        <h2 className="font-bold text-[#303030] text-[23px] ">Unlock Fund</h2>
        <p className="mb-6">A subtitle goes here</p>

        <div className="flex items-center justify-between mb-4">
          <input type="checkbox" name='allSelect' checked={selectAll} onChange={handleAllChecked}/>
          <div className="flex items-center gap-x-4 cursor-pointer">
            <div className="relative">
              <p
                className="text-[#FD7E14] text-[14px] font-bold"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              ><a href= {urlWithUserEmail} target="_blank" rel="noopener noreferrer"> 
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
            <button className="rounded-[8px] bg-[#FD7E14] px-[16px] py-[12px] text-[14px] font-bold text-white ">
              Unlock Funds
            </button>
          </div>
        </div>
        {selectedItems.map((value:any)=>(
          <p>{value.id}</p>
        ))}
        {transactions?.data?.map((cartData: any, index: any, arr: any) => (
          <div className={arr.length - 1 === index ? "" : "mb-4"}>
            <UnlockFundCard cartData={cartData} handleSingleCheckBoxChange={handleSingleCheckBoxChange} />
          </div>
        ))}
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