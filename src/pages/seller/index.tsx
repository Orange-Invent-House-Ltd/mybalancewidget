
import { Route, Routes, } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import RaiseADispute from "./dashboard/RaiseADispute";
import RaiseADispute2 from "./dashboard/RaiseADispute2";
import HomeHeading from "./dashboard/HomeHeading";


const Index = () => {

  return (
    <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="raise-a-dispute" element={<RaiseADispute />} />
        <Route path="raise-a-dispute2" element={<RaiseADispute2 />} />
        <Route path="home-heading" element={<HomeHeading />} />


    </Routes>
  );
};

export default Index;

  
