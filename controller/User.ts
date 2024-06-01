
import { v4 } from 'uuid';
import { UserModel } from '../models/User';
import { APIContextType, User } from '../types';
import { tokenVerify } from '../helpers/tokenVerify';
8
export const createUser = async ({ request, response, em }: APIContextType) => {
      try {
            const { firstName, lastName, username, email, password, dob } = request.body as User;

            const userExists = await em.fork().findOne(UserModel, {
                  $or: [
                        { username: username },
                        { email: email }
                  ],
            });


            if (userExists) {
                  //        logger.info(`User Already Exists - ${userExists}`)
                  return {
                        success: false,
                        message: 'User Already Exists',
                        extras: null,
                        errorType: null
                  }
            };

            const new_user = await new UserModel({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: password,
                  username: username,
                  dob: dob,
                  image: ''
            });

            const token = await new_user.getToken();
            await new_user.saveUser(em);
            await new_user.sendMail('OTP');

            //  logger.info(`User Created - ${new_user.id}`);

            const context = {
                  success: true,
                  message: 'User Created Successfully',
                  extras: new_user,
                  token: token,
                  errorType: null
            };

            return response.status(200).send(context);
      }
      catch (error) {
            console.error('Error creating user:', error);

            const context = {
                  message: 'Error creating user',
                  error: error,
                  status: 500
            };

            return response.status(500).send(context);
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

export const verifyUser = async ({ request, response, em }: APIContextType) => {
      try {
            const { OTP } = request.body;

            const _token = request.headers.authorization?.split(" ")[1] || "";
            const user_id = await tokenVerify(_token);

            if (!user_id) {
                  //   logger.info(`User Not Found - ${user_id}`);
                  return {
                        success: false,
                        message: 'User Not Found',
                        extras: null,
                        errorType: null
                  };
            };

            const user = await em.fork().findOne(UserModel, { id: user_id });

            if (!user) {
                  //    logger.info(`User Not Found - ${user_id}`);
                  return {
                        success: false,
                        message: 'User Not Found',
                        extras: null,
                        errorType: null
                  };
            };

            if (user.otp !== OTP) {
                  // logger.info(`OTP Not Match - ${OTP}`)
                  return {
                        success: false,
                        message: 'OTP Not Match',
                        extras: null,
                        errorType: null
                  };
            };

            if (user.isVerified) {
                  // logger.info(`User Already Verified - ${user.user_id}`)
                  return {
                        success: true,
                        message: 'User Already Verified',
                        extras: user,
                        token: _token,
                        errorType: null
                  };
            };

            await user.verifyUser();
            user.otp = '';
            await user.saveUser(em);

            //  await user.sendMail("WELCOME");
            // logger.info(`User Verified - ${user.user_id}`);

            return {
                  success: true,
                  message: 'User Verified Successfully',
                  token: _token,
                  extras: user,
                  errorType: null,
            };
      }
      catch (error) {
            // logger.error(`User Verification Failed - ${error}`)
            return {
                  success: false,
                  message: 'User Verification Failed',
                  extras: null,
                  errorType: error as string
            };
      };
};