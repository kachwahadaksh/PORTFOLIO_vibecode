const sendgridKey = process.env.SENDGRID_API_KEY;
const toEmail = process.env.TO_EMAIL; // recipient email
const fromEmail = process.env.FROM_EMAIL || process.env.TO_EMAIL; // sender

const sendWithSendGrid = async ({ name, email, message }) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(sendgridKey);
  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: `Portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><div>${message.replace(/\n/g, '<br>')}</div>`,
  };
  await sgMail.send(msg);
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (!sendgridKey || !toEmail) {
    // No SendGrid configured — return success with warning so frontend behaves
    console.warn('SendGrid not configured. Set SENDGRID_API_KEY and TO_EMAIL in environment.');
    return res.status(501).json({ error: 'Email not configured on server (SET SENDGRID_API_KEY and TO_EMAIL).' });
  }

  try {
    await sendWithSendGrid({ name, email, message });
    return res.json({ ok: true });
  } catch (err) {
    console.error('SendGrid error', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};
