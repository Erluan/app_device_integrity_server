const { google } = require("googleapis");

exports.configureGoogleAuth = async() => {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.CRED_JSON_PATH, // Replace with your json Service Key Path
        scopes: ['https://www.googleapis.com/auth/playintegrity'],
    });
   const authClient = await auth.getClient();
   google.options({ auth: authClient });
};