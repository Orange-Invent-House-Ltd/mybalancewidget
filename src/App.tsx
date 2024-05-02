import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import ScrollToTop from "./components/reuseable/ScrollToTop";
import Seller from './pages/seller/index'
import Buyer from './pages/buyer/index'
import AuthLayout from "./layout/AuthLayout";
import SingleSignInVeriication from "./pages/auth/SingleSignInVeriication";
import Home from "./pages/auth/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/buyer/*" element={<Buyer />} />
        <Route path="/seller/*" element={<Seller />} />
        <Route path="/auth" element={<AuthLayout />} >
          <Route path="/auth/verify-otp" element={<SingleSignInVeriication/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
