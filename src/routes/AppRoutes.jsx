import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import InterviewDashboard from "../pages/InterviewDashboard";

/*
  Route structure:
  /                                                    → HomePage
  /interview/:company/:role/:experience                → InterviewDashboard  (Sprint 1 ✅)
  /interview/:company/:role/:experience/:round         → RoundDetailView     (Sprint 2)
  /interview/:company/:role/:experience/:round/:topic  → TopicView           (Sprint 2)
*/

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Home ── */}
        <Route path="/" element={<HomePage />} />

        {/* ── Interview Generator Flow ── */}
        <Route
          path="/interview/:company/:role/:experience"
          element={<InterviewDashboard />}
        />

        {/* Sprint 2 — uncomment when RoundDetailView is ready */}
        {/*
        <Route
          path="/interview/:company/:role/:experience/:round"
          element={<RoundDetailView />}
        />
        <Route
          path="/interview/:company/:role/:experience/:round/:topic"
          element={<TopicView />}
        />
        */}

        {/* ── Fallback ── */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;