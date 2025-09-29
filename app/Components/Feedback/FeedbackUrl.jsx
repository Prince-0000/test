'use client'
import { useEffect, useState } from "react";
import { getFeedback } from "../../../lib/api";

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getFeedback();
        setFeedbackList(Array.isArray(data) ? data : []); // Safe fallback
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedbackList([]);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl text-black dark:text-gray-200 font-bold mb-4">All Feedback</h1>
      {feedbackList.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbackList.map((fb, index) => (
          <div key={index} className="border p-4 mb-2 rounded bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-200">
            <p className="font-semibold">{fb.name}</p>
            <p>{fb.message}</p>
          </div>
        ))
      )}
    </main>
  );
}
