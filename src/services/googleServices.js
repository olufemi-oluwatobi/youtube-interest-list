import { google } from "googleapis";
import qs from "querystring";
const OAuth2 = google.auth.OAuth2;
const SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/contacts.readonly",
];

const googleConfig = {
  clientId: process.env.CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: process.env.CLIENT_SECRET,
  apiKey: process.env.API_KEY,
  redirect: [
    "http://localhost:8000/user/login",
    "http://localhost:8000/user/register",
  ], // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */

const createConnection = (type) => {
  const redirectType = type === "register" ? 1 : 0;
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect[redirectType]
  );
};

const authorize = (auth) => {
  const authUrl = auth.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return authUrl;
};

const getGooglePlusApi = (auth) => {
  const service = google.oauth2({ version: "v2", auth });
  return service.userinfo.v2.me.get();
};

export const performYouTubeSearch = async (query) => {
  console.log("query", query);
  const youtube = google.youtube({ version: "v3", auth: googleConfig.apiKey });
  const request = await youtube.search.list({
    part: "snippet",
    type: "video",
    q: query,
    maxResults: 10,
    order: "viewCount",
    safeSearch: "none",
    videoEmbeddable: true,
  });
  if (request) {
    return request.data.items.map((item) => {
      return {
        _id: item.id.videoId,
        title: item.snippet.title,
        link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      };
    });
  }
  return [];
};
export const urlGoogle = (type) => {
  const authCredentials = createConnection(type);
  const url = authorize(authCredentials);
  return url;
};

export const getGoogleAccountFromCode = async (code, type) => {
  const auth = createConnection(type);
  const data = await auth.getToken(code);
  const tokens = data.tokens;

  auth.setCredentials(tokens);
  let me = await getGooglePlusApi(auth);
  me = me.data;
  return {
    googleId: me.id,
    email: me.email,
    name: me.name,
    tokens,
  };
};

export const verifyToken = async (token) => {
  const auth = createConnection();
  try {
    const ticket = await auth.verifyIdToken({
      idToken: token,
      audience: googleConfig.clientId,
    });
    if (ticket) {
      const payload = ticket.getPayload();
      return payload;
    } else {
      return null;
    }
  } catch (_) {
    return null;
  }
};
