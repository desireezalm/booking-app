import { PrismaClient } from "@prisma/client";
import replaceArray from "../../utils/replaceArray.js";

const getHosts = async (name) => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany();
  let publicProfiles = replaceArray(hosts, "password");

  if (name) {
    publicProfiles = publicProfiles.filter((profile) =>
      profile.name.includes(name)
    );
  }

  return publicProfiles;
};

export default getHosts;
