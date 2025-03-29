const getEmailTemplate = (fullName, title, message, buttonText, buttonLink, otp = null) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        /* Global Styles */
        body {
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
        }
        
        /* Container with full width on desktop */
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        table {
          width: 100%;
          border-spacing: 0;
        }

        img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        
        /* Header with Gradient */
        .header {
          background: linear-gradient(135deg, #04b7ba, #2D5C75);
          text-align: center;
          padding: 40px 20px;
        }
        .header img {
          width: 220px;
        }

        /* Content Section */
        .content {
          padding: 60px;
          color: #555;
        }
        .content h1 {
          font-size: 28px;
          color: #2D5C75;
          text-align: center;
          margin-bottom: 30px;
        }
        .content p {
          font-size: 18px;
          margin: 0 0 20px;
        }
        
        /* Button Styling */
        .button-container {
          text-align: center;
          margin: 40px 0;
        }
        .button {
          display: inline-block;
          background: #04b7ba;
          color: #ffffff;
          font-size: 18px;
          font-weight: bold;
          text-decoration: none;
          padding: 16px 36px;
          border-radius: 8px;
          transition: background 0.3s;
        }
        .button:hover {
          background: #2D5C75;
        }

        /* OTP Styling */
        .otp-container {
          text-align: center;
          margin: 30px 0;
        }
        .otp {
          display: inline-block;
          font-size: 40px;
          font-weight: bold;
          color: #2D5C75;
          letter-spacing: 12px;
          padding: 12px 24px; /* Reduced padding for desktop */
          background: #f0f8ff;
          border-radius: 8px;
          border: 2px solid #04b7ba;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
        }

        /* Footer Styling */
        .footer {
          background: #f0f0f0;
          text-align: center;
          padding: 30px;
          font-size: 16px;
          color: #777;
        }
        .footer a {
          color: #04b7ba;
          text-decoration: none;
        }

        /* Mobile Responsiveness */
        @media screen and (max-width: 768px) {
          .content, .header, .footer {
            padding: 30px;
          }
          .content h1 {
            font-size: 22px;
          }
          .otp {
            font-size: 32px;
            padding: 15px 30px; /* Maintain good padding for mobile */
          }
          .button {
            padding: 14px 28px;
            font-size: 16px;
          }
        }

        @media screen and (max-width: 480px) {
          .content {
            padding: 20px;
          }
          .content h1 {
            font-size: 20px;
          }
          .otp {
            font-size: 28px;
            padding: 12px 24px; /* Compact but clear padding on smaller screens */
          }
          .button {
            padding: 12px 24px;
            font-size: 14px;
          }
        }
      </style>
    </head>
    <body>

    <!-- Full Width Desktop Container -->
    <div class="container">

      <!-- Email Container -->
      <table cellspacing="0" cellpadding="0">

        <!-- Header with Gradient -->
        <tr>
          <td class="header">
            <img src="https://res.cloudinary.com/dcsiml3nf/image/upload/v1743234457/donate2serve-logo-white_dmqhas.png" alt="${process.env.COMPANY_NAME} Logo">
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td class="content">
            <h1>${title}</h1>
            <p>Hello, <strong>${fullName}</strong>,</p>
            <p>${message}</p>

            ${otp ? `
            <div class="otp-container">
              <div class="otp">${otp}</div>
            </div>` : ''}

            ${buttonText && buttonLink ? `
            <div class="button-container">
              <a href="${buttonLink}" class="button">${buttonText}</a>
            </div>` : ''}

            <p>If you did not request this, you can safely ignore this email.</p>
            <p>Thank you,<br><strong>The ${process.env.COMPANY_NAME} Team</strong></p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="footer">
            <p>Need help? <a href="mailto:${process.env.COMPANY_EMAIL}">Contact Support</a></p>
            <p>&copy; 2025 ${process.env.COMPANY_NAME}. All rights reserved.</p>
          </td>
        </tr>

      </table>
    </div>

    </body>
    </html>
  `;
};

module.exports = getEmailTemplate;
