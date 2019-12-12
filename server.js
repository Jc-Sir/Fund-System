const express = require('express'); // 安装后引入
const mongoose = require('mongoose'); // 安装mongoose 后引入 
const app = express(); // 实例化

// DB config
const db = require("./config/config").mongodbURI // 数据库地址

// Connect To mongodb
mongoose.connect(db)
    .then(() => { console.log('mongodb connected success') })
    .catch((err) => { console.log(err) })

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('hello express');
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})