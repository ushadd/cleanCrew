import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StaffSelection from "./pages/StaffSelection";
import Reviews from "./pages/Reviews";
import Footer from "./components/Footer";
import Header from "./components/Header";
import StaffRegister from "./pages/StaffRegister";
import BookingHistory from "./pages/BookingHistory";
import AdminDashboard from "./pages/AdminDashboard";
import './index.css';

function App() {
  return (
    <BrowserRouter>
      {/* The main-wrapper ensures the background color covers the full screen */}
      <div className="main-wrapper">
        <Header />

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/staff-selection" element={<StaffSelection />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/staff-register" element={<StaffRegister />} />
            <Route path="/my-bookings" element={<BookingHistory />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
