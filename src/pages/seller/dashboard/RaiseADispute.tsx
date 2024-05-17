import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField } from "../../../components/reuseable/FormInput";
import { useForm } from "react-hook-form";
// import { Button } from "../../../components/reuseable/Buttons"
import HeroHeader from "../../../components/reuseable/HeroHeader";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { privateApi } from "../../../api/axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const RaiseADispute = () => {
  const location = useLocation();
  const cartData = location.state?.cartData;
  const id = cartData?.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();
  //
  const raiseADispute = async (data: any) => {
    console.log(data);
    try {
      const res = await privateApi.post(
        `/merchants/customer-transactions/${id}`,
        data
      );
      queryClient.invalidateQueries(["transactions"] as InvalidateQueryFilters);
      toast.success(res.data.message, {
        toastId: "success1",
      });
      navigate(-1)
    } catch (error: any) {
      let resMessage;
      error.response.data.errors === null
        ? (resMessage = error.response.data.message)
        : (resMessage = error.response.data.errors.transaction[0]);
      toast.error(resMessage, {
        toastId: "error1",
      });
    }
  };
  //

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        priority: "",
        reason: "",
        description: "",
      });
    }
  }, [isSubmitSuccessful]);

  return (
    <div className="w-full px-[5%] pt-[30px]">
      <ArrowLeft
        size={40}
        className="border rounded-[4px] p-2 mb-4 text-[#FD7E14] bg-[#FFF2E8] cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <h2 className="font-bold text-[#303030] text-[23px] ">Raise a Dispute</h2>
      <p className="mb-6">
        Manage disputes with vendors by creating a dispute thread here.
      </p>
      <HeroHeader />
      <form
        className="pl-5 w-full mt-10 mb-20"
        onSubmit={handleSubmit(raiseADispute)}
      >
        <TextField
          control={control}
          label="Reference code/ Transaction ID"
          name="transaction"
          value={cartData?.id}
          disabled
          rules={{ required: "this field is required" }}
        />

        <div className="w-full mb-3 ">
          <label
            htmlFor={"selectBank"}
            className="text-lg mt-5 capitalize block"
          >
            Priority
          </label>
          <select
            className="block border border-[#B7B7B7] w-full rounded-md p-3 outline-none focus:border-[#B7B7B7] mb-3 "
            {...register("priority", {
              required: "this field is required",
            })}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <TextField
          control={control}
          label="Reason for filing your dispute"
          name="reason"
          rules={{ required: "this field is required" }}
        />
        <div className="mt-7 w-full">
          <label htmlFor="message" className="block mb-2">
            Type in the box below
          </label>
          <textarea
            {...register("description")}
            defaultValue="Hello My Balance, this sneaker is not white o, it is blue."
            id="message"
            className="border-gray-300 border-solid border-2 outline-none w-full lg:w-fullinput p-3 rounded-lg text-gray-400 text-sm  mb-2 mr-8 h-[300px] resize-none"
          ></textarea>
        </div>

        <div className="mt-3 ">
          <input
            type="submit"
            name="submit"
            id=""
            value="Submit"
            className=" border-gray-300 border-solid border-2 rounded-lg outline-none w-full md:w-1/2 p-2 bg-[#FD7E14]  text-white cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default RaiseADispute;
