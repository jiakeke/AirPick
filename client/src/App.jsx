import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Carousel from "./components/Carousel";
import NewOrder from "./components/NewOrder.jsx";
import About from "./components/About.jsx";
import Service from "./components/Service.jsx";
import News from "./components/News.jsx";
import Contact from "./components/Contact.jsx";
import Map from "./components/Map";
import PassengerOrders from "./components/PassengerOrder";
import DriverOrders from "./components/DriverOrder";

function App() {
  const [isAuthed, setIsAuthed] = useState(JSON.parse(localStorage.getItem("user")) || false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsAuthed(user);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Nav isAuthed={isAuthed} setIsAuthed={setIsAuthed} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />
              {isAuthed ? (
                isAuthed.category === 'passenger' ? (
                  <>
                    <NewOrder isAuthed={isAuthed} />
                    <PassengerOrders isAuthed={isAuthed} />
                  </>
                ) : isAuthed.category === 'driver' ? (
                  <DriverOrders isAuthed={isAuthed} />
                ) : (
                  <div>Invalid user type</div>
                )
              ) : null
              }
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
