import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import bannerImage from "../../../assets/images/buyer.png";
import {
  MultilineTextField,
  TextField,
} from "../../../components/reuseable/FormInput";
import { set, useForm } from "react-hook-form";
import { Button } from "../../../components/reuseable/Buttons";
import { privateApi } from "../../../api/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import moment from "moment";
import { useTransactions } from "../../../Hooks/query";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { useRaiseADispute } from "../../../Hooks/mutate";

const RaiseADispute = () => {
  const location = useLocation();
  const cartData = location.state?.cartData;
  const id = cartData?.id;
  const navigate = useNavigate();
  const today = moment().format('YYYY-MM-DD')
  const [page, setPage] = useState<number>(1);
  const { data } = useTransactions({ page });
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();
  // API CALL
  const{mutate:raiseADisputeMutate} = useRaiseADispute()

  const raiseADispute = async (data: any) => {
    raiseADisputeMutate({
      id,
      data
    })
  }

  // const raiseADispute = async (data: any) => {
  //   try {
  //     const res = await privateApi.post(
  //       `/merchants/customer-transactions/${id}`,
  //       data
  //     );
  //     queryClient.invalidateQueries(["transactions"] as InvalidateQueryFilters);
  //     toast.success(res.data.message, {
  //       toastId: "success1",
  //     });
  //     navigate(-1)
  //   } catch (error: any) {
  //     let resMessage;
  //     error.response.data.errors === null
  //       ? (resMessage = error.response.data.message)
  //       : (resMessage = error.response.data.errors.transaction[0]);
  //     toast.error(resMessage, {
  //       toastId: "error1",
  //     });
  //   }
  // };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        priority: "",
        reason: "",
        description: "",
      });
    }
  }, [isSubmitSuccessful]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="px-[5%] pt-[30px]">
      <ArrowLeft
        size={40}
        className="border rounded-[4px] text-[#FD7E14] p-2 mb-4"
        onClick={() => navigate(-1)}
      />
      <h2 className="font-bold text-[#303030] text-[23px] ">Raise a Dispute</h2>
      <p className="mb-6">
        Manage disputes with vendors by creating a dispute thread here.
      </p>

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

      <div className="max-w-[720px] border border-borderColor rounded-lg px-[30px] py-[50px] mx-auto mb-10">
        <form
          className="space-y-8 relative"
          onSubmit={handleSubmit(raiseADispute)}
        >
          {/* {isLoading && <LoadingOverlay />} */}
          <div className="flex gap-5 w-full items-center flex-col lg:flex-row ">
            <TextField
              control={control}
              label="Reference code/ Transaction ID"
              value={cartData?.id}
              name="transaction"
              variant="xlong"
              disabled
              rules={{ required: "this field is required" }}
            />

            <div className="w-full mb-3">
              <label
                htmlFor={"selectBank"}
                className="text-sm mb-[6px] capitalize block"
              >
                Priority
              </label>
              <select
                className="block border border-[#B7B7B7] w-full h-12 rounded-md p-2 outline-none focus:border-[#B7B7B7]"
                {...register("priority", {
                  required: "this field is required",
                })}
              >
                <option value="" className="text-[#B7B7B7]">Select Priority</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>
          <TextField
            control={control}
            label="Reason for filing your dispute"
            placeholder="Wrong Product"
            name="reason"
            variant="xlong"
            rules={{ required: "this field is required" }}
          />
          <MultilineTextField
            control={control}
            name="description"
            rules={{ required: "this field is required" }}
            label="Description"
            placeholder="Hello My Balance, this sneaker is not white o, it is blue."
          />
          <div className="">
            {/* disabled={ today <= cartData?.escrow?.deliveryDate}  */}
            <Button fullWidth>submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseADispute;
