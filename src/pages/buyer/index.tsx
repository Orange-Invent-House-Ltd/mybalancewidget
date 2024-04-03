
import { Route, Routes, } from "react-router-dom";
import UnlockFund from "./dashboard/UnlockFund";
import RaiseADispute from "./dashboard/RaiseADispute";
import ItemInformation from "./dashboard/ItemInformation";
import DisputeResolution from "./dashboard/DisputeResolution";


const Index = () => {

  return (
    <Routes>
      <Route path="unlock-fund" element={<UnlockFund />} />
      <Route path="raise-a-dispute" element={<RaiseADispute />} />
      <Route path="item-details" element={<ItemInformation />} />
      <Route path="dispute-resolution" element={<DisputeResolution />} />
    </Routes>
  );
};

export default Index;