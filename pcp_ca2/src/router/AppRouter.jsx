import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Activities from "../pages/Activities";
import ActivityDetail from "../pages/ActivityDetail";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";
import Navbar from "../components/Navbar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/activities" replace />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;