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
          <img
            // src={cartData?.img}
            alt={cartData?.meta?.title}
            className="w-[50px]"
          />
          <div>
            <h2 className="font-medium mb-1">{cartData?.meta?.title}</h2>
            <p className="text-sm">{cartData?.meta?.description}</p>
            <p className="font-bold text-[13px]">
              {" "}
              ₦ <FormatNumberWithCommas number={cartData?.amount} />
            </p>
          </div>
        </div>
        <div className="flex gap-11 mt-4 lg:ml-0 ml-28 ">
          <p className="font-medium text-[14px] cursor-pointer">View Info</p>
          <Link to="/seller/raise-a-dispute" state={{ cartData: transactions }}>
            <p className="font-medium text-[14px] cursor-pointer">
              Raise a Dispute
            </p>
          </Link>
        </div>
      </div>
      <div className="border border-[#EDEDED] mt-2" />
    </div>
  );
}

export default ItemsCard;
