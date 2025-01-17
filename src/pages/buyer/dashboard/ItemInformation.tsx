import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { ArrowLeft, CircleCheck, CircleDot } from "lucide-react";
import { useDispute, useTransaction } from "../../../Hooks/query";
import { Button } from "../../../components/reuseable/Buttons";
import { formatToDollarCurrency, formatToNairaCurrency } from "../../../components/reuseable/formatCurrency";
import bannerImage from "../../../assets/images/buyer.png";
import { DateTime } from "../../../components/reuseable/DateTime";
import { convertDate } from "../../../components/reuseable/convertDate";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

const ItemInformation = () => {
  const location = useLocation();
  const cartData = location.state?.transaction;
  const navigate = useNavigate()
  const today = moment().format("YYYY-MM-DD");
  const queryClient = useQueryClient()

  // Api Call
  const {data:transaction, isPending} = useTransaction({id:cartData?.id})
  const {data:dispute} = useDispute(transaction?.escrow?.disputeId)

  // Force refetch when component mounts
  useEffect(() => {
    if (cartData?.id) {
      queryClient.invalidateQueries({ queryKey: ['transaction', cartData.id] });
    }
    if (transaction?.escrow?.disputeId) {
      queryClient.invalidateQueries({ queryKey: ['dispute', transaction.escrow.disputeId] });
    }
  }, [cartData?.id, transaction?.escrow?.disputeId, queryClient]);

  const step = dispute?.status ?? 'PENDING'

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
          <p className="text-[32px] font-semibold">{transaction?.currency === "NGN" ? formatToNairaCurrency(transaction?.amount) : formatToDollarCurrency(transaction?.amount) }</p>
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
              <p>{transaction?.meta?.title}</p>
              <p>{transaction?.meta?.description}</p>
              <p>{transaction?.escrow?.itemQuantity}</p>
              <p>{convertDate(transaction?.escrow?.deliveryDate)}</p>
            </div>
          </div>
          <p className="text-[18px] font-bold mb-4">Vendor Information</p>
          <div className="flex justify-between gap-x-8 mb-8">
            <div>
              <p>Vendor’s email</p>
            </div>
            <div>
              <p>{transaction?.escrow?.parties?.seller?.email}</p>
            </div>
          </div>
          {transaction?.escrow?.disputeRaised && (
            <>
              <p className="text-[18px] font-bold mb-4">Dispute Status</p>
              <div className="mt-5 mb-2 flex items-center justify-center">
                {step === 'PENDING' ? <CircleDot size={30} className="text-primary-normal"/> : <CircleCheck size={30} className="text-primary-normal"/>}
                <div className={`h-0.5 w-[100px] rounded-full ${step === 'PROGRESS' || step === 'RESOLVED' ? 'bg-primary-normal' : 'bg-[#EAECF0]'}`}></div>
                
                {step === 'RESOLVED' ? <CircleCheck size={30} className="text-primary-normal"/> : step === 'PROGRESS' ? <CircleDot size={30} className="text-primary-normal"/> : <CircleDot size={30} className="text-[#EAECF0]"/>}
                <div className={`h-0.5 w-[100px] rounded-full ${step === 'RESOLVED' ? 'bg-primary-normal' : 'bg-[#EAECF0]'}`}></div>
                
                {step === 'RESOLVED' ? <CircleCheck size={30} className="text-primary-normal"/> : <CircleDot size={30} className="text-[#EAECF0]"/> }
              </div>
              <div className="flex justify-between mb-6">
                <div className="text-center">
                  <p className="text-status-pending font-medium leading-none">Pending</p>
                  <span className="text-[#B7B7B7] text-[13px]">{<DateTime dateString={dispute?.createdAt}/>}</span>
                </div>
                <div className="text-center">
                  <p className={`font-medium leading-none ${step === 'PROGRESS' || step === 'RESOLVED' ? 'text-status-inprogress' : 'text-[#B7B7B7]'}`}>In Progress</p>
                  {(step === 'PROGRESS' || step === 'RESOLVED') && (
                    <span className="text-[#B7B7B7] text-[13px]">{<DateTime dateString={dispute?.meta?.inProgressTimestamp}/>}</span>
                  )}
                </div>
                <div className="text-center">
                  <p className={`font-medium leading-none ${step === 'RESOLVED' ? 'text-status-resolved' : 'text-[#B7B7B7]'}`}>Resolved</p>
                  {step === 'RESOLVED' && (
                    <span className="text-[#B7B7B7] text-[13px]">{<DateTime dateString={dispute?.meta?.resolutionTimestamp}/>}</span>
                  )}
                </div>
              </div>
            </>
          )}
          <Link to='/buyer/raise-a-dispute' state={{transaction: transaction }}>
            <Button fullWidth disabled={transaction?.escrow?.disputeRaised || today < transaction?.escrow?.deliveryDate }>
              {transaction?.escrow?.disputeRaised ? 'Dispute Raised' : 'Raise a dispute'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemInformation;
