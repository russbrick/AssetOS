exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false }) };
  }

  try {
    const { password } = JSON.parse(event.body || "{}");
    const correct = process.env.WEBSITE_PW;

    if (!correct) {
      return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: "WEBSITE_PW env var not set" }) };
    }

    if (password === correct) {
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    } else {
      return { statusCode: 401, headers, body: JSON.stringify({ ok: false }) };
    }
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false }) };
  }
};
