import { ArrowLeft } from 'lucide-react'
import ItemsCard from '../../../components/seller/ItemsCard2'
import shoe from '../../../assets/images/shoe.png'
import { useNavigate } from 'react-router-dom'


export default function HomeHeading() {
    const navigate = useNavigate()
  return (
    <div className="md:w-[70%] w-[100%] ml-auto px-[5%] pt-[30px] backdrop-blur-lg bg-opacity-50"> 
           <ArrowLeft size={40} className="border rounded-[4px] p-2 mb-4 text-[#FD7E14] bg-[#FFF2E8] cursor-pointer"  onClick={() => navigate(-1)}/>
    <div className=" mt-7">
    <div className=" font-semibold ">Heading</div>
    <div className=" text-sm mt-2"> Subtitle Text goes here</div>
    </div>
    <div className='gap-4 mt-[2rem]'>
        <input type="checkbox" 
         name=""
         id="" 
         className="form-checkbox lg:h[25px] lg:w[25px] h-6 w-6  cursor-pointer accent-black rounded-lg" />
      </div>
      {cartDatas.map(({name, description, img, price}:any, index:any, arr:any)=>(
        <div className={ arr.length - 1 === index ? '' : 'mb-4'}>
        <ItemsCard name={name} description={description} img={img} price={price} />
        </div>
      ))}
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
  ]