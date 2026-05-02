import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

/* ── Animated status toast ── */
const Toast = ({ status }) => (
  <AnimatePresence>
    {status && (
      <motion.div
        key={status}
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`toast toast-${status}`}
      >
        {status === "success" ? (
          <>
            <span className="toast-icon">✓</span> Message sent — I'll be in
            touch soon.
          </>
        ) : (
          <>
            <span className="toast-icon">✕</span> Something went wrong. Please
            try again.
          </>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

/* ── Floating label input ── */
const Field = ({ label, children }) => (
  <label className="contact-field">
    <span className="contact-field-label">{label}</span>
    {children}
  </label>
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // "success" | "error" | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (status) => {
    setToast(status);
    setTimeout(() => setToast(null), 4000);
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
      .then(() => {
        setLoading(false);
        setForm({ name: "", email: "", message: "" });
        showToast("success");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        showToast("error");
      });
  };

  const filled = form.name && form.email && form.message;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

        .contact-root {
          font-family: 'DM Sans', sans-serif;
          color: var(--contact-text, #f8fafc);
          --contact-text: #f8fafc;
          --contact-muted: rgba(248,250,252,0.62);
          --contact-label: rgba(248,250,252,0.45);
          --contact-accent: #4ade80;
          --contact-accent-contrast: #0a0c10;
          --contact-shell-bg: rgba(255,255,255,0.02);
          --contact-shell-border: rgba(255,255,255,0.07);
          --contact-input-bg: rgba(255,255,255,0.03);
          --contact-input-border: rgba(255,255,255,0.1);
          --contact-placeholder: rgba(248,250,252,0.4);
        }

        :root:not(.dark) .contact-root {
          --contact-text: #0f172a;
          --contact-muted: rgba(15,23,42,0.72);
          --contact-label: rgba(15,23,42,0.55);
          --contact-shell-bg: rgba(15,23,42,0.02);
          --contact-shell-border: rgba(15,23,42,0.1);
          --contact-input-bg: rgba(15,23,42,0.03);
          --contact-input-border: rgba(15,23,42,0.14);
          --contact-placeholder: rgba(15,23,42,0.45);
        }

        /* ── Shell ── */
        .contact-shell {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          padding: 48px 48px 52px;
          background: var(--contact-shell-bg);
          border: 1px solid var(--contact-shell-border);
          backdrop-filter: blur(12px);
        }
        /* Ambient glow top-left */
        .contact-shell::before {
          content: '';
          position: absolute;
          top: -80px; left: -80px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        /* Accent top border */
        .contact-shell::after {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(74,222,128,0.4), transparent);
        }

        /* ── Header ── */
        .contact-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--contact-accent);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .contact-eyebrow::before {
          content: '';
          width: 24px; height: 1px;
          background: var(--contact-accent);
        }
        .contact-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 800;
          letter-spacing: -.03em;
          line-height: 1.05;
          margin-bottom: 8px;
        }
        .contact-headline em {
          font-style: normal;
          color: var(--contact-accent);
        }
        .contact-subtext {
          font-size: 14px;
          color: var(--contact-muted);
          font-weight: 300;
          margin-bottom: 40px;
          max-width: 420px;
        }

        /* ── Form grid ── */
        .contact-form { display: flex; flex-direction: column; gap: 24px; }
        .contact-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 640px) { .contact-row { grid-template-columns: 1fr; } }

        /* ── Field ── */
        .contact-field { display: flex; flex-direction: column; gap: 8px; }
        .contact-field-label {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--contact-label);
        }

        /* ── Input / Textarea ── */
        .contact-input,
        .contact-textarea {
          width: 100%;
          background: var(--contact-input-bg);
          border: 1px solid var(--contact-input-border);
          border-radius: 12px;
          padding: 14px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          font-weight: 400;
          color: inherit;
          outline: none;
          transition: border-color .25s, background .25s, box-shadow .25s;
          resize: none;
        }
        .contact-input::placeholder,
        .contact-textarea::placeholder {
          color: var(--contact-placeholder);
          font-weight: 300;
        }
        .contact-input:focus,
        .contact-textarea:focus {
          border-color: rgba(74,222,128,0.45);
          background: rgba(74,222,128,0.04);
          box-shadow: 0 0 0 3px rgba(74,222,128,0.07);
        }

        /* ── Submit button ── */
        .contact-submit {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 36px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          background: var(--contact-accent);
          color: var(--contact-accent-contrast);
          width: 100%;
          overflow: hidden;
          transition: box-shadow .25s, transform .2s;
        }
        .contact-submit:disabled { opacity: .6; cursor: not-allowed; }
        .contact-submit:not(:disabled):hover {
          box-shadow: 0 0 28px 4px rgba(74,222,128,0.3);
          transform: translateY(-2px);
        }
        .contact-submit:not(:disabled):active { transform: translateY(0); }

        /* Shimmer on submit */
        .contact-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform .55s;
        }
        .contact-submit:not(:disabled):hover::before { transform: translateX(100%); }

        /* Loading spinner */
        .contact-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(10,12,16,0.25);
          border-top-color: var(--contact-accent-contrast);
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Toast ── */
        .toast {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 13.5px;
          font-weight: 400;
          margin-top: 12px;
          border: 1px solid;
        }
        .toast-success {
          background: rgba(74,222,128,0.08);
          border-color: rgba(74,222,128,0.25);
          color: var(--contact-accent);
        }
        .toast-error {
          background: rgba(248,113,113,0.08);
          border-color: rgba(248,113,113,0.25);
          color: #f87171;
        }
        .toast-icon {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          width: 22px; height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid currentColor;
          flex-shrink: 0;
        }

        /* ── Decorative aside ── */
        .contact-aside {
          position: absolute;
          top: 48px; right: 48px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          opacity: .18;
          pointer-events: none;
        }
        @media (max-width: 768px) { .contact-aside { display: none; } }
        .aside-line { height: 1px; background: currentColor; }
      `}</style>

      <div className="contact-root">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="contact-shell"
        >
          {/* Decorative lines */}
          <div className="contact-aside">
            {[80, 48, 64, 32, 56].map((w, i) => (
              <div key={i} className="aside-line" style={{ width: w }} />
            ))}
          </div>

          {/* Header */}
          <p className="contact-eyebrow">Get in touch</p>
          <h3 className="contact-headline">
            Let's <em>work</em> together.
          </h3>
          <p className="contact-subtext">
            Have a project in mind, a question, or just want to say hi? I read
            every message and reply promptly.
          </p>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="contact-row">
              <Field label="Your name">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="contact-input"
                />
              </Field>
              <Field label="Email address">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="contact-input"
                />
              </Field>
            </div>

            <Field label="Message">
              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, idea, or just say hello…"
                required
                className="contact-textarea"
              />
            </Field>

            <motion.button
              type="submit"
              disabled={loading || !filled}
              className="contact-submit"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <div className="contact-spinner" /> Sending…
                </>
              ) : (
                <>Send message ↗</>
              )}
            </motion.button>

            <Toast status={toast} />
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
