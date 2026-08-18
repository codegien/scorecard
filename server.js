const express = require('express');
const connectDB = require('./src/config/database');
const app = express();
const authRouter = require('./src/routes/auth.routes');
const candidateRouter = require('./src/routes/candidate.routes');
const examRouter = require('./src/routes/exam.routes');
const path = require('path');
const nodemailer = require('nodemailer');
const initNotifications = require('./src/notifications.init');
const PORT = 8000;

app.use(express.json());
require('dotenv').config();

// Create an async function to handle database connection and notifications safely
async function startApp() {
    try {
        // Connect to Database
        await connectDB();
        
        // Initialize Notifications
        await initNotifications();
        
        // Start the server only after connections are ready
        app.listen(PORT, () => {
            console.log(`Score Card Server running on http://localhost:${PORT}`);
        }).on("error", (error) => {
            console.error(" ❌ server startup error:", error);
        });

    } catch (error) {
        console.error(" ❌ Failed to initialize application:", error);
        process.exit(1); // Stop the app if initialization fails
    }
}

// Routes and Middleware
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api/v1/health', (req, res) => {
    res.send('HEALTHY');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/candidate', candidateRouter);
app.use('/api/v1/exam', examRouter);

// Run the initialization
startApp();
