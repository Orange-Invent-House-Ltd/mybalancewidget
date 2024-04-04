import { LucideHelpCircle,ArrowLeft } from 'lucide-react';
import amtwallet from "../../../assets/icon/amtwallet.svg";
import amtwithdrawn from "../../../assets/icon/amtwithdrawn.svg";

import shoe from '../../../assets/images/shoe.png'
import ItemsCard from '../../../components/seller/ItemsCard';
import HeroHeader from '../../../components/reuseable/HeroHeader';



const Dashboard = () => {
  return (
    <div className="md:w-[70%] w-[100%] ml-auto px-[5%] pt-[30px] backdrop-blur-lg bg-opacity-50"> 
        <ArrowLeft size={40} className="border rounded-[4px] p-2 mb-4 text-[#FD7E14] bg-[#FFF2E8] cursor-pointer" />

  <div className=" mt-7">
    <div className='flex justify-between'>
      <div>
      <div className=" font-semibold text-xl">Dashboard</div>
    <div className=" text-xs mt-2 text-slate-500">An overview</div>
      </div>
      <button className="text-sm text-white bg-[#FD7E14] p-[1px] px-16 rounded-md">Make a Withdrawal</button>
    </div>
    {/*  */}
 <div className='lg:flex md:flex block items-center gap-3'>
 <div className='flex flex-auto justify-between shadow-lg  rounded-[25px] p-9 mt-[2rem] border border-slate-100'>
      <div>
        <p className='text-xs text-slate-500 mb-2'>Amount in wallet</p>
        <div className='font-semibold text-lg'>₦550,500.90</div>
        <p className='text-xs text-slate-500 mt-5'>since last month</p>
         </div>
      <div>
        <img src={amtwallet} alt="" /> </div>
    </div>
 <div className='flex flex-auto justify-between shadow-lg  rounded-[25px] p-9 mt-[2rem] border border-slate-100'>
      <div>
        <p className='text-xs text-slate-500 mb-2'>Amount withdrawn</p>
        <div className='font-semibold text-lg'>₦200,399.00</div>
        <p className='text-xs text-slate-500 mt-5'>since last month</p>
         </div>
      <div>
        <img src={amtwithdrawn} alt="" /> </div>
    </div>
 </div>
    {/*  */}
   <HeroHeader />
    <div className="flex flex-col md:flex-row lg:flex-row text-center justify-between align-items-center  mt-10">
      <div className='flex lg:justify-normal justify-center items-center gap-4'>
        <input type="checkbox" 
         name=""
         id="" 
         className="form-checkbox lg:h[25px] lg:w[25px] h-6 w-6  cursor-pointer accent-black rounded-lg" />
         <div className='text-2xl font-semibold'>Transaction history</div>
      </div>

        <div className="flex justify-center items-center gap-3 px-1 mt-4">
         <div className="flex lg:items-center md:items-center items-start gap-2"
         >
         <LucideHelpCircle size="20" name="help" className="" />
            <div className="text-sm font-medium">View Transaction History</div>
            </div>
            <button className="text-sm bg-white border border-[#FFF2E8] text-[#FD7E14] p-3 px-10 rounded-lg font-semibold">Raise a Dispute</button>
        </div>
    </div>
  </div>
  {cartDatas.map(({name, description, img, price}:any, index:any, arr:any)=>(
        <div className={ arr.length - 1 === index ? '' : 'mb-4'}>
        <ItemsCard name={name} description={description} img={img} price={price} />
        </div>
      ))}

    </div>
  );
};

export default Dashboard;

const cartDatas = [
  { name: 'Blue Vintage Sneakers', 
    description: 'Lorem ipsum dolor sit amet consectetur. Sed erat ...', 
    img: shoe, 
    price: '54,000.00'
  },
  { name: 'Off-White Snapback', 
    description: 'Lorem ipsum dolor sit amet consectetur. Sed erat ...', 
    img: shoe, 
    price: '15,000.00'
  },
  { name: 'Yellow Wool Beanie', 
    description: 'Lorem ipsum dolor sit amet consectetur. Sed erat ...', 
    img: shoe, 
    price: '30,000.00'
  },
]