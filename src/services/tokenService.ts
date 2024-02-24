import { EmailTemplate } from "@/components/email/emailTemplate";
import prisma from "@/libs/prisma";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { Resend } from "resend/build/src/resend";

class TokenService {
    resend = new Resend(process.env.API_KEY_RESEND);

    async crearToken(user:User){
      const token = await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        },
      });
      return token
    }

    async enviarEmail(email:string, name:string, token:string){
       await this.resend.emails.send({
        // from: "email@mail.spacejelly.dev",
        from: 'onboarding@resend.dev',
        to: email,
        subject: "Recipify",
        react: EmailTemplate({ firstName: name, token: token }),
        text: "aguante robocop :)",
      });
    };
}

export default TokenService;