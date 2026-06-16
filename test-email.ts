import nodemailer from "nodemailer";

async function test() {
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Set" : "Not Set");
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER || 'mtcrunconstruction@gmail.com',
      pass: process.env.SMTP_PASS,
    },
  });
  
  try {
    const info = await transporter.sendMail({
      from: `"Test Contact Website" <${process.env.SMTP_USER}>`,
      to: 'mtcrunconstruction@gmail.com',
      subject: `Test - SMTP`,
      text: `Ceci est un test pour voir si l'email s'envoie bien.`,
    });
    console.log("Success:", info.messageId);
  } catch (err: any) {
    console.error("Erreur:", err);
  }
}
test();
