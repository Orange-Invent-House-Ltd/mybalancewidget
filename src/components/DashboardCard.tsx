

const DashboardCard = ({icon, title, amount, isPendingUserWallet}:any) => {
  return (
    <div className='w-[350px] h-[120px] flex justify-between gap-4 border border-borderColor rounded-[12px] px-3 py-4'>
      <div className='flex items-center gap-2'>
        <img src={icon} alt="card icons" className='w-[48px] h-[48px]'/>
        <div>
          <p className="text-sm text-slate-500 leading-5">{title}</p>
          {isPendingUserWallet ? 'Loading...' : (
            <p className="font-semibold text-[24px] text-[#121212]">{amount}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard