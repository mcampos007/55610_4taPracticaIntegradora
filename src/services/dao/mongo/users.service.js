import userModel from '../../db/models/users.model.js';
import mongoose, { Mongoose, Types } from 'mongoose';

export default class UserDao {
  constructor() {
    // console.log("Calling users model using a service.");
  }
  getAll = async () => {
    let users = await userModel.find();
    return users.map((user) => user.toObject());
  };
  save = async (user) => {
    let result = await userModel.create(user);
    return result;
  };
  findByUsername = async (username) => {
    const result = await userModel.findOne({ email: username });
    return result;
  };

  findById = async (id) => {
    // console.log(81, id);
    let result = await userModel.findById(id);
    return result;
  };

  update = async (filter, value) => {
    // console.log(92, filter);
    // console.log(93, value);

    let result = await userModel.updateOne(filter, value);
    // console.log(result)
    return result;
  };
  currentUser = async (id) => {
    //console.log("current user falta desarrollar");
    let result = this.findById(id);
    return result;
  };

  premiumUserChange = async (id) => {
    //console.log("current user falta desarrollar");
    let result = this.findById(id);
    return result;
  };

  admintUser = async (id) => {
    //console.log("current user falta desarrollar");
    let result = this.findById(id);
    return result;
  };

  uploadDocuments = async (id, files) => {
    console.log(2, 'Lllegue al servicio');
    console.log(id);
    return 'volvi';
  };
}

//export default new UserDao();
