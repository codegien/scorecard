require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');
const app = express();
const authRouter = require('./src/routes/auth.routes');
const candidateRouter = require('./src/routes/candidate.routes')
const examRouter = require('./src/routes/exam.routes')
const path = require('path')
const nodemailer =require('nodemailer');
const PORT = 8000

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
     }
});
connectDB();

app.use('/upload', express.static(path.join(__dirname, 'upload'))); 
//<img src: `http://localshop.com/${candidate.passport.url}`>
app.use('/api/v1/health', (req, res)=>{
    res.send('HEALTHY');
});
app.use('/api/v1/auth', authRouter );
app.use('/api/v1/candidate', candidateRouter )
app.use('/api/v1/exam', examRouter )

app.post('/send-email', async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: 'Emmanuel <codegienuel@gmail.com>',
      to: 'olusanyaoluwalonidaniel@gmail.com',
      subject: 'Hello from scorecard',
      text: 'This email was sent using Gmail SMTP and Nodemailer!',
      html: '<b>This email was sent using Gmail SMTP and Nodemailer!</b>'
    });

    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
app.listen(PORT, ()=>{
    console.log(`Score Card Server running on http://localhost:${PORT}`)
})
.on("error", (error) => {
    console.error(" ❌ server startup error, error");
});
