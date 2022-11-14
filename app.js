const express = require('express');
const { default: mongoose } = require('mongoose');
const morgan = require('morgan');
const RouteAcc = require('./routes/accountRoute');
const commentRoute = require('./routes/commentRoute');
const postRoute = require('./routes/postRoute');
const uploadRouter = require('./routes/uploadRoute');
const RouteUser = require('./routes/userRoutes');


require('dotenv').config();
const app = new express();
app.use(express.static('public'));
app.use(morgan('common'));
app.use(express.json());
var server = require("http").Server(app);
var io = require("socket.io")(server);
mongoose.connect(process.env.URL, (err) => {
    if (err) return console.log('Ket noi voi database loi');
    console.log("Ket noi thanh cong");
});
app.use(express.static('public'));
app.use('/account', RouteAcc);
app.use('/user', RouteUser);
app.use('/post', postRoute);
app.use('/upload', uploadRouter);
app.use('/comment', commentRoute);
app.use('/a', () => {
    console.log('hii')
});
io.on("connection", function (socket) {
    const username = socket.handshake.query.username;

    console.log(username + ' connected');
    socket.on("disconnect", function () {
    });
    //server lắng nghe dữ liệu từ client
    socket.on("message", function (data) {
        console.log("nghe ne "+data['like']);
       
        //sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác

        io.emit("message1", data);
    });
    
});

server.listen(process.env.PORT || 80, () => {
    console.log('Server is running port: ' + process.env.PORT);
});