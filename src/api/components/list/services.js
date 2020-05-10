import List from "./model";

export const createList = (body) => {
  return new Promise((resolve, reject) => {
    List.create(body, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const findListById = (id) => {
  return new Promise((resolve, reject) => {
    List.find({ _id: id }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const findAllLists = () => {
  return new Promise((resolve, reject) => {
    List.find({}, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
