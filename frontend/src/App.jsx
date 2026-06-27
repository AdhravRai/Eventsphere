import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import Attendance from "./pages/Attendance";
import Certificates from "./pages/Certificates";
import Events from "./pages/Events";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import PaymentScreen from "./pages/PaymentScreen";
import OrganizerSubscriptionPlans from "./pages/OrganizerSubscriptionPlans";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/events" element={<Events />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/subscription" element={<SubscriptionPlans />} />
<Route path="/subscription/payment" element={<PaymentScreen />} />
<Route path="/organizer-subscription" element={<OrganizerSubscriptionPlans />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;