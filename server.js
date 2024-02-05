const dotenv = require('dotenv');
const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');

dotenv.config();

//create a new Express instance
const app = express();
//store the port
const port = process.env.PORT || 3000;

//configure the Express middleware to accept Angular miltipart/form-data needed for the attachment and parse request body into .json
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//define the cors options
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionSuccessStatus: 200
};

//configure the Express middleware to use the cors option we defined
app.use(cors(corsOptions));


//store email template path and store the emailTemplate in templateContent
const templatePath = './template/email-template.html';
const templateContent = fs.readFileSync(templatePath, 'utf-8');

// create a function to replace placeholders in the email template with received data
function replacePlaceholders(html, data) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const placeholder = `{{${key}}}`;
            html = html.replace(new RegExp(placeholder, 'g'), data[key]);
        }
    }
    return html;
}

// configure multer to use memory storage to receive attachment
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// define send endpoint, which will send emails and response with the corresponding status
app.post('/send', upload.single('file'), async (req, res) => {
    try {
        
        const { name, subject, email, message } = req.body;

        // extra backend validation
        if (!name || !subject || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // store attachment if provided
        const attachmentData = req.file ? {
            filename: req.file.originalname,
            content: req.file.buffer
        } : null;

        // create nodemailer transport
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        // replace placeholders in the email template with received data
        const emailHtml = replacePlaceholders(templateContent, { name, subject, email, message });

        // define the options of your email like to/from-headers, subject line, body text, html and attachment
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: [process.env.RECIPIENT_EMAIL, 'secondRecipient@example.com'],
            subject: `New message from ${name} with subject ${subject}`,
            text: `New message \n\nSubject: ${subject}\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n\n${message}`,
            html: emailHtml,
            attachments: attachmentData ? [attachmentData] : []
        };

        // store send mail response
        const info = transporter.sendMail(mailOptions);

        // provide console feedback and return a positive response to the client
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        // provide error information in case there is any and send corresponding response
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

// bind and listen for connections on the specified host and port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});