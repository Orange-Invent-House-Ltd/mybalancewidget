
import { Route, Routes, } from "react-router-dom";
import UnlockFund from "./dashboard/UnlockFund";
import RaiseADispute from "./dashboard/RaiseADispute";


const Index = () => {

  return (
    <Routes>
      <Route path="unlock-fund" element={<UnlockFund />} />
      <Route path="raise-a-dispute" element={<RaiseADispute />} />
    </Routes>
  );
};

export default Index;