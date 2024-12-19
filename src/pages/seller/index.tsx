import { Route, Routes } from "react-router-dom";
import Withdraw from "./dashboard/Withdraw";
import Verification from "./dashboard/Verification";

const Index = () => {
  return (
    <Routes>
      <Route path="withdraw" element={<Withdraw />} />
      <Route path="otp" element={<Verification />} />
    </Routes>
  );
};

export default Index;
