import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Carousel from "./components/Carousel";
import Orders from "./components/Orders";
import Map from "./components/Map";

import loginPage from "./components/loginPage.jsx";
import sighupPage from "./components/signUpPage.jsx";

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
            </>
          }
        />
        <Route path="/loginOK" element={<loginPage />} />
        <Route path="/signupOK" element={<sighupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
