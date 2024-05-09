import { X } from "lucide-react";
import confetti from "../../assets/icon/confetti.svg";
import { useNavigate } from "react-router-dom";
function WithdrawalSuccess() {
  const navigate = useNavigate();

  return (
    <div className="absolute left-[24%] top-[50%] z-20 w-[60%] h-auto shadow-lg bg-white p-[30px] rounded-xl transition-all">
      <div className="flex justify-end ">
        <X
          size={30}
          className="text-[#FD7E14] cursor-pointer"
          onClick={() => navigate("/seller/dashboard")}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-6">
          <img src={confetti} alt="" />
        </div>

        <p className="text-[30px] mb-6">[Amount] Withdrawn!</p>
        <p className="text-[20px] text-gray-500 text-center">
          Well done! You have successfully withdrawn [amount]. You should
          receive a credit alert in the next minute.
        </p>
      </div>
    </div>
  );
}

export default WithdrawalSuccess;
