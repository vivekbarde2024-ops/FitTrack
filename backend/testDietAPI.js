const http = require("http");

const data = JSON.stringify({
    weight: 60,
    height: 178,
    age: 23,
    gender: "male",
    activityLevel: "active",
    goal: "lean_muscle_gain"
});

const options = {
    hostname: "localhost",
    port: 5000,
    path: "/api/diet/calculate",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    let response = "";

    res.on("data", chunk => {
        response += chunk;
    });

    res.on("end", () => {
        console.log("Status:", res.statusCode);
        console.log("Response:", JSON.parse(response));
    });
});

req.on("error", error => {
    console.error("API Test Failed!");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
});

req.write(data);
req.end();