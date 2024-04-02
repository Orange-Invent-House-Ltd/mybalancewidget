import { Minus, Plus } from "lucide-react"


const CartCard = ({name, text, img, noOfItem, price, cta}:any) => {
  return (
    <div >
      <div className='flex'>
        <div className='flex'>
          <input type="checkbox" name='' />
          <img src={img} alt={name} />
        </div>
        <div>
          <h2 className='mb-4'>{name}</h2>
          <p>{text}</p>
        </div>
        <div>
          <Plus className="rounded-[4px] bg-[#F8F7F4]" />
          <p>{noOfItem}</p>
          <Minus className="rounded-[4px] bg-[#F8F7F4]" />
        </div>
      </div>
      <div className="border border-[#EDEDED]"/>
      <div className="flex justify-between gap-4">
        <span className="undeline">{cta}</span>
        <p className="text-bold">₦{price}</p>
      </div>
    </div>
  )
}

export default CartCard