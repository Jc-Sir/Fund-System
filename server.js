const express = require('express'); // 安装后引入
const mongoose = require('mongoose'); // 安装mongoose 后引入 
const bodyParser = require('body-parser')
const app = express(); // 实例化

// require user.js
const users = require('./routes/api/users');


// DB config
const db = require("./config/config").mongodbURI // 数据库地址

// use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Connect To mongodb
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log('mongodb connected success') })
    .catch((err) => { console.log(err) })

// use routes
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('hello express');
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})