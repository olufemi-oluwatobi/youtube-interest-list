import User from "./model";

export const findUserByGoogleId = (googleId) => {
  return new Promise((resolve, reject) => {
    User.findOne({ googleId }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const findUsers = (conditions) => {
  return new Promise((resolve, reject) => {
    User.find(conditions, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    User.find({ _id: id }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const updateUser = (params, body) => {
  return new Promise((resolve, reject) => {
    User.update(params, body, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const createUser = (body) => {
  return new Promise((resolve, reject) => {
    User.create(body, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
