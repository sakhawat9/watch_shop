import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  const { name, email, message, phone } = req.body || {};
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email and message are required" });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      // Gmail rejects arbitrary `from` addresses; send as the authenticated
      // account and route replies back to the visitor instead.
      from: process.env.USER_EMAIL,
      replyTo: email,
      to: process.env.CONTACT_RECIPIENT_EMAIL || process.env.USER_EMAIL,
      subject: `Contact form submission from ${name}`,
      html: `<p>You have a new contact form submission</p><br />
      <p><strong>Name: </strong>${name}</p><br />
      <p><strong>Email: </strong>${email}</p><br />
      <p><strong>Phone: </strong>${phone ?? ""}</p><br />
      <p><strong>Message: </strong>${message}</p><br />
      `,
    });
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    // Surface the failure instead of reporting success to the client.
    console.error("Contact form mail failed:", err.message);
    return res.status(502).json({ message: "Unable to send message" });
  }
}
