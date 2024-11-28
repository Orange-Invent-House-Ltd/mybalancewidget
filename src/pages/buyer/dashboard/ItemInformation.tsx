import { useForm } from "react-hook-form";
import { TextField } from "../../../components/reuseable/FormInput";
import { Button } from "../../../components/reuseable/Buttons";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatToDollarCurrency, formatToNairaCurrency } from "../../../components/reuseable/formatCurrency";
import { convertDate } from "../../../components/reuseable/convertDate";
import bannerImage from "../../../assets/images/buyer.png";

const ItemInformation = () => {
  const location = useLocation();
  const cartData = location.state?.cartData;
  const navigate = useNavigate()

  return (
    <div className="px-[5%] pt-[30px]">
      <ArrowLeft size={40} className="border rounded-[4px] text-[#FD7E14] p-2 mb-4" onClick={() => navigate(-1)} />
      <h2 className="font-bold text-[#303030] text-[23px] ">Item Information</h2>
      <p className="mb-10">Item Details</p>

      {/* banner */}
      <div className="bg-[#12b76a] rounded-[16px] flex items-center mb-8 px-6 text-white">
        <div>
          <h2 className="mb-4 text-[36px] font-bold">Use MyBalance Today!</h2>
          <p className="mb-4 text-[18px] font-semibold ">
            "Take charge of your transactions instantly by connecting to your
            escrow account with a click.
          </p>
          <a
            href="https://mybalanceapp.com/"
            target="_blank"
            className="text-[18px] font-bold "
          >
            Visit MyBalance today.
          </a>
        </div>
        <img src={bannerImage} alt="Buyer" />
      </div>

      <div className="w-[486px] border border-[#B3B3B3] rounded-lg px-[30px] py-[70px] mx-auto">
        {/* Amount */}
        <div className="flex flex-col items-center mb-6">
          <p>Amount Agreed</p>
          <p className="text-[32px] font-semibold">{cartData?.currency === "NGN" ? formatToNairaCurrency(cartData?.amount) : formatToDollarCurrency(cartData?.amount) }</p>
        </div>

        <div>
          <p className="text-[18px] font-bold mb-4">Item Information</p>
          <div className="flex justify-between gap-x-8 mb-8">
            <div className="space-y-4">
              <p>Title</p>
              <p>Description</p>
              <p>Number of item</p>
              <p>Delivery timeline</p>
            </div>
            <div className="space-y-4 text-right">
              <p>{cartData?.meta?.title}</p>
              <p>{cartData?.meta?.description}</p>
              <p>{cartData?.escrow?.itemQuantity}</p>
              <p>{convertDate(cartData?.escrow?.deliveryDate)}</p>
            </div>
          </div>
          <p className="text-[18px] font-bold mb-4">Vendor Information</p>
          <div className="flex justify-between gap-x-8 mb-4">
            <div>
              <p>Vendor’s email</p>
            </div>
            <div>
              <p>{cartData?.escrow?.parties?.seller?.email}</p>
            </div>
          </div>
          <Link to='/buyer/raise-a-dispute' state={{cartData: cartData }}>
            <Button fullWidth>
              Raise a dispute
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemInformation;
