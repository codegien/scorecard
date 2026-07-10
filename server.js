require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');
const app = express();
const PORT = 8000

app.use(express.json());
connectDB();
app.listen(PORT, ()=>{
    console.log(`Score Card Server running on http://localhost:${PORT}`)
})
.on("error", (error) => {
    console.error(" ❌ server startup error, error");
});
