import {
  mern,
  portfolio,
  womenbag,
  fourTech,
  musicapp,
  icecream,
  plagiarism,
  sportclub,
  powerbi,
} from "../assets";

export const navLinks = [
  {
    id: "Whoami",
    title: "Whoami",
  },
  {
    id: "projects",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const projects = [
  {
    name: "Blog Website",
    category: "Full-Stack",
    description:
      "A full-stack MERN blogging application featuring JWT authentication, rich-text markdown publishing, category tagging, and a responsive reading experience.",
    tags: [
      { name: "react" },
      { name: "mongodb" },
      { name: "express" },
      { name: "nodejs" },
      { name: "tailwind" },
    ],
    image: mern,
    source_code_link: "https://github.com/SfAtRhl/Mern-Blog",
  },
  {
    name: "4Tech Lab Platform",
    category: "Web",
    description:
      "Modern server-side rendered application built with Nuxt.js and Vue, featuring modular component architecture, fluid animations, and responsive layouts.",
    tags: [
      { name: "nuxt" },
      { name: "vue" },
      { name: "tailwind" },
      { name: "javascript" },
    ],
    image: fourTech,
    source_code_link: "https://github.com/SfAtRhl/4tech-lab-Nuxt",
    web_link: "https://4tech-lab-nuxt.vercel.app",
  },
  {
    name: "Women Bag App",
    category: "Mobile",
    description:
      "Fashionista's Haven — an elegant Flutter e-commerce mobile application featuring catalog discovery, animated product details, and smooth checkout flow.",
    tags: [
      { name: "flutter" },
      { name: "dart" },
    ],
    image: womenbag,
    source_code_link: "https://github.com/SfAtRhl/womensbagapp",
  },
  {
    name: "Music Player App",
    category: "Mobile",
    description:
      "Cross-platform Flutter music streaming and playback application with custom audio player controls, dynamic search, and modern dark UI.",
    tags: [
      { name: "flutter" },
      { name: "dart" },
    ],
    image: musicapp,
    source_code_link: "https://github.com/SfAtRhl/music_app",
  },
  {
    name: "Ice Cream Shop App",
    category: "Mobile",
    description:
      "Delightful mobile shopping app for dessert ordering, featuring custom flavor selection, animated cart updates, and interactive UI micro-interactions.",
    tags: [
      { name: "flutter" },
      { name: "dart" },
    ],
    image: icecream,
    source_code_link: "https://github.com/SfAtRhl/IceCreamApp",
  },
  {
    name: "Responsive Portfolio",
    category: "Mobile",
    description:
      "Cross-platform responsive portfolio PWA built with Flutter and Firebase, showcasing multi-device fluid layouts and interactive design components.",
    tags: [
      { name: "flutter" },
      { name: "dart" },
      { name: "firebase" },
    ],
    image: portfolio,
    source_code_link: "https://github.com/SfAtRhl/portfolio_responsive",
    web_link: "https://ait-rehail-soufyane.web.app/",
  },
  {
    name: "Plagiarism Checker",
    category: "Tools",
    description:
      "Intelligent text similarity analyzer and plagiarism detection web utility comparing documents with string matching and highlighted diff reports.",
    tags: [
      { name: "javascript" },
      { name: "html" },
      { name: "css" },
    ],
    image: plagiarism,
    source_code_link: "https://github.com/SfAtRhl/Plagiarism-Checker",
  },
  {
    name: "Sport Club Portal",
    category: "Full-Stack",
    description:
      "Full-stack sports club management portal powered by CodeIgniter PHP and MySQL for handling team rosters, tournament schedules, and memberships.",
    tags: [
      { name: "php" },
      { name: "codeigniter" },
      { name: "mysql" },
      { name: "css" },
    ],
    image: sportclub,
    source_code_link: "https://github.com/SfAtRhl/Codigniter-Sport-Club",
  },
  {
    name: "Sales Intelligence BI",
    category: "Data",
    description:
      "Interactive executive business intelligence dashboard visualizing multi-region sales, customer demographic segments, and geographical performance KPIs.",
    tags: [
      { name: "power-bi" },
    ],
    image: powerbi,
    source_code_link: "https://github.com/SfAtRhl/Power-BI-Report",
  },
];

export { projects };
