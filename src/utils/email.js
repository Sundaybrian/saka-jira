require("dotenv").config();

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

module.exports = sendEmail;

// These id's and secrets should come from .env file.
const CLIENT_ID = "YOUR CLIENT ID";
const CLIENT_SECRET = "YOUR CLIENT SECRET";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "YOUR REFRESH TOKEN";

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail({ to, subject, html, from = "Uraditech@gmail.com" }) {
    try {
        const msg = {
            to,
            subject,
            html,
            from,
        };

        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "yours authorised email address",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        await transport.sendMail(msg);
    } catch (error) {
        throw error;
    }
}
