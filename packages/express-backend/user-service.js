import mongoose from 'mongoose';
import userModel from './user.js';
import 'dotenv/config';

mongoose.set('debug', true);

mongoose.connect(process.env.MONGO_URI).catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else {
    promise = findByNameAndJob(name, job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteById(id) {
  return userModel.findByIdAndDelete(id);
}

function findByNameAndJob(name, job) {
  return userModel.find({
    $and: [{ name: name }, { job: job }],
  });
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteById,
  findByNameAndJob,
};
