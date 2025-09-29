import { useState } from "react";
import emailjs from "emailjs-com"; // npm install emailjs-com

export default function PopupForm({ isOpen, setIsOpen }) {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    emailjs
      .send(
        "service_3zpvuzj", // your EmailJS service ID
        "template_n466is8", // your EmailJS template ID
        {
          name: formData.name,   // 👈 must match {{name}} in your template
          email: formData.email, // 👈 must match {{email}} in your template
        },
        "eavmTUN9H1iqTS0v3" // your EmailJS public key
      )
      .then(() => {
        setSending(false);
        setSuccess(true);
      })
      .catch((err) => {
        setSending(false);
        setError("Failed to send, please try again.");
        console.error("EmailJS error:", err?.text || err);
        alert(`Email send failed: ${err?.text || "Unknown error"}`);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm rounded-2xl flex justify-center items-center z-50">
      <div className="bg-white text-black dark:text-white dark:bg-gray-950 p-10 rounded shadow-md text-center relative  w-96">
        <h2 className="text-xl font-semibold text-violet-600 mb-4">Get Updates For New Articles</h2>

        {success ? (
          <p className="mb-4 text-green-600">
            Thank you! Your message has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              disabled={sending}
              className="bg-violet-600 text-white px-4 py-2 rounded-lg w-full"
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </form>
        )}

        {error && <p className="mt-2 text-red-600">{error}</p>}

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
          aria-label="Close popup"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

