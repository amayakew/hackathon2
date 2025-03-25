import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.BREVO_API;
const SENDER = process.env.BREVO_SENDER;

export const sendMail = async (to,title,content) => {
    const sendEmailUrl = 'https://api.brevo.com/v3/smtp/email';

    try {
        const response = await fetch(sendEmailUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
            },
            body: JSON.stringify({
                sender: { email: SENDER }, 
                to: [{ email: to }], 
                subject: title,
                textContent: content,
            }),
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log('Success sending mail')
            console.log(responseData);
            return true;
        } else {
            console.log(`Failed sending email`);
            console.log(responseData);
            return false;
        }
    } catch (error) {
        console.log(`Failed sending email: ${error}`);
        return false;
    };
};