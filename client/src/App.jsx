import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Carousel from "./components/Carousel";
import Orders from "./components/Orders";
import NewOrder from "./components/NewOrder.jsx";
import About from "./components/About.jsx";
import Service from "./components/Service.jsx";
import News from "./components/News.jsx";
import Contact from "./components/Contact.jsx";
import Map from "./components/Map";

import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/signupPage.jsx";
import UserForm from "./components/UserList.jsx";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <Orders />
              <NewOrder />
              {/* <UserForm/> */}
            </>
          }
        />
        <Route path="/loginok" element={<LoginPage />} />
        <Route path="/signupok" element={<SignupPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
