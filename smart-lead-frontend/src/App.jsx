import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./alllpages/Login";
import Home from "./components/Home"
import LeadForm from "./components/LeadForm";
import TotalLeads from "./components/admin/TotalLeads";
import Providers from "./components/admin/Providers";
import PendingLeads from "./components/admin/PendingLeads";
import MyWork from "./components/provider/MyWork";
import Analytics from "./components/admin/Analytics";
import AllLeads from "./components/admin/AllLeads";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/request-service" element={<LeadForm />} />


        //admin
        <Route path="/total-leads" element={<TotalLeads />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/pending-leads" element={<PendingLeads />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/all-leads"  element={<AllLeads />}/>


        //provider
        <Route
          path="/my-work"
          element={<MyWork />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;