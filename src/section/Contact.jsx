import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { SectionWrapper } from "../hoc";

/* ── Animated status toast ── */
const Toast = ({ toast }) => (
  <AnimatePresence>
    {toast && (
      <motion.div
        key={toast.status}
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className={`toast toast-${toast.status}`}
      >
        <span className="toast-icon">
          {toast.status === "success" ? "✓" : "!"}
        </span>
        <div className="flex-1 text-sm">
          <p className="font-medium">{toast.title}</p>
          {toast.message && <p className="opacity-80 text-xs mt-0.5">{toast.message}</p>}
        </div>
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
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (status, title, message) => {
    setToast({ status, title, message });
    setTimeout(() => setToast(null), 6000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLoading(false);
        setForm({ name: "", email: "", message: "" });
        showToast(
          "success",
          "Message sent successfully!",
          "I'll get back to you promptly."
        );
      } else {
        setLoading(false);
        showToast(
          "error",
          "Failed to send message",
          data.error || "Please try again or email me directly at sofyan.ait.rehail@gmail.com."
        );
      }
    } catch (err) {
      setLoading(false);
      console.error("Email send failed:", err);
      showToast(
        "error",
        "Unable to send message",
        "Could not send your message right now. You can email me directly at sofyan.ait.rehail@gmail.com."
      );
    }
  };

  const filled = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <>
      <style>{`
        .contact-root {
          font-family: 'DM Sans', sans-serif;
          color: var(--text-primary);
        }

        .contact-shell {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          padding: 44px 40px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          box-shadow: var(--shadow-card);
          backdrop-filter: blur(12px);
        }
        @media (max-width: 640px) {
          .contact-shell { padding: 32px 20px; }
        }

        .contact-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(34px, 4.5vw, 52px);
          font-weight: 800;
          letter-spacing: -.03em;
          line-height: 1.05;
          margin-bottom: 10px;
          color: var(--text-primary);
        }
        .contact-headline em {
          font-style: normal;
          color: var(--accent);
        }

        .contact-subtext {
          font-size: 15px;
          color: var(--text-muted);
          font-weight: 300;
          margin-bottom: 36px;
          max-width: 480px;
          line-height: 1.7;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .contact-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        @media (max-width: 640px) {
          .contact-row { grid-template-columns: 1fr; }
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .contact-field-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--text-subtle);
        }

        .contact-input,
        .contact-textarea {
          width: 100%;
          background: var(--input-bg);
          border: 1px solid var(--input-border);
          border-radius: 12px;
          padding: 13px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          font-weight: 400;
          color: var(--text-primary);
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          resize: none;
        }
        .contact-input::placeholder,
        .contact-textarea::placeholder {
          color: var(--input-placeholder);
          font-weight: 300;
        }
        .contact-input:focus,
        .contact-textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-subtle);
        }

        .contact-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          background: var(--accent);
          color: var(--accent-contrast);
          width: 100%;
          transition: transform .2s, box-shadow .2s, opacity .2s;
        }
        .contact-submit:disabled {
          opacity: .5;
          cursor: not-allowed;
        }
        .contact-submit:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px -2px rgba(22, 163, 74, 0.35);
        }

        .contact-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: currentColor;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .toast {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 12px;
          margin-top: 14px;
          border: 1px solid;
        }
        .toast-success {
          background: var(--accent-subtle);
          border-color: var(--border-hover);
          color: var(--text-primary);
        }
        .toast-error {
          background: rgba(239, 68, 68, 0.08);
          border-color: rgba(239, 68, 68, 0.25);
          color: var(--text-primary);
        }
        .toast-icon {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid currentColor;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .direct-email {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 13.5px;
          color: var(--text-muted);
        }
        .direct-email-link {
          color: var(--accent);
          font-family: 'DM Mono', monospace;
          font-weight: 500;
          text-decoration: none;
          transition: color .2s;
        }
        .direct-email-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="contact-root">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="contact-shell"
        >
          {/* Header — clean headline without banned eyebrow */}
          <h2 className="contact-headline">
            Let's <em>work</em> together.
          </h2>
          <p className="contact-subtext">
            Have a project in mind, an opportunity, or just want to discuss ideas?
            Send a message and I'll respond as soon as possible.
          </p>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <div className="contact-row">
              <Field label="Your Name">
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

              <Field label="Email Address">
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
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, timeline, or idea…"
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
                  <div className="contact-spinner" />
                  <span>Sending message…</span>
                </>
              ) : (
                <span>Send message ↗</span>
              )}
            </motion.button>

            <Toast toast={toast} />

            <div className="direct-email">
              <span>Prefer writing directly?</span>
              <a
                href="mailto:sofyan.ait.rehail@gmail.com"
                className="direct-email-link"
              >
                sofyan.ait.rehail@gmail.com ↗
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
