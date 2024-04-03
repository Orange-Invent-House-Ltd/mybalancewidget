import UnlockFundCard from "../../../components/buyer/UnlockFundCard";
import { ArrowLeft, CircleHelp } from "lucide-react";
import shoe from "../../../assets/images/shoe.png";
import { useEffect, useState } from "react";

const UnlockFund = () => {
  const [hover, setHover] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checkBoxes, setCheckBoxes] = useState<any>([])
  const [selectedItems, setSelectedItems] = useState<any>([])
  // const [selectedItems, setSelectedItems] = useState<any>({
  //   items: [],
  //   response: [],
  // });

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

  useEffect(() => {
    const itemIds = cartDatas.map((cartData:any)=>(
      {...cartData, isChecked: false}
    ))
    setCheckBoxes(itemIds);
    console.log(itemIds)
  }, []);

  return (
    <div>
      <div className="w-[70%] ml-auto px-[5%] pt-[30px]">
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
              >
                <CircleHelp className="inline" /> View Transaction History
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
        {checkBoxes.map((cartData: any, index: any, arr: any) => (
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