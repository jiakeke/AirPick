import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Carousel from "./components/Carousel";
import Orders from "./components/Orders";
import Map from "./components/Map";

import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/signupPage.jsx";
import UserForm from "./components/UserList.jsx";

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
              {/* <UserForm/> */}
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
