import AccessToken from "./model";

export const findTokenById = (id) => {
  return new Promise((resolve, reject) => {
    AccessToken.find({ _id: id }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const findTokenByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    AccessToken.find({ user_id: userId }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const createAccessToken = (body) => {
  return new Promise((resolve, reject) => {
    AccessToken.create(body, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
