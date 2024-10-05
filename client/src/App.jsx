import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Nav from "./components/Nav.jsx";
import Carousel from "./components/Carousel";
import OrdersList from "./components/OrdersList";
import About from "./components/About.jsx";
import Service from "./components/Service.jsx";
import News from "./components/News.jsx";
import Contact from "./components/Contact.jsx";
import UserForm from "./components/UserForm.jsx";
import DepositForm from "./components/DepositForm.jsx";
import WithDrawalForm from "./components/WithDrawalForm.jsx";

import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { useAuth, AuthProvider } from "./hooks/useAuth";

function App() {
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <OrdersList />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<UserForm />} />
          <Route path="/deposit" element={<DepositForm />} />
          <Route path="/withDrawal" element={<WithDrawalForm />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/reset_password/:token" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
