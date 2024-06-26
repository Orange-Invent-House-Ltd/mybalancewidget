import { useForm } from "react-hook-form";
import { TextField } from "../../../components/reuseable/FormInput";
import { Button } from "../../../components/reuseable/Buttons";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";


const ItemInformation = () => {
  const location = useLocation();
  const cartData = location.state?.cartData;
  const navigate = useNavigate()
  const { handleSubmit, control, reset } = useForm();

  return (
    <div className="px-[5%] pt-[30px]">
      <ArrowLeft size={40} className="border rounded-[4px] text-[#FD7E14] p-2 mb-4" onClick={() => navigate(-1)} />
      <h2 className="font-bold text-[#303030] text-[23px] ">Item Information</h2>
      <p className="mb-10">Item Details</p>

      <div className="w-[450px] mb-10 mx-auto relative  ">

        <form action="">
          <h1 className="text-[#393737] text-lg font-medium mb-2 ">
            ITEM(S) INFORMATION
          </h1>

          <div className="flex flex-col mt-6">
            <TextField
              control={control}
              name="purpose"
              rules={{ required: "this field is required" }}
              label="Purpose of escrow"
              placeholder="Payment for Yellow Wool Beanie"
              readOnly
              value={cartData?.meta?.description}
            />
            <TextField
              control={control}
              name="type"
              rules={{ required: "this field is required" }}
              label="Type of item(s)"
              value={cartData?.escrow?.itemType}
              placeholder="Beanie"
              readOnly
            />
            <TextField
              control={control}
              name="itemQuantity"
              rules={{ required: "this field is required" }}
              label="Number of item(s)"
              value={cartData?.escrow?.itemQuantity}
              placeholder="2"
              readOnly
            />
            <TextField
              control={control}
              name="amount"
              rules={{ required: "this field is required" }}
              label="Amount"
              value={cartData?.amount}
              placeholder="5,000"
              readOnly
            />
            <TextField
              control={control}
              name="timeline"
              type="date"
              rules={{ required: "this field is required" }}
              label="Delivery Timeline"
              value={cartData?.escrow?.deliveryDate }
              placeholder="24/08/2024"
              readOnly
            />
          </div>
          <h1 className="mt-6 text-[#393737] text-lg font-medium">
            SELLER'S INFORMATION
          </h1>
          <div className="mt-6 flex flex-col">
            <TextField
              control={control}
              name="sellerName"
              rules={{ required: "this field is required" }}
              label="Seller's Name"
              value={cartData?.escrow?.parties?.seller?.name}
              readOnly
            />
            <TextField
              control={control}
              name="sellerEmail"
              rules={{ required: "this field is required" }}
              label="Seller's Email"
              value={cartData?.escrow?.parties?.seller?.email}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemInformation;
