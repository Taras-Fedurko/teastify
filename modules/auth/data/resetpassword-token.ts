import prisma from "@/lib/prisma";
import * as v4 from "uuid";

class ResetPasswordTokenRepository {
  private async  getResetPasswordToken(email: string) {
    try {
      const t = await prisma.resetPasswordToken.findFirst({
        where: {
          email,
        },
      });
      return t;
    } catch (error) {
      console.log("Error in getResetPasswordToken", error);
      return null;
    }
  }
  async getResetPasswordTokenByToken(token: string) {
    try {
      const t = await prisma.resetPasswordToken.findUnique({
        where: {
          token,
        },
      });
      return t;
    } catch (error) {
      console.log("Error in getResetPasswordToken", error);
      return null;
    }
  }
  async  createResetPasswordToken(email: string) {
    try {
      const exists = await this.getResetPasswordToken(email);
      if (exists) {
        await prisma.resetPasswordToken.delete({
          where: {
            id: exists.id,
          },
        });
      }
      //    creating a new token
      const token = await prisma.resetPasswordToken.create({
        data: {
          email,
          token: v4.v4(),
          expires: new Date(Date.now() + 1000 * 60 * 60),
        },
      });
      return token;
    } catch (error) {
      console.log("Error in getResetPasswordToken", error);
      return null;
    }
  }

}
const ResetTokenRepo = new ResetPasswordTokenRepository()
export default ResetTokenRepo