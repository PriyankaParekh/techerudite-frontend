import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CustomerRegistrationPage from "./pages/customer-registration-page";
import AdminRegistrationPage from "./pages/admin-registration-page";
import Login from "./pages/login";
import NotFound from "./components/not-found";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/customer-registration"
              element={<CustomerRegistrationPage />}
            ></Route>
            <Route
              path="/admin-registration"
              element={<AdminRegistrationPage />}
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
