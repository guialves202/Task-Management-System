import prisma from '../database/prisma';

type dataType = {
  name: string;
  email: string;
  password: string;
};

class UserRepository {
  async create(data: dataType) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    return user;
  }

  async findById() {
    return;
  }
}

export default new UserRepository();
