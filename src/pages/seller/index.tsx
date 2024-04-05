
import { Route, Routes, } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import RaiseADispute from "./dashboard/RaiseADispute";
import RaiseADispute2 from "./dashboard/RaiseADispute2";
import HomeHeading from "./dashboard/HomeHeading";
import WithdrawIndex from "./dashboard/WithdrawIndex";
import Withdraw from "./dashboard/Withdraw";
import Verification from "./dashboard/Verification";


const Index = () => {

  return (
    <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="raise-a-dispute" element={<RaiseADispute />} />
        <Route path="raise-a-dispute2" element={<RaiseADispute2 />} />
        <Route path="home-heading" element={<HomeHeading />} />
        <Route path="withdraw-index" element={<WithdrawIndex />} >
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="otp" element={<Verification />} />
        </Route>
    </Routes>
  );
};

export default Index;

  
