import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Carousel from "./components/Carousel";
import Orders from "./components/Orders";
import NewOrder from "./components/NewOrder.jsx";
import Map from "./components/Map";

import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/signupPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Carousel />
              <Orders />
              <NewOrder />
            </>
          }
        />
        <Route path="/loginok" element={<LoginPage />} />
        <Route path="/signupok" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
