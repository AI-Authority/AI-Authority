import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create Hostinger SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.MAIL_USER, // info@ai-authority.ai
      pass: process.env.MAIL_PASS, // Hostinger mailbox password
    },
    tls: {
      rejectUnauthorized: false, // For compatibility with some SSL certificates
    },
  });
};

// Helper function to send emails
export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: {
        name: "AI Authority",
        address: process.env.MAIL_USER,
      },
      to: to,
      subject: subject,
      html: html,
    };

    console.log(`📤 Sending email to: ${to}`);
    console.log(`📧 Subject: ${subject}`);
    
    const result = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully to ${to}`);
    console.log(`📨 Message ID: ${result.messageId}`);
    
    return result;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

// Send approval email to user
export const sendApprovalEmail = async (userEmail, userName, membershipType, credentials) => {
  try {
    console.log(`📤 Sending approval email to: ${userEmail}`);

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 10px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              padding: 20px;
              background-color: white;
              border-radius: 0 0 10px 10px;
            }
            .credentials {
              background-color: #f0f0f0;
              padding: 15px;
              border-left: 4px solid #4CAF50;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              padding-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to AI Authority!</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${userName}</strong>,</p>
              
              <p>Congratulations! We are pleased to inform you that your <strong>${membershipType}</strong> membership application has been <strong>approved</strong>.</p>
              
              <p>You can now access your account and enjoy all the benefits of your membership.</p>
              
              <div class="credentials">
                <h3>Your Login Credentials:</h3>
                <p><strong>Email:</strong> ${credentials.email}</p>
                <p><strong>Password:</strong> Use the password you created during registration</p>
              </div>
              
              <p>You can login to your account using the link below:</p>
              
              <a href="${process.env.FRONTEND_URL}/login" class="button">Login to Your Account</a>
              
              <p style="margin-top: 30px;">If you have any questions or need assistance, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br><strong>The AI Authority Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 AI Authority. All rights reserved.</p>
              <p>This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
        </html>
      `;

    const subject = "🎉 Your AI Authority Membership Application has been Approved!";
    
    await sendEmail(userEmail, subject, htmlContent);

    console.log("✅ Approval email sent successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending approval email:");
    console.error("Error:", error);
    return { success: false, error: error.message };
  }
};

// Send rejection email to user
export const sendRejectionEmail = async (userEmail, userName, membershipType, reason = "") => {
  try {
    console.log(`📤 Sending rejection email to: ${userEmail}`);

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 10px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #f44336;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              padding: 20px;
              background-color: white;
              border-radius: 0 0 10px 10px;
            }
            .footer {
              text-align: center;
              padding-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Application Status Update</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${userName}</strong>,</p>
              
              <p>Thank you for your interest in joining AI Authority as a <strong>${membershipType}</strong> member.</p>
              
              <p>After careful review, we regret to inform you that your application could not be approved at this time.</p>
              
              ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
              
              <p>We encourage you to reapply in the future or contact us if you have any questions.</p>
              
              <p>Best regards,<br><strong>The AI Authority Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 AI Authority. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

    const subject = "AI Authority Membership Application Update";
    
    await sendEmail(userEmail, subject, htmlContent);

    console.log("✅ Rejection email sent successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending rejection email:");
    console.error("Error:", error);
    return { success: false, error: error.message };
  }
};

// Generic send email function for external API usage (backwards compatibility)
export const sendEmailAPI = async ({ to, subject, message }) => {
  try {
    const result = await sendEmail(to, subject, message);
    console.log("Email sent via Hostinger SMTP:", { to, subject });
    return { status: "sent" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default { sendApprovalEmail, sendRejectionEmail };
