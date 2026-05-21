interface Props{

  to:string;

  audits:{
    auditId:string;
    email:string;
  }[];
}

export async function sendAuditEmail({

  to,

  audits,

}:Props){

  try{

    const auditLinks =
      audits.map(
        (audit)=>
`
<li>
  <a href="https://ai-audit-kappa.vercel.app/audit/${audit.auditId}/compare">
    View audit ${audit.auditId}
  </a>
</li>
`
      ).join("");

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
We detected pricing changes affecting your saved AI stack audits.
</p>

<div style="
margin-top:20px;
margin-bottom:20px;
padding:16px;
background:#f9fafb;
border-radius:10px;
">

<ul style="
padding-left:20px;
line-height:2;
">
${auditLinks}
</ul>

</div>

<a
href="https://ai-audit-kappa.vercel.app"
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
Open StackAudit
</a>

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