const BRAND = {

    name:       process.env.APP_NAME  || 'SCORECARD',
    url:        process.env.APP_URL,
    primary:    '#1a365d',
    accent:     '#008751',
    supportEmail: process.env.SUPPORT_EMAIL || 'support@sc.ng',
};


const layout = (innerHtml, {preheader = ''} = {}) => `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${BRAND.name}</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f9; font-family:Arial,Helvetica,sans-serif;">
<!-- Preheader: the grey preview text in th inbox list, hidden in the body -->
<div style="display:none; max-height:0; overflow:hidden; opacity:0;">${preheader}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;">
    <tr>
        <td align="center" style="padding:24px 12;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
               style="max-width:600px; width:100%; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
               <!-- Header band -->
               <tr>
                    <td style="background:${BRAND.primary}; padding:0;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tr><td style="height:6px; background:${BRAND.accent};"></td></tr>

                          <tr>
                           <td style="padding:22px 32px;">
                              <span style="color:#ffffff; font-size:20px; font-weight:bold; letter-spacing:0.3px;">
                                ${BRAND.name}
                              </span>
                           </td>
                          </tr>
                        </table>
                    </td>
               </tr>

        </table>
        <p>
            You are receive this you registered on ${BRAND.name}.
        </p>

        </td>
    </tr>
</table>
    
</body>
</html>
`