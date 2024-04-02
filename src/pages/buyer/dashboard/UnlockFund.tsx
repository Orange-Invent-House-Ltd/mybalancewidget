import UnlockFundCard from "../../../components/reuseable/UnlockFundCard"
import { ArrowLeft, CircleHelp } from "lucide-react"
import shoe from '../../../assets/images/shoe.png'


const UnlockFund = () => {
  return (
    <div>
    <div className="w-[70%] ml-auto px-[5%] pt-[30px]">
      <ArrowLeft size={40} className="border rounded-[4px] p-2 mb-4" />
      <h2 className="font-bold text-[#303030] text-[23px] ">Unlock Fund</h2>
      <p className="mb-6">A subtitle goes here</p>
      
      <div className="flex items-center justify-between mb-4">
        <input type="checkbox" />
        <div className="flex items-center gap-x-4 cursor-pointer">
          <p className="text-[#FD7E14] text-[14px] font-bold"><CircleHelp className="inline" /> View Transaction History</p>
          <button className="rounded-[8px] bg-[#FD7E14] px-[16px] py-[12px] text-[14px] font-bold text-white ">
            Unlock Funds
          </button>
        </div>
      </div>
      {cartDatas.map(({name, description, img, price}:any, index:any, arr:any)=>(
        <div className={ arr.length - 1 === index ? '' : 'mb-4'}>
        <UnlockFundCard name={name} description={description} img={img} price={price} />
        </div>
      ))}
    </div>
    </div>
  )
}

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
  { name: 'Black Vintage Beanie', 
    description: 'Lorem ipsum dolor sit amet consectetur. Sed erat ...', 
    img: shoe, 
    price: '72,000.00'
  },
]

export default UnlockFund