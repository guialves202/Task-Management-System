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

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}

export default new UserRepository();
