const express = require("express");
const bodyParser = require("body-parser");
const statueCode = require("http-status-codes");
const cors = require("cors");
const fs = require("fs");
const queryString = require("querystring");
const { google } = require("googleapis");
const path = require("path");
const OAuth2 = google.auth.OAuth2;

// const TOKEN_DIR = path.resolve("tokenDir");
// const TOKEN_PATH = path.resolve(`${TOKEN_DIR}/tokenpath.json`);
const port = 8000;
const app = express();

// var SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];

// const readFile = (filePath) => {
//   return new Promise((resolve, reject) =>
//     fs.readFile(filePath, (err, content) => {
//       if (err) return reject(err);
//       resolve(JSON.parse(content.toString()));
//     })
//   );
// };
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("public"));
app.set("json spaces", 4);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (_, res) =>
  res.status(200).json({
    status: "running",
    data: "Cost and benefits script running service",
  })
);

// const responsify = (res, data, success, code) => {
//   return res.status(code).json({ success, data });
// };
// const storeToken = (token) => {
//   try {
//     fs.mkdirSync(TOKEN_DIR);
//   } catch (err) {
//     if (err.code !== "EEXIST") {
//       throw err;
//     }
//   }
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//     if (err) throw err;
//     console.log(`token stored to ${TOKEN_PATH}`);
//   });
// };
// app.get("/authorize", async (req, res) => {
//   const credential = await readFile("client_secret.json");
//   const { clientSecret, clientId } = credential.installed;
//   const redirectUrl = credential.installed.redirectUrl[0];
//   const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) {
//       const authUrl = oauth2Client.generateAuthUrl({
//         access_type: "offline",
//         scope: SCOPES,
//         state: JSON.stringify({ clientId, redirectUrl, clientSecret }),
//       });
//       //   const query = queryString.stringify({ clientId, clientSecret });
//       res.redirect(authUrl);
//     } else {
//       res.status(200).json(JSON.parse(token.toString()));
//     }
//   });
// });
// const getToken = (oauth2Client, code) => {
//   return new Promise((resolve, reject) => {
//     oauth2Client.getToken(code, (err, token) => {
//       if (err) return reject(err);
//       resolve(token);
//     });
//   });
// };
// app.get("/redirect", async (req, res) => {
//   try {
//     const { state, code } = req.query;
//     const { clientSecret, clientId, redirectUrl } = JSON.parse(state);
//     const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
//     const token = await getToken(oauth2Client, code);
//     console.log(token);
//     storeToken(token);
//     res.redirect("/authorize");
//   } catch (error) {
//     console.log(error);
//     return responsify(res, error, false, 500);
//   }
// });

// app.get("/get_channels", async (req, res) => {
//   const token = await readFile(TOKEN_PATH);
//   if (!token) {
//     res
//       .status(statueCode.UNAUTHORIZED)
//       .json({ success: false, data: "unauthorized" });
//   } else {
//     const credential = await readFile("client_secret.json");
//     const { clientSecret, clientId } = credential.installed;
//     const redirectUrl = credential.installed.redirectUrl[0];
//     const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
//     oauth2Client.credentials = token;

//     const service = google.youtube("v3");
//     service.channels.list(
//       {
//         oauth2Client,
//         part: "snippet,contentDetails,statistics",
//         forUsername: "GoogleDevelopers",
//         oauth_token: oauth2Client.credentials.access_token,
//       },
//       (err, response) => {
//         if (err) {
//           console.log(err);
//           return res.status(statueCode.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             data: "The API returned an error: " + err,
//           });
//         }
//         var channels = response.data.items;
//         res.status(statueCode.OK).json({ success: true, data: channels });
//       }
//     );
//   }
// });

app.listen(port, () => console.log(`app is running on port ${port} `));
