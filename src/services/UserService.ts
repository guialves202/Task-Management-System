import UserRepository from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';

type dataType = {
  name: string;
  email: string;
  password: string;
};

class UserService {
  login() {
    return;
  }

  async register(data: dataType) {
    try {
      if (!data.name || !data.email || !data.password) {
        throw new Error('Invalid value');
      }

      for (const key in data) {
        if (data[key as keyof dataType].length < 3 || data[key as keyof dataType].length > 50) {
          throw new Error('This field must contain between 3 and 50 characters');
        }
      }
      data.password = bcrypt.hashSync(data.password, 10);
      return await UserRepository.create(data);
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();
