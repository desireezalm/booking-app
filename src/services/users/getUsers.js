import { PrismaClient } from "@prisma/client";
import replaceArray from "../../utils/replaceArray.js";

const getUsers = async () => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  const publicUserData = replaceArray(users, "password");

  return publicUserData;
};

export default getUsers;
