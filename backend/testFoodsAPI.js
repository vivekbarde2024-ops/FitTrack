const http = require("http");

function sendRequest(path, method, body = null) {
    return new Promise((resolve, reject) => {
        const data = body ? JSON.stringify(body) : null;

        const options = {
            hostname: "localhost",
            port: 5000,
            path,
            method,
            headers: data ? {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(data)
            } : {}
        };

        const req = http.request(options, (res) => {
            let response = "";

            res.on("data", chunk => {
                response += chunk;
            });

            res.on("end", () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(response)
                    });
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on("error", reject);

        if (data) req.write(data);

        req.end();
    });
}

async function testFoodAPI() {
    try {
        console.log("\n--- TEST 1: Get All Foods ---");

        const allFoods = await sendRequest(
            "/api/foods",
            "GET"
        );

        console.log("Status:", allFoods.status);
        console.log("Foods Found:", allFoods.data.count);

        console.log("\n--- TEST 2: Search Rice ---");

        const search = await sendRequest(
            "/api/foods?search=rice",
            "GET"
        );

        console.log("Status:", search.status);
        console.log("Results:", search.data.data);

        console.log("\n--- TEST 3: Calculate Rice Nutrition ---");

        const calculation = await sendRequest(
            "/api/foods/calculate",
            "POST",
            {
                foodId: "rice_raw",
                quantity: 200
            }
        );

        console.log("Status:", calculation.status);
        console.log("Nutrition:", calculation.data);

    } catch (error) {
        console.error("API Test Failed:", error.message);
        console.error("Error Code:", error.code);
    }
}

testFoodAPI();