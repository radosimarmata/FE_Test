import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import MasterData from "../pages/MasterData";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="/masterdata" element={<MasterData />} />
    </Routes>
  );
}
