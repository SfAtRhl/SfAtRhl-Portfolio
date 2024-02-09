import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "soufyane",
          from_email: form.email,
          to_email: "sofyan.ait.rehail@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);

          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);

          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <motion.div
      className="flex-[0.75] dark:bg-black-100 bg-tertiary
        dark:bg-tertiary-black shadow-[0_15px_60px_15px_rgba(0,0,0,0.3)] p-8 m-2 rounded-2xl"
    >
      <h3 className={`${styles.sectionHeadText} md:text-center`}>Hit me up!</h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8 text-tertiary-black dark:text-tertiary"
      >
        <div className="flex md:flex-row flex-col gap-8 w-full md:space-x-2">
          <label className="flex flex-col md:w-1/2">
            <span className="font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary  text-tertiary-black  rounded-lg font-medium border-[1px] dark:border-white border-primary"
            />
          </label>
          <label className="flex flex-col md:w-1/2">
            <span className="font-medium mb-4 ">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary  text-tertiary-black  rounded-lg font-medium border-[1px] dark:border-white border-primary"
            />
          </label>
        </div>

        <label className="flex flex-col">
          <span className="font-medium mb-4">Your Message</span>
          <textarea
            rows={7}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What you want to say?"
            className="bg-white py-4 px-6 placeholder:text-secondary  text-tertiary-black  rounded-lg font-medium border-[1px] dark:border-white border-primary "
          />
        </label>

        <button
          type="submit"
          className="py-3 px-8 rounded-md outline-none w-full dark:text-tertiary-black text-tertiary font-bold shadow-sm shadow-primary bg-primary dark:bg-primary-black"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </motion.div>
  );
};

export default SectionWrapper(Contact, "contact");
