import { ArrowLeft } from "lucide-react";
import bannerImage from "../../../assets/images/buyer.png";
import { useNavigate } from "react-router-dom";
import DisputeCard from "../../../components/buyer/DisputeCards";

const DisputeResolution = () => {
  const navigate = useNavigate();

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

      <div className="flex flex-col gap-4 md:gap-6  w-full max-w-[676px]">
        {disputes?.map(({ reason, description, createdAt, status }: any) => (
          <DisputeCard
            key={createdAt}
            reason={reason}
            description={description}
            time={createdAt}
            status={status}
          />
        ))}
      </div>
      <button className="w-[209px] md:w-[343px] rounded-md text-white bg-[#FD7E14] py-3 px-4 capitalize font-bold cursor-pointer transition-all mt-4 mb-10"
        >Return to homepage</button>
    </div>
  );
};

const disputes = [
  {
    id: 1,
    reason: "Bad product",
    description: "white sneakers",
    createdAt: "02/03/2024",
    status: "PENDING",
  },
  {
    id: 2,
    reason: "Product has not been deliverd",
    description: "Iphone 15 pro max",
    createdAt: "02/03/2024",
    status: "RESOLVED",
  },
  {
    id: 3,
    reason: "Bad product",
    description: "Humidifier",
    createdAt: "02/03/2024",
    status: "REJECTED",
  },
];
export default DisputeResolution;
