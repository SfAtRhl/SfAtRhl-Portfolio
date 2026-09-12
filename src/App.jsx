import { BrowserRouter } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Contact, Hero, Navbar, Works } from "./components";

const App = () => {
  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://sofyane-ait-rehail-portfolio.vercel.app";
  const title = "Ait Rehail | SfAtRhl";
  const description =
    "Ait Rehail Soufyane is a creative full-stack developer building fast, accessible, and scalable web and mobile experiences.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ait Rehail Soufyane",
    alternateName: "SfAtRhl",
    url: siteUrl,
    sameAs: ["https://github.com/SfAtRhl"],
    jobTitle: "Full-Stack Developer",
    knowsAbout: ["React", "Node.js", "MongoDB", "Flutter", "JavaScript"],
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div
          className="relative z-0 min-h-screen selection:bg-[var(--selection-bg)]"
          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
        >
          <Helmet>
            <html lang="en" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
              name="keywords"
              content="Ait Rehail, Soufyane, SfAtRhl, full-stack developer, React developer, Flutter developer, web developer, portfolio"
            />
            <meta name="author" content="Ait Rehail Soufyane" />
            <meta name="robots" content="index, follow" />
            <meta
              name="theme-color"
              content="#080a0f"
              media="(prefers-color-scheme: dark)"
            />
            <meta
              name="theme-color"
              content="#fbfbfc"
              media="(prefers-color-scheme: light)"
            />
            <link rel="canonical" href={`${siteUrl}/`} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="SfAtRhl Portfolio" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={`${siteUrl}/`} />
            <meta property="og:image" content={`${siteUrl}/favicon.ico`} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}/favicon.ico`} />

            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
          </Helmet>
          <Navbar />
          <Hero />
          <Works />
          <Contact />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
