const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());

app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FitTrack AI Backend is running!"
    });
});

// Start server and connect database
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`FitTrack AI server running on port ${PORT}`);
    });
};

startServer();

const dietRoutes = require("./routes/dietRoutes");

app.use(express.json());

app.use("/api/diet", dietRoutes);

const foodRoutes = require("./routes/foodRoutes");

app.use("/api/foods", foodRoutes);

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const aiRoutes = require("./routes/aiRoutes");

app.use("/api/ai", aiRoutes);