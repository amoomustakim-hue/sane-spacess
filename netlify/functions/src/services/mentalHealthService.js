export async function sendMentalHealthMessage(message, category) {
  const res = await fetch("/.netlify/functions/mentalHealthAI", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, category })
  });

  return res.json();
}
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const { message, category } = JSON.parse(event.body || "{}");

  if (!message) {
    return { statusCode: 400, body: "Message required" };
  }

  const prompt =
    `instruction: Respond supportively without diagnosis.\n` +
    `category: ${category}\ninput: ${message}`;

  try {
    const res = await fetch(process.env.MENTAL_HEALTH_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MENTAL_HEALTH_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const data = await res.json();  
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data?.reply || data?.[0]?.generated_text || ""
      })
    };
    
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Service temporarily unavailable." })
    };
  }
}

