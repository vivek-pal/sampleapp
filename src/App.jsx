import { Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import Payment from "./features/payment/Payment";
import PageNotFound from "./components/common/PageNotFound/PageNotFound"
import './main.css';
import './index.css';
import CapturePaymentDetails from "./features/capturepaymentdetails/CapturePaymentDetails";
import CaptureCardDetails from "./features/capturecarddetails/CaptureCardDetails";
import CaptureGezimoDetails from "./features/capturegezimodetails/CaptureGezimoDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/capturepaymentdetails" element={<CapturePaymentDetails />} />
      <Route path="/capturecarddetails" element={<CaptureCardDetails />} />
      <Route path="/capturegezimodetails" element={<CaptureGezimoDetails />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App
