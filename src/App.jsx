import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Contact, Hero, Navbar, Works } from "./components";

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="relative z-0 dark:bg-primary bg-primary-black">
          <Helmet>
            <html lang="en" />
            <title>Ait Rehail | SfAtRhl</title>
            <meta
              name="description"
              content="Ait Rehail Soufyane a passionate and creative developer interest in Web and Mobile Developement. "
            />
            <meta name="robots" content="index, follow" />
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          </Helmet>
          <div className=" bg-cover bg-no-repeat bg-center dark:bg-primary bg-white">
            <Navbar />
            <Hero />
          </div>
          <Works />
          <Contact />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
