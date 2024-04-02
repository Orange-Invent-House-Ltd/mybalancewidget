import person from "../../assets/icon/person.svg";
import ellipse from "../../assets/icon//ellipse.svg";

export default function HeroHeader() {
  return (
    <div className=' mt-7 w-full pl-7 pr-7 lg:flex justify-between  bg-hero pt-12 pb-12 gap-10 overflow-hidden rounded-xl '>
        <div className='text-white lg:w-[45%] w-full '>
        <h1 className='text-4xl font-bold'>Use MyBalance Today!</h1>
    <p className='text-lg mt-3'>"Take charge of your transactions instantly by connecting to your escrow account with a click. </p>
     <p className='font-bold mt-3'><a href=""> Visit mybalanceapp.com today.</a></p>
        </div>
        <div className='relative lg:block hidden'>
            <img src={ellipse} alt="" className='translate-y-12 sm:hidden lg:block '/>
            <img src={person} alt="" className='absolute -top-6 right-3 sm:hidden lg:block' />
        </div>
      </div>
  )
}
