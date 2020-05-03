const express = require('express'); // 安装后引入
const mongoose = require('mongoose'); // 安装mongoose 后引入 
const bodyParser = require('body-parser')
const app = express(); // 实例化
const passport = require('passport')


// require user.js
const users = require('./routes/api/users');
const profiles = require('./routes/api/profile');

// DB config
const db = require("./config/config").mongodbURI // 数据库地址

// use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/apiDoc', express.static('apiDoc'));

// passport 初始化
app.use(passport.initialize());


// Connect To mongodb
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log('mongodb connected success') })
    .catch((err) => { console.log(err) })

// use routes
app.use('/api/users', users);
app.use('/api/profile', profiles)

require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})