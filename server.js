const dotenv = require('dotenv');
const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');

dotenv.config();


const app = express();

const port = process.env.PORT || 3000;


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionSuccessStatus: 200
};


app.use(cors(corsOptions));



const templatePath = './template/email-template.html';
const templateContent = fs.readFileSync(templatePath, 'utf-8');


function replacePlaceholders(html, data) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const placeholder = `{{${key}}}`;
            html = html.replace(new RegExp(placeholder, 'g'), data[key]);
        }
    }
    return html;
}


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/send', upload.single('file'), async (req, res) => {
    try {
        
        const { name, subject, email, message } = req.body;

        
        if (!name || !subject || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        
        const attachmentData = req.file ? {
            filename: req.file.originalname,
            content: req.file.buffer
        } : null;

       
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

       
        const emailHtml = replacePlaceholders(templateContent, { name, subject, email, message });

       
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: [process.env.RECIPIENT_EMAIL, 'secondRecipient@example.com'],
            subject: `New message from ${name} with subject ${subject}`,
            text: `New message \n\nSubject: ${subject}\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n\n${message}`,
            html: emailHtml,
            attachments: attachmentData ? [attachmentData] : []
        };

       
        const info = transporter.sendMail(mailOptions);

       
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
       
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
