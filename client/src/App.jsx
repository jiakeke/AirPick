import { BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth, AuthProvider } from "./hooks/useAuth";

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

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash.startsWith('#/')) {
      const path = hash.slice(1);
      navigate(path, { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
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
  );
}

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
