import nodemailer from "nodemailer";

async function test() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER || 'mtcrunconstruction@gmail.com',
      pass: process.env.SMTP_PASS,
    },
  });
  
  try {
    const info = await transporter.sendMail({
      from: `"Test Agent AI" <${process.env.SMTP_USER || 'mtcrunconstruction@gmail.com'}>`,
      to: 'mtcrunconstruction@gmail.com',
      subject: `Test 3`,
      text: `Test de mail via code`,
    });
    console.log("Success:", info.messageId);
  } catch (err: any) {
    console.error("Erreur:", err);
  }
}
test();
