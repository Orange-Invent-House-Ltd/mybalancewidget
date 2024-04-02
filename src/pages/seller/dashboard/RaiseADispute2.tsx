import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"
// import { Button } from "../../../components/reuseable/Buttons"
import HeroHeader from "../../../components/reuseable/HeroHeader"


const RaiseADispute = () => {
  const navigate = useNavigate()
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    alert('hey')
  };

  return (
    <div className="md:w-[70%] w-full ml-auto px-[5%] pt-[30px]">
     <ArrowLeft size={40} className="border rounded-[4px] p-2 mb-4 text-primary-btnbck bg-btnbg cursor-pointer" onClick={() => navigate(-1)} />
      <h2 className="font-bold text-[#303030] text-[23px] ">Raise a Dispute</h2>
      <p className="mb-6">Manage disputes with vendors by creating a dispute thread here.</p>
      <HeroHeader />
      <form
        className=" w-full pr-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div  className="flex justify-between align-items-center w-full px-9 py-6 shadow-lg mt-[3rem] mb-[2rem]">
          <div>
            <h2 className="mb-3 text-[18px] font-bold">Wrong Product!</h2>
            <p className="text-[12px] text-slate-500 ">Hello My Balance, this sneaker is not white o, it is blue.</p>
          </div>
          <div>
            <p className="bg-[#FFF2F1] text-[#DA1E28] p-1 rounded-[25px] text-center font-semibold mb-3">Pending</p>
            <p className=" text-[10px] text-slate-300 ">Dec 15, 2022 4:56 PM</p>
          </div>
        </div>
              
        <div className='mt-3 '>
         <input type='submit'  name="submit" id="" value="Return to homepage" className=' border-gray-300 border-solid border-2 outline-none w-full md:w-1/2 p-2 text-heading rounded-lg t text-sm  mb-2  text-white bg-primary-primaryCol cursor-pointer '/>
        </div>
      </form>
    </div>
  )
}

export default RaiseADispute