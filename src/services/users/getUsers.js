import { PrismaClient } from "@prisma/client";
import replaceArray from "../../utils/replaceArray.js";

const getUsers = async (username, email) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    include: {
      bookings: true,
      reviews: true,
    },
  });
  let publicProfiles = replaceArray(users, "password");

  if (username) {
    publicProfiles = publicProfiles.filter((profile) =>
      profile.username.includes(username)
    );
  }

  if (email) {
    publicProfiles = publicProfiles.filter((profile) =>
      profile.email.includes(email)
    );
  }

  return publicProfiles;
};

export default getUsers;
