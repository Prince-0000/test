'use client'
import { useState } from "react";
import { submitFeedback } from "../../lib/api";
import FeedbackPage from "../Components/Feedback/FeedbackUrl";

export default function feedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFeedback(name, message);
    setSuccess(true);
    setName("");
    setMessage("");
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Feedback Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Your feedback"
          className="border p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
        {success && <p className="text-green-600">Feedback submitted!</p>}
      </form>

      <FeedbackPage/>
    </main>
  );
}
