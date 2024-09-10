import "./App.css";
import "./css/bootstrap-datepicker.min.css";
import "./css/bootstrap.min.css";
import "./css/swiper-bundle.min.css";
import "./css/vendor.css";

import Nav from "./components/Nav";

function App() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>GoCar - Free Bootstrap Website Template for Car Rental</title>
      {/*vendor css ================================================== */}
      <link rel="stylesheet" type="text/css" href="css/vendor.css" />
      {/* Link Swiper's CSS */}
      <link rel="stylesheet" href="css/swiper-bundle.min.css" />
      {/*Bootstrap ================================================== */}
      <link href="css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="css/bootstrap-datepicker.min.css" />
      {/* Style Sheet ================================================== */}
      <link rel="stylesheet" type="text/css" href="style.css" />
      {/* Google Fonts ================================================== */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Raleway:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <Nav />
    </>
  );
}

export default App;
