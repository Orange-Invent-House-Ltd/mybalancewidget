const UnlockFundModal = ({cartData, setUnlockFund}:any) => {
  return (
    <div className="animate-jump fixed top-0 left-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px]"> 
      <div className="py-6 px-6 max-w-[400px] min-h-[246px] rounded-[12px] absolute bg-white top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 z-50">
        <div className='shadow-3xl'>
          <h2 className="text-neutral-950 text-[18px] font-semibold">
            Unlock Funds!
          </h2>
          <p className='mt-4 mb-10 leading-tight '>Before proceeding, please confirm if you wish to unlock the funds for {cartData?.name}.</p>
          <button className="w-full rounded-md border border-[#101828] py-3 px-4 capitalize font-bold cursor-pointer transition-all mb-3"
            onClick={()=>setUnlockFund(false)}
          >Cancel</button>
          <button className="w-full bg-[#039855] text-white rounded-md py-3 px-4 capitalize font-bold cursor-pointer transition-all mb-6">Proceed</button>
          <p className="text-[10px]">By unlocking the funds, you are accepting responsibility for verifying the quality of the received product. For more details on your buyer obligations, we recommend reviewing our <span className="text-[#FD943C] ">“Terms and Conditions.”</span></p>
        </div>
      </div>
    </div>
  )
}

export default UnlockFundModal