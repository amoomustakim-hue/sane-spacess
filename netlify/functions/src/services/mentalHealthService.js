exports.handler = async function (event) {
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

  if (!process.env.MENTAL_HEALTH_API_URL || !process.env.MENTAL_HEALTH_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing MENTAL_HEALTH_API_URL or MENTAL_HEALTH_API_KEY environment variables" })
    };
  }

  try {
    const res = await fetch(process.env.MENTAL_HEALTH_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MENTAL_HEALTH_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    if (!res.ok) {
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "Upstream service error", status: res.status, body: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data?.reply || data?.[0]?.generated_text || (typeof data === 'string' ? data : '')
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Service temporarily unavailable.", error: String(err) })
    };
  }
};

