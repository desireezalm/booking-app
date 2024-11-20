import { PrismaClient } from "@prisma/client";

const createHost = async (data) => {
  const prisma = new PrismaClient();
  const newHost = {
    username: data.username,
    password: data.password,
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    profilePicture: data.profilePicture,
    aboutMe: data.aboutMe,
  };

  const host = await prisma.host.create({
    data: newHost,
  });

  return host;
};

export default createHost;
