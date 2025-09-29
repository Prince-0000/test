const API_URL = "http://localhost:8080/api/feedback";

export async function submitFeedback(name, message ){
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  });
  return res.json();
}


export async function getFeedback() {
  const res = await fetch(API_URL);
  return res.json();
}
