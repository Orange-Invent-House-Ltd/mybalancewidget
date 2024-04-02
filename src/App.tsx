import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import ScrollToTop from "./components/reuseable/ScrollToTop";
import Seller from './pages/seller/index'
import Buyer from './pages/buyer/index'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/buyer/*" element={<Buyer />} />
        <Route path="/seller/*" element={<Seller />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
