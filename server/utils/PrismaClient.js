import { PrismaClient } from "@prisma/client";
let prismaInstance;

function getPrismainstance() {
  if (!prismaInstance) prismaInstance = newPrismaClient();
  return prismaInstance;
}


export default getPrismainstance