import prisma from "@/lib/prisma";
import * as v4 from "uuid";


export async function getVerificationToken(email: string) {
  try {
    const t = await prisma.verificationToken.findFirst({
      where: {
        identifier : email,
        
      },
    });
    return t;
  } catch (error) {
    console.log("Error in getVerificationToken", error);
    return null;
  }
}
export async function getVerificationTokenByToken(token: string) {
  try {
    const t = await prisma.verificationToken.findFirst({
      where: {
       token
      },
    });
    return t;
  } catch (error) {
    console.log("Error in getVerificationToken", error);
    return null;
  }
}

export async function createVerificationToken(email: string) {
  try {
    const exists = await getVerificationToken(email);
    if (exists) {
      await prisma.verificationToken.delete({
        where: {
        identifier_token : {
          identifier : exists.identifier,
          token : exists.token
        }
        },
      });
    }
//    creating a new token
    const token = await prisma.verificationToken.create({
      data: {
        identifier : email,
        token: v4.v4(),
        expires: new Date(Date.now() + 1000 * 60 * 60),
      },
    });
    return token;
  } catch (error) {
    console.log("Error in getVerificationToken", error);
    return null;
  }
}
