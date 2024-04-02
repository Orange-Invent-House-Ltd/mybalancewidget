import { Link } from "react-router-dom"



const UnlockFundCard = ({name, description, img, price}:any) => {
  return (
    <div className="">
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-6'>
          <input type="checkbox" name='' />
          <img src={img} alt={name}  className="w-[50px]"/>
          <div>
            <h2 className='font-medium mb-2'>{name}</h2>
            <p>{description}</p>
            <p className="font-bold text-[13px]">₦{price}</p>
          </div>
        </div>
        <div className="flex gap-6">
          <p className="font-medium text-[14px] cursor-pointer">View Info</p>
          <Link to='/buyer/raise-a-dispute' ><p className="font-medium text-[14px] cursor-pointer">Raise a Dispute</p></Link>
          <p className="font-medium text-[14px] text-[#FD7E14] cursor-pointer">Unlock Funds </p>
        </div>
      </div>
      <div className="border border-[#EDEDED] mt-2"/>
    </div>
  )
}

export default UnlockFundCard