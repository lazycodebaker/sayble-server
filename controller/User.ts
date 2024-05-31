
import { v4 } from 'uuid';
import { UserModel } from '../models/User';
import { APIContextType, User } from '../types';
8
export const createUser = async ({ request, response, em }: APIContextType) => {
      try {
            const { firstName, lastName, username, email, password } = request.body as User;

            const user: User = {
                  id: v4(),
                  firstName: firstName,
                  lastName: lastName,
                  username: username,
                  email: email,
                  password: password,
                  createdAt: new Date(),
                  updatedAt: new Date()
            };

            let userExists;

            userExists = await em.findOne(UserModel, { email: user.email });

            if (userExists) {
                  return response.status(400).send({ message: 'Email already exists' });
            };

            userExists = await em.findOne(UserModel, { username: user.username });

            if (userExists) {
                  return response.status(400).send({ message: 'Username already exists' });
            };

            const newUser = new UserModel(user);
            await em.persistAndFlush(newUser);

            const context = {
                  message: 'User created',
                  user: newUser,
                  status: 'success'
            };

            return response.status(201).send(context);
      }
      catch (error) {
            console.error('Error creating user:', error);

            const context = {
                  message: 'Error creating user',
                  error: error,
                  status: 500
            };

            response.status(500).send(context);
      };
};

export const getUsers = async ({ request, response, em }: APIContextType) => {
      try {
            const users = await em.find(UserModel, {});
            return response.status(200).send(users);
      } catch (error) {
            console.error('Error getting users:', error);

            const context = {
                  message: 'Error getting users',
                  error: error,
                  status: 500
            };
            return response.status(500).send(context);
      }
};

export const getUser = async ({ request, response, em }: APIContextType) => {
      try {
            const { id } = request.params;
            const user = await em.findOne(UserModel, { id: id });
            return response.status(200).send(user);
      } catch (error) {
            console.error('Error getting user:', error);
            const context = {
                  message: 'Error getting user',
                  error: error,
                  status: 500
            };
            return response.status(500).send(context);
      }
};