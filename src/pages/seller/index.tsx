import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import RaiseADispute from "./dashboard/RaiseADispute";
import Withdraw from "./dashboard/Withdraw";
import Verification from "./dashboard/Verification";
import ItemInformation from "./dashboard/ItemInformation";

const Index = () => {
  return (
    <Routes>
      <Route path="dashboard/:key" element={<Dashboard />} />
      <Route path="raise-a-dispute" element={<RaiseADispute />} />
      <Route path="item-details" element={<ItemInformation />} />
      <Route>
        <Route path="withdraw" element={<Withdraw />} />
        <Route path="otp" element={<Verification />} />
      </Route>
    </Routes>
  );
};

export default Index;
