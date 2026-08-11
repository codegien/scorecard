const { layout, heading, paragraph, button, detailBox, infoNote, BRAND } = require('./layout');


const fullName = (c) => 
    `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'Candidate';

const portal = (path = '') => `${BRAND.url}${path}`;

const TEMPLATE = {
    loginAlert: (d) => ({
        subject: `New sign-in to your ${BRAND.name} account`,
        html: layout(
            heading('New sign-in detected') +
            paragraph(`Hello ${d.fullName || 'there'},`) +
            paragraph('Your account was just signed in to. If this was you, no action is needed.') +
            detailBox([
                ['Time', d.time],
                ['Device', d.device || 'Unknown device'],
                ['IP address', d.ipAddress || 'Unknown'],
            ]) + 
            infoNote(
                'If you did not sign in, your password may be compromised. ' +
                `Change it immediately and contact <a href="mailto:${BRAND.supportEmail}" style="color:${BRAND.accent};">${BRAND.supportEmail}</a>.`,
                '#c53030'
            ),
            { preheader: 'A new sign-in to your account was detected.'}
        ),
        text:
        `New sign-in to your ${BRAND.name} account.
        Time: ${d.time}
        Device: ${d.device || 'Unknown'}
        IP: ${d.ipAddress || 'Unknown'}
        
        If this wasn't you, change your password immediately and contact ${BRAND.supportEmail}.`,
    }),

    passwordChanged: (d) => ({
        subject: `Your ${BRAND.name} password was change`,
        html: layout(
            heading('Password changed') +
            paragraph(`Hello ${d.fullName || 'there'},`) +
            paragraph('This confirms that your account password was just changed.') +
            detailBox([['Time', d.time]]) +
            infoNote(
        `If you did not make this change, contact us at ` +
        `<a href="mailto:${BRAND.supportEmail}" style="color:${BRAND.accent};">${BRAND.supportEmail}</a> right away.`,
        '#c53030'
      ),
      { preheader: 'Your password was changed.' }
        ),
          text:
        `Your ${BRAND.name} password was changed at ${d.time}.
        If this wasn't you, contact ${BRAND.supportEmail} immediately.`,
    })
}