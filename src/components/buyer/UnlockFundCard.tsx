import { useState } from "react"
import { Link } from "react-router-dom"
import UnlockFundModal from "./UnlockFundModal"
import moment from "moment"

const UnlockFundCard = ({cartData, handleSingleCheckBoxChange}:any) => {
  const [unlockFund, setUnlockFund] = useState(false)
  const today  = '2024-05-09'
  // const [disable, setDisable] = useState(false)
  // today <= cartData?.escrow?.deliveryDate ? setDisable(true) : setDisable(false) 
  let disable;
  today <= cartData?.escrow?.deliveryDate ? disable = true : disable = false 

  
  return (
    <div className="">
      {unlockFund && (
        <UnlockFundModal unlockFund = {unlockFund} setUnlockFund={setUnlockFund} cartData={cartData} />
      )}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-6'>
          <input type="checkbox" name='item' value={cartData?.id} checked={cartData?.isChecked} onChange={() => handleSingleCheckBoxChange(cartData?.id)} />
          <img src={cartData?.img} alt={cartData?.name}  className="w-[50px]"/>
          <div>
            <h2 className='font-medium mb-2'>{cartData?.meta?.title}</h2>
            <p>{cartData?.meta?.description}</p>
            <p className=" text-[13px]"><span>Delivery date: {cartData?.escrow?.deliveryDate}</span> <span className="ml-4 font-bold">₦{cartData?.amount}</span></p>
          </div>
        </div>
        <div className="flex gap-6">
        <Link to='/buyer/item-details' state={{cartData: cartData }}><p className="font-medium text-[14px] cursor-pointer hover:underline">View Info</p></Link>
          
          {disable ? (
            <p className="font-medium text-[14px] opacity-50 hover:cursor-not-allowed hover:underline">
            Raise a Dispute</p>
          ):(
            <Link to='/buyer/raise-a-dispute' state={{cartData: cartData }}><p className="font-medium text-[14px] cursor-pointer hover:underline">
              Raise a Dispute</p>
            </Link>
          )}
          {/* <button disabled = { today <= cartData?.escrow?.deliveryDate ? true : false } className="disabled:opacity-50 disabled:cursor-not-allowed">
            <Link to='/buyer/raise-a-dispute' state={{cartData: cartData }}><p className="font-medium text-[14px] cursor-pointer hover:underline">
              Raise a Dispute</p>
            </Link>
          </button> */}
          <button className="font-medium text-[14px] text-[#FD7E14] cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={()=> setUnlockFund(true)}
          >Unlock Funds </button>
        </div>
      </div>
      <div className="border border-[#EDEDED] mt-2"/>
    </div>
  )
}

export default UnlockFundCard