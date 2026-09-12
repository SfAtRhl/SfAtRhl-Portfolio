import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'contact-api-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
            }

            let body = ''
            req.on('data', chunk => {
              body += chunk
            })

            req.on('end', async () => {
              try {
                const { name, email, message } = JSON.parse(body || '{}')

                if (!name || !email || !message) {
                  res.statusCode = 400
                  res.setHeader('Content-Type', 'application/json')
                  return res.end(JSON.stringify({ success: false, error: 'Please fill in all fields (name, email, message).' }))
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  res.statusCode = 400
                  res.setHeader('Content-Type', 'application/json')
                  return res.end(JSON.stringify({ success: false, error: 'Please provide a valid email address.' }))
                }

                const host = env.SMTP_HOST || process.env.SMTP_HOST || 'smtp.gmail.com'
                const port = parseInt(env.SMTP_PORT || process.env.SMTP_PORT || '465', 10)
                const user = env.SMTP_USER || process.env.SMTP_USER || env.GMAIL_USER || 'sofyan.ait.rehail@gmail.com'
                const pass = env.SMTP_PASS || process.env.SMTP_PASS || env.GMAIL_APP_PASSWORD
                const recipient = env.CONTACT_RECIPIENT || process.env.CONTACT_RECIPIENT || user

                if (!user || !pass) {
                  console.error('Email server credentials not configured in environment variables.')
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  return res.end(JSON.stringify({ success: false, error: 'Unable to send message right now. Please try again later.' }))
                }

                const transporter = nodemailer.createTransport({
                  host,
                  port,
                  secure: port === 465,
                  auth: { user, pass },
                })

                await transporter.sendMail({
                  from: `"${name}" <${user}>`,
                  replyTo: email,
                  to: recipient,
                  subject: `Portfolio Message from ${name}`,
                  text: `New message from portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                  html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                      <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">New Portfolio Contact Message</h2>
                      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 80px;">From:</td>
                          <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Reply-To:</td>
                          <td style="padding: 8px 0; color: #16a34a; font-size: 14px; font-weight: 500;"><a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a></td>
                        </tr>
                      </table>
                      <div style="background: #f8fafc; border-radius: 8px; padding: 16px; border: 1px solid #f1f5f9; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                      <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">Sent from SfAtRhl Portfolio</p>
                    </div>
                  `,
                })

                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ success: true, message: 'Message sent successfully!' }))
              } catch (err) {
                console.error('Email send error:', err)
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ success: false, error: 'Failed to send message. Please try again later.' }))
              }
            })
          })
        },
      },
    ],
  }
})
