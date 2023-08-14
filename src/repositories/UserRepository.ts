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

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) return user.id;
  }
}

export default new UserRepository();
