import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dar2ness009@gmail.com", // Your Gmail address
    pass: "jyfulbugyeujbzzx", // Your app password
  },
})

function sendMail(to, sub, msg) {
  console.log("Attempting to send email to:", to)
  transporter.sendMail(
    {
      from: "dar2ness009@gmail.com", // Sender address
      to: to,
      subject: sub,
      html: msg,
    },
    (error, info) => {
      if (error) {
        console.error("Email error:", error)
      } else {
        console.log("Email sent:", info.response)
      }
    },
  )
}

// Comment out this test email to avoid unnecessary emails during startup
// sendMail("dar2ness009@gmail.com", "Haan bhai", "Kiase ho")

export { sendMail, transporter }
