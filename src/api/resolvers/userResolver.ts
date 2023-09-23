// TODO: Add resolvers for user
// 1. Queries
// 1.1. users
// 1.2. userById
// 2. Mutations
// 2.1. createUser
// 2.2. updateUser
// 2.3. deleteUser

import userModel from '../models/userModel';
import {User} from '../../interfaces/User';

export default {
  Query: {
    users: async () => {
      return await userModel.find();
    },
    userById: async (_: undefined, args: {id: string}) => {
      return await userModel.findById(args.id);
    },
  },
  Mutation: {
    createUser: async (_: undefined, args: User) => {
      const user = new userModel(args);
      await user.save();
      return user;
    },
    updateUser: async (_: undefined, args: User) => {
      const updatedUser = await userModel.findByIdAndUpdate(
        args.id,
        {...args},
        {
          new: true,
        }
      );
      return updatedUser;
    },
    deleteUser: async (_: undefined, args: {id: string}) => {
      const deletedUser = await userModel.findByIdAndRemove(args.id);
      return deletedUser;
    },
  },
};