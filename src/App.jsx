import { BrowserRouter } from "react-router-dom";

import { Contact, Hero, Navbar, Works } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 dark:bg-primary bg-primary-black">
        <div className=" bg-cover bg-no-repeat bg-center dark:bg-primary bg-white">
          <Navbar />
          <Hero />
        </div>
        <Works />
        <Contact />
      </div>
    </BrowserRouter>
  );
};

export default App;
