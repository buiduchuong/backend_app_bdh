require('dotenv').config();
const User = require("../models/userModel");
const nodemailer = require("nodemailer")
const { OAuth2Client } = require("google-auth-library")
// Khởi tạo OAuth2Client với Client ID và Client Secret 
const myOAuth2Client = new OAuth2Client(
    process.env.GOOGLE_MAILER_CLIENT_ID,
    process.env.GOOGLE_MAILER_CLIENT_SECRET
)
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
})
// Tạo API /email/send với method POST
const EmailController = {
    send: async (req, res) => {
        try {
            // Lấy thông tin gửi lên từ client qua body
            const { email } = req.body
            if (!email) throw new Error('Please provide email, subject and content!')
            /**
             * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
             * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
             */
            const myAccessTokenObject = await myOAuth2Client.getAccessToken()
            // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
            const myAccessToken = myAccessTokenObject?.token
            // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.ADMIN_EMAIL_ADDRESS,
                    clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
                    refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
                    accessToken: myAccessToken
                }
            })
            const code = Math.floor(Math.random() * 1000 + 1000);
            const user = await User.findOneAndUpdate({ email: email }, { $set: { code: code } });
            await user.save();
            // mailOption là những thông tin gửi từ phía client lên thông qua API
            const mailOptions = {
                to: email, // Gửi đến ai?
                subject: "[BDH] Mã xác nhận lấy lấy lại mật khẩu", // Tiêu đề email
                html: `<p>Xin chào bạn!,<br>
                Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu bạn.<br>
                Nhập mã đặt lại mật khẩu sau đây: <h3>${code}</h3></p>` // Nội dung email
            }
            // Gọi hành động gửi email
            await transport.sendMail(mailOptions)
            // Không có lỗi gì thì trả về success
            res.status(200).json({ message: 'Email sent successfully.' })
        } catch (error) {
            // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
            console.log(error)
            res.status(500).json({ errors: error.message })
        }
    }
}
module.exports = EmailController;