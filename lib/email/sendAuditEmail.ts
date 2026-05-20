import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

interface Props{
  to:string;
  auditId:string;
}

export async function sendAuditEmail({
  to,
  auditId,
}:Props){

  try{

    await resend.emails.send({
      from:"onboarding@resend.dev",

      to,

      subject:
        "Your AI stack recommendations changed",

      html:`
        <div style="font-family:sans-serif">

          <h2>
            Your AI stack recommendations changed
          </h2>

          <p>
            We detected pricing or optimization
            changes in your AI stack audit.
          </p>

          <a
            href="http://localhost:3000/audit/${auditId}/compare"
          >
            View comparison
          </a>

        </div>
      `,
    });

    return true;

  } catch(err){

    console.error(
      "EMAIL_ERROR",
      err
    );

    return false;
  }
}