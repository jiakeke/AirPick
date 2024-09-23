import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Nav from "./components/Nav.jsx";
import Carousel from "./components/Carousel";
import Orders from "./components/Orders";
import NewOrder from "./components/NewOrder.jsx";
import About from "./components/About.jsx";
import Service from "./components/Service.jsx";
import News from "./components/News.jsx";
import Contact from "./components/Contact.jsx";
import Map from "./components/Map";

import UserForm from "./components/UserList.jsx";

function App() {
  const [isAuthed, setIsAuthed] = useState(
    JSON.parse(localStorage.getItem("user"))  || false);
    //console.log(isAuthed.category);
  return (
    <BrowserRouter>
      <Nav isAuthed={isAuthed} setIsAuthed={setIsAuthed}/>
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
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
