import { useForm } from "react-hook-form";
import { TextField } from "../../../components/reuseable/FormInput";
import { Button } from "../../../components/reuseable/Buttons";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ItemInformation = () => {
  const navigate = useNavigate()
  const { handleSubmit, control, reset } = useForm();

  return (
    <div className="w-[70%] ml-auto px-[5%] pt-[30px]">
      <ArrowLeft size={40} className="border rounded-[4px] text-[#FD7E14] p-2 mb-4" onClick={() => navigate(-1)} />
      <h2 className="font-bold text-[#303030] text-[23px] ">Item Information</h2>
      <p className="mb-10">Item Details</p>

      <div className="w-fit mx-auto relative  ">

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
            />
            <TextField
              control={control}
              name="type"
              rules={{ required: "this field is required" }}
              label="Type of item(s)"
              placeholder="Beanie"
              readOnly
            />
            <TextField
              control={control}
              name="itemQuantity"
              rules={{ required: "this field is required" }}
              label="Number of item(s)"
              placeholder="2"
              readOnly
            />
            <TextField
              control={control}
              name="amount"
              rules={{ required: "this field is required" }}
              label="Amount"
              placeholder="5,000"
              readOnly
            />
            <TextField
              control={control}
              name="timeline"
              type="date"
              rules={{ required: "this field is required" }}
              label="Delivery Timeline"
              placeholder="24/08/2024"
              readOnly
            />
          </div>
          <h1 className="mt-6 text-[#393737] text-lg font-medium">
            VENDOR ACCOUNT INFORMATION
          </h1>
          <div className="mt-6 flex flex-col">
            <TextField
              control={control}
              name="bankName"
              rules={{ required: "this field is required" }}
              label="Bank Name"
              readOnly
              placeholder="Access Bank"
            />
            <TextField
              control={control}
              name="accNum"
              rules={{ required: "this field is required" }}
              label="Enter Account number"
              placeholder="1234567890"
              readOnly
            />
            <TextField
              control={control}
              name="accName"
              rules={{ required: "this field is required" }}
              label="Account Name"
              placeholder="e.g JMusty Feet"
              readOnly
            />
            <TextField
              control={control}
              name="email"
              rules={{ required: "this field is required" }}
              label="Email"
              placeholder="e.g JMustyfeet@gmail.com"
              readOnly
            />
          </div>

          <div className="mt-6 space-y-3 mb-16">
            <Button
              fullWidth
              variant="outlined"
            >
              {" "}
              reject information{" "}
            </Button>
            <Button
              fullWidth
            >
              {" "}
              accept information{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemInformation;
