require("dotenv").config();

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

module.exports = sendEmail;

// These id's and secrets should come from .env file.
const CLIENT_ID =
    "926833439120-lvbklo7jbi8t9kaprlsg9hrfdfrbp7g4.apps.googleusercontent.com";
const CLIENT_SECRET = "usaGOBY_1VxHsMX9FkcRAo6s";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
    "1//04TiKIeba50w2CgYIARAAGAQSNwF-L9IrjJjgWmksc4p4S5HHiCeWqR6kL_rHtQNdEBk6CV5cPiftCmnG5N9cSljSVeNwfavjykU";

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    -REDIRECT_URI
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
                user: "uraditech@gmail.com",
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
