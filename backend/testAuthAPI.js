const BASE_URL = "http://localhost:5000/api/auth";

async function testAuthentication() {
  try {
    const email = `test${Date.now()}@fittrack.com`;
    const password = "FitTrack@123";

    console.log("\n--- TEST 1: User Registration ---");

    const registerResponse = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "FitTrack Test User",
        email,
        password
      })
    });

    const registerData = await registerResponse.json();

    console.log("Status:", registerResponse.status);
    console.log("Response:", registerData.message);

    if (!registerResponse.ok) {
      throw new Error(registerData.message);
    }

    console.log("Token received:", !!registerData.token);

    console.log("\n--- TEST 2: User Login ---");

    const loginResponse = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const loginData = await loginResponse.json();

    console.log("Status:", loginResponse.status);
    console.log("Response:", loginData.message);
    console.log("Token received:", !!loginData.token);

    console.log("\n--- TEST 3: Invalid Password ---");

    const invalidResponse = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: "WrongPassword123"
      })
    });

    console.log("Status:", invalidResponse.status);
    console.log("Expected: 401 Unauthorized");

    console.log("\nAuthentication tests completed.");

  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testAuthentication();