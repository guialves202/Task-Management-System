import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

type registerType = {
  name: string;
  email: string;
  password: string;
};

type loginType = {
  email: string;
  password: string;
};

class UserService {
  async login(data: loginType) {
    try {
      if (!data.email || !data.password) {
        throw new Error('Invalid value');
      }

      const user = await UserRepository.findByEmail(data.email);
      if (!user) throw new Error('Invalid e-mail');

      if (!bcrypt.compareSync(data.password, user.password)) throw new Error('Password is incorrect');

      if (bcrypt.compareSync(data.password, user.password)) {
        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  async register(data: registerType) {
    try {
      if (!data.name || !data.email || !data.password) {
        throw new Error('Invalid value');
      }

      for (const key in data) {
        if (data[key as keyof registerType].length < 3 || data[key as keyof registerType].length > 50) {
          throw new Error('This field must contain between 3 and 50 characters');
        }
      }

      const user = await UserRepository.findByEmail(data.email);
      if (user) throw new Error('This e-mail is already been used');
      data.password = bcrypt.hashSync(data.password, 10);
      return await UserRepository.create(data);
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();
