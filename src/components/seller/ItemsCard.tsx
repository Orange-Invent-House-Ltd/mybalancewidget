import { Link } from "react-router-dom";
import { useTransactions } from "../../Hooks/query";
import { useState } from "react";
import FormatNumberWithCommas from "../reuseable/FormatNumberWithCommas";

function ItemsCard({ cartData }: any) {
  const [page, setPage] = useState<number>(1);
  const { data: transactions } = useTransactions({ page });

  return (
    <div className="mt-6">
      <div className="lg:flex md:flex block justify-between items-center ">
        <div className="flex items-center gap-6">
          <input
            type="checkbox"
            name=""
            className="accent-black cursor-pointer"
          />
          {/* <img
            // src={cartData?.img}
            alt=''
            className="w-[50px]"
          /> */}
          <div>
            <h2 className="font-medium mb-1">{cartData?.meta?.title}</h2>
            <p className="text-sm">{cartData?.meta?.description}</p>
            <p className="text-[13px]">
              <span>Delivery date: <span className="font-semiold">{cartData?.escrow?.deliveryDate}</span></span> 
              <span className="ml-4 font-bold">₦<FormatNumberWithCommas number={cartData?.amount} /></span>
            </p>
          </div>
        </div>
        <div className="flex gap-11 mt-4 lg:ml-0 ml-28 ">
          <Link to="/seller/item-details" state={{ cartData: cartData }}>
            <p className="font-medium text-[14px] cursor-pointer hover:underline">
              View Info
            </p>
          </Link>

          {cartData?.escrow?.disputeRaised ? (
            <p className="font-medium text-[14px] opacity-50 hover:cursor-not-allowed">
              Dispute Raised
            </p>
          ) : (
            <Link to="/seller/raise-a-dispute" state={{ cartData: cartData }}>
              <p className="font-medium text-[14px] cursor-pointer">
                Raise a Dispute
              </p>
            </Link>
          )}
        </div>
      </div>
      <div className="border border-[#EDEDED] mt-2" />
    </div>
  );
}

export default ItemsCard;
