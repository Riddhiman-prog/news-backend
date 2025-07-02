module.exports = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "No content provided" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Summarize the following article in 3 bullet points:\n\n${content}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (summary) {
      res.json({ summary });
    } else {
      res.status(500).json({ error: "Gemini didn't return summary" });
    }
  } catch (err) {
    console.error("Error talking to Gemini:", err);
    res.status(500).json({ error: "Something went wrong on the server" });
  }
};
