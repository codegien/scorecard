require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');
const app = express();
const authRouter = require('./src/routes/auth.routes');
const candidateRouter = require('./src/routes/candidate.routes')
const examRouter = require('./src/routes/exam.routes')
const path = require('path')
const PORT = 8000

app.use(express.json());
connectDB();

app.use('/upload', express.static(path.join(__dirname, 'upload'))); 
//<img src: `http://localshop.com/${candidate.passport.url}`>
app.use('/api/v1/health', (req, res)=>{
    res.send('HEALTHY');
});
app.use('/api/v1/auth', authRouter );
app.use('/api/v1/candidate', candidateRouter )
app.use('/api/v1/exam', examRouter )

app.listen(PORT, ()=>{
    console.log(`Score Card Server running on http://localhost:${PORT}`)
})
.on("error", (error) => {
    console.error(" ❌ server startup error, error");
});
