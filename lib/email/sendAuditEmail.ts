interface Props{
  to:string;
  auditId:string;
}

export async function sendAuditEmail({
  to,
  auditId,
}:Props){

  try{

    const response =
      await fetch(
        "https://api.brevo.com/v3/smtp/email",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json",

            "api-key":
              process.env.BREVO_API_KEY || "",
          },

          body:JSON.stringify({

            sender:{
              name:"StackAudit",

              email:
                "rajkumarnathsharma2005@gmail.com",
            },

            to:[
              {
                email:to,
              },
            ],

            subject:
              "Your AI stack recommendations changed",

            htmlContent:`
              <div style="font-family:sans-serif">
                <h2>
                  Your AI stack recommendations changed
                </h2>

                <p>
                  We detected pricing changes in your audit.
                </p>

                <a href="https://ai-audit-kappa.vercel.app/audit/${auditId}/compare">
                  View comparison
                </a>
              </div>
            `,
          }),
        }
      );

    const data =
      await response.json();

    console.log(
      "BREVO_RESPONSE",
      data
    );

    return true;

  }catch(err){

    console.error(
      "EMAIL_ERROR",
      err
    );

    return false;
  }
}