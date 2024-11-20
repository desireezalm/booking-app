import { PrismaClient } from "@prisma/client";

const createUser = async (data) => {
  const prisma = new PrismaClient();
  const newUser = {
    username: data.username,
    password: data.password,
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    profilePicture: data.profilePicture,
  };

  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
};

export default createUser;
