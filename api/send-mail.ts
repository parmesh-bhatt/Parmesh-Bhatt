import type { VercelRequest, VercelResponse } from "@vercel/node"
import nodemailer from "nodemailer"

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: false, // Use false for port 587, or true for port 465
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  )

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, name, subject, message } = req.body

  if (!email || !name || !subject || !message) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  try {
    const isVerified = await transporter.verify()
    if (!isVerified) {
      throw new Error("Failed to connect to mail server")
    }

    const info = await transporter.sendMail({
      from: email,
      to: SITE_MAIL_RECIEVER,
      subject: `[Portfolio Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Portfolio Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    })

    console.log("Message Sent", info.messageId)
    return res.status(200).json({ success: true, messageId: info.messageId })
  } catch (error: any) {
    console.error("Mail sending failed:", error)
    return res.status(500).json({ error: error.message || "Failed to send email" })
  }
}
