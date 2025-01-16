import { useState } from "react"
import { Link } from "react-router-dom"
import UnlockFundModal from "./UnlockFundModal"
import moment from "moment"
import { Copy } from "lucide-react"
import { toast } from "react-toastify"
import { formatToDollarCurrency, formatToNairaCurrency } from "../reuseable/formatCurrency"

const UnlockFundCard = ({transaction}:any) => {
  const [unlockFund, setUnlockFund] = useState(false)
  const today  = moment().format("YYYY-MM-DD");

  
  return (
    <div className="">
      {unlockFund && (
        <UnlockFundModal unlockFund = {unlockFund} setUnlockFund={setUnlockFund} transaction={transaction} />
      )}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-6'>
          <div>
            <div className="text-[#999999] text-[14px] flex items-center gap-x-2">
              <p>{transaction?.meta?.sourcePaymentTransaction.slice(0, 8)}</p>
              <Copy className="" onClick={()=>{
                navigator.clipboard.writeText(transaction?.meta?.sourcePaymentTransaction)
                toast.success('Transaction id copied successfully!')
              }} />
            </div>
            <h2 className='font-medium'>{transaction?.meta?.title}</h2>
            <p className="text-[#999999]">{transaction?.meta?.description}</p>
            <p className="text-[13px]">
              {/* <span>Delivery date: <span className="font-semiold">{cartData?.escrow?.deliveryDate}</span></span>  */}
              <span className="font-bold">{transaction?.currency === 'NGN' ? formatToNairaCurrency(transaction?.amount) 
              : formatToDollarCurrency(transaction?.amount)}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-6">
        <Link to='/buyer/item-details' state={{transaction: transaction}}><p className="font-medium text-[14px] cursor-pointer hover:underline">View Info</p></Link>
          
          {transaction?.disputeRaised ? (
            <p className="font-medium text-[14px] opacity-50 hover:cursor-not-allowed">
             Dispute Raised</p>
          ) : transaction?.deliveryDateIsDue ? (
            <Link to='/buyer/raise-a-dispute' state={{transaction: transaction}}><p className="font-medium text-[14px] cursor-pointer hover:underline">
              Raise a Dispute</p>
            </Link>
          ) : (
            <button className="font-medium text-[14px] cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Raise a Dispute
            </button>
          )}
          {transaction?.customerRole === 'BUYER' ? 
            <button className="font-medium text-[14px] text-[#FD7E14] cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={()=> setUnlockFund(true)}
              disabled={!transaction?.deliveryDateIsDue}
            >Unlock Funds </button> : ''
          }
        </div>
      </div>
      <div className="border border-[#EDEDED] mt-2"/>
    </div>
  )
}

export default UnlockFundCard