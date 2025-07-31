import React from "react";
import { Toaster } from "react-hot-toast";
import Homepage from "./pages/Homepage";
import SignUppage from "./pages/SignUppage";
import Loginpage from "./pages/Loginpage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUppage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Loginpage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="profile" element={authUser ? <ProfilePage /> : < Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
