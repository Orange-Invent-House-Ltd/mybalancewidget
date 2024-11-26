import React from 'react'

const DashboardCard = ({icon,title, amount, currency, setCurrency}:any) => {
  return (
    <div className='w-[350px] h-[120px] flex justify-between gap-4 border border-borderColor rounded-[12px] px-4 py-4'>
      <div className='flex items-center gap-2'>
        <img src={icon} alt="card icons" className='w-[48px] h-[48px]'/>
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="font-semibold text-[29px] text-[#121212]">{amount}</p>
        </div>
      </div>
      <select value={currency} onChange={(e)=> setCurrency(e.target.value)} className='h-6 bg-transparent outline-none text-sm'>
        <option value="NGN">NGN</option>
        <option value="USD">USD</option>
      </select>
    </div>
  )
}

export default DashboardCard