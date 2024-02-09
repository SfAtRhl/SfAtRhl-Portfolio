import { womenbag, portfolio, mern } from "../assets";

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
    description:
      "A MERN blog, fortified with the robust combination of MongoDB, Express.js, React.js, and Node.js, is a dynamic web application tailored for a modern blogging experience.",
    tags: [
      {
        name: "react",
      },
      {
        name: "mongodb",
      },
      {
        name: "tailwind",
      },
      {
        name: "express",
      },
      {
        name: "nodejs",
      },
    ],
    image: mern,
    source_code_link: "https://github.com/SfAtRhl/Mern-Blog",
  },
  {
    name: "Women Bag App",
    description:
      "Fashionista's Haven! Order stylish bags, explore popular picks & get personalized recommendations. 💼",
    tags: [
      {
        name: "dart",
        color: "green-text-gradient",
      },
      {
        name: "flutter",
        color: "pink-text-gradient",
      },
    ],
    image: womenbag,
    source_code_link: "https://github.com/SfAtRhl/womensbagapp",
  },
  {
    name: "Responsive Portfolio",
    description:
      "WPA Responsive Portfolio: Showcasing Projects, Contact Info, Tech Stack, About Me. Modern & Professional",
    tags: [
      {
        name: "dart",
      },
      {
        name: "flutter",
      },
      {
        name: "firebase",
      },
    ],
    image: portfolio,
    source_code_link: "https://github.com/SfAtRhl/portfolio_responsive",
    web_link: "https://ait-rehail-soufyane.web.app/",
  },
];

export { projects };
