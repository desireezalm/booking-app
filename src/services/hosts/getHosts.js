import { PrismaClient } from "@prisma/client";
import replaceArray from "../../utils/replaceArray.js";

const getHosts = async () => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany();

  const publicHostData = replaceArray(hosts, "password");

  return publicHostData;
};

export default getHosts;
