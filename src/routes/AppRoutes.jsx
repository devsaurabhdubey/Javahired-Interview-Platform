import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import InterviewDashboard from "../pages/InterviewDashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                                             element={<HomePage />} />
        <Route path="/interview/:company/:role/:experience"         element={<InterviewDashboard />} />
        <Route path="/interview/:company/:role/:experience/:round"  element={<InterviewDashboard />} />
        <Route path="*"                                             element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;