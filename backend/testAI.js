async function testAI() {
  try {
    const response = await fetch("http://localhost:5000/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Give me three beginner-friendly tips for building muscle."
      })
    });

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("AI Response:", result.reply || result.message);

  } catch (error) {
    console.log("Test failed:", error.message);
  }
}

testAI();