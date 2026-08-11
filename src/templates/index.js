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
    }),
     registrationInitiated: (d) => ({
    subject: `Welcome — your ${BRAND.name} registration has started`,
    html: layout(
      heading('Registration started') +
      paragraph(`Dear ${fullName(d.candidate)},`) +
      paragraph(
        'Thank you for beginning your registration. Your application has been ' +
        'created and saved. You can now continue through the remaining steps.'
      ) +
      detailBox([
        ['Profile Code', d.candidate.profileCode || 'Pending'],
        ['Email',        d.candidate.email],
        ['Exam Year',    d.candidate.examYear],
        ['Status',       'Registration in progress'],
      ]) +
      infoNote(
        'Keep your Profile Code safe — you will use it to resume your ' +
        'registration and to access your account.'
      ) +
      paragraph('The next steps are: academic details, subject selection, exam centre, and passport photo.') +
      button('Continue Registration', portal('/register')),
      { preheader: 'Your registration has started. Continue where you left off.' }
    ),
    text:
`Dear ${fullName(d.candidate)},

Your ${BRAND.name} registration has started.

Profile Code: ${d.candidate.profileCode || 'Pending'}
Email: ${d.candidate.email}
Exam Year: ${d.candidate.examYear}

Keep your Profile Code safe. Continue at ${portal('/register')}`,
  }),


  //Academic Update////

  academicUpdated: (d) => ({
    subject: `Academic details saved — ${BRAND.name}`,
    html: layout(
      heading('Academic details saved') +
      paragraph(`Dear ${fullName(d.candidate)},`) +
      paragraph('Your subject combination and institution choices have been saved successfully.') +
      detailBox([
        ['Subjects',   (d.candidate.subjects || []).join(', ') || '—'],
        ['1st Choice', d.candidate.institutionChoices?.[0]?.institutionName || '—'],
        ['2nd Choice', d.candidate.institutionChoices?.[1]?.institutionName || 'Not selected'],
      ]) +
      infoNote('Next step: select your preferred examination centre.') +
      button('Continue Registration', portal('/register')),
      { preheader: 'Your academic details and subject choices are saved.' }
    ),
    text:
`Dear ${fullName(d.candidate)},

Your academic details have been saved.
Subjects: ${(d.candidate.subjects || []).join(', ')}

Continue at ${portal('/register')}`,
  }),


  //Center Ass///
  centerAssigned: (d) => ({
    subject: `Exam centre confirmed — ${BRAND.name}`,
    html: layout(
      heading('Examination centre confirmed') +
      paragraph(`Dear ${fullName(d.candidate)},`) +
      paragraph('Your examination centre has been assigned.') +
      detailBox([
        ['Centre',      d.candidate.examCenterName || '—'],
        ['Centre Code', d.candidate.examCenterCode || '—'],
      ]) +
      infoNote('One step remains: upload your passport photograph to complete registration.') +
      button('Continue Registration', portal('/register')),
      { preheader: 'Your exam centre is confirmed.' }
    ),
    text:
`Dear ${fullName(d.candidate)},

Your exam centre has been confirmed:
${d.candidate.examCenterName} (${d.candidate.examCenterCode})

Continue at ${portal('/register')}`,
  }),
}