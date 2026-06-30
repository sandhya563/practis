require("dotenv").config();

const express = require("express");
const sequelize = require("./config/database");
const routes = require("./routes/index.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// ================= APP LEVEL MIDDLEWARE =================

// Parse JSON body
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));


// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running"
    });
});


// ================= ROUTES =================

app.use("/api", routes);


// ================= 404 HANDLER =================

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// ================= GLOBAL ERROR MIDDLEWARE =================

app.use((err, req, res, next) => {
    console.error(err);

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});


// ================= START SERVER =================

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
    }
}

startServer();