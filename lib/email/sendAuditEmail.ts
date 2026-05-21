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

            "Content-Type":
              "application/json",

            "api-key":
              process.env
                .BREVO_API_KEY || "",
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

<div style="
font-family:Arial;
max-width:600px;
margin:auto;
padding:24px;
background:#ffffff;
border:1px solid #e5e7eb;
border-radius:12px;
">

<h1 style="
font-size:24px;
margin-bottom:12px;
color:#111827;
">
StackAudit Alert
</h1>

<p style="
font-size:16px;
color:#374151;
line-height:1.6;
">
We detected pricing changes affecting your saved AI stack audit.
</p>

<div style="
margin-top:20px;
margin-bottom:20px;
padding:16px;
background:#f9fafb;
border-radius:10px;
">

<a
href="https://ai-audit-kappa.vercel.app/audit/${auditId}/compare"
style="
display:inline-block;
padding:12px 20px;
background:#111827;
color:white;
text-decoration:none;
border-radius:8px;
font-weight:600;
"
>
View Updated Audit
</a>

</div>

<p style="
margin-top:24px;
font-size:13px;
color:#6b7280;
">
Automated AI spend monitoring powered by StackAudit
</p>

</div>
`
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