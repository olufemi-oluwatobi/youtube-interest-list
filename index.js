const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const path = require("path");
const OAuth2 = google.auth.OAuth2;

const TOKEN_DIR = path.resolve("tokenDir");
const TOKEN_PATH = path.resolve(`${TOKEN_DIR}/tokenpath.json`);

var SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];

fs.readFile("client_secret.json", (err, content) => {
  if (err) throw new Error(err);
  authorize(JSON.parse(content), getChannel);
});

const authorize = (credential, callback) => {
  const { clientSecret, clientId } = credential.installed;
  const redirectUrl = credential.installed.redirectUrl[0];
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oauth2Client, callback);
    oauth2Client.credentials = JSON.parse(token.toString("utf8"));
    callback(oauth2Client);
  });
};

const getNewToken = (oauth2Client, callback) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url: ", authUrl);
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  r1.question("Enter the code from the page here", (code) => {
    r1.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) return console.log(err);
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
};

const storeToken = (token) => {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log(`token stored to ${TOKEN_PATH}`);
  });
};

const getChannel = (auth) => {
  const service = google.youtube("v3");
  service.channels.list(
    {
      auth: auth,
      part: "snippet,contentDetails,statistics",
      forUsername: "GoogleDevelopers",
    },
    (err, response) => {
      if (err) {
        console.log("The API returned an error: " + err);
        return;
      }
      var channels = response.data.items;
      if (channels.length == 0) {
        console.log("No channel found.");
      } else {
        console.log(
          "This channel's ID is %s. Its title is '%s', and " +
            "it has %s views.",
          channels[0].id,
          channels[0].snippet.title,
          channels[0].statistics.viewCount
        );
      }
    }
  );
};
